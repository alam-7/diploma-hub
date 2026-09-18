/* ============================================================
   DIPLOMA HUB — QUIZ ENGINE
   File: js/quiz.js
   Version: 2.0.0
   Updated: 2026-09

   Requires: js/app.js (DH), js/api.js (API)

   Public API (window.Quiz):
   - Quiz.create(quizData, options)   → new Quiz instance
   - Quiz.loadById(id, code)          → loads from data, returns instance
   - Quiz.getGrade(percent)           → { emoji, label, color }

   Quiz instance methods:
   - start()
   - next()
   - prev()
   - jumpTo(index)
   - selectOption(optionIndex)
   - clearAnswer()
   - toggleFlag()
   - getCurrent()
   - getState()
   - getAnswerSheet()
   - submit()
   - reset()
   - getResult()
   - on(event, handler)               → 'change' | 'tick' | 'submit' | 'complete'

   Events:
   - change  → any state change (question change, answer, flag)
   - tick    → every second (timeLeft)
   - submit  → user submits
   - complete→ result ready
   - expire  → time ran out
   ============================================================ */

(function () {
    'use strict';

    const Quiz = window.Quiz = window.Quiz || {};

    // ============================================================
    // GRADE HELPER
    // ============================================================
    Quiz.getGrade = function (percent) {
        if (percent >= 90) return { emoji: '🏆', label: 'Outstanding', color: '#22c55e' };
        if (percent >= 70) return { emoji: '🎉', label: 'Well Done',   color: '#22c55e' };
        if (percent >= 50) return { emoji: '👍', label: 'Good Effort', color: '#f59e0b' };
        if (percent >= 30) return { emoji: '📚', label: 'Keep Going',  color: '#f59e0b' };
        return                { emoji: '💪', label: 'Try Again',    color: '#ef4444' };
    };

    // ============================================================
    // LOAD FROM DATA
    // ============================================================
    Quiz.loadById = function (id, subjectCode) {
        if (!subjectCode) {
            // Try to find anywhere
            for (const slug in (window.courseData || {})) {
                const c = window.courseData[slug];
                for (const sem in c.semesters) {
                    const subs = c.semesters[sem].subjects || [];
                    for (const s of subs) {
                        const found = (s.quizzes || []).find(q => q.id === id);
                        if (found) return Quiz.create(found, { subjectCode: s.code });
                    }
                }
            }
            return null;
        }

        const s = API.getSubject(subjectCode);
        if (!s) return null;
        const q = (s.quizzes || []).find(x => x.id === id);
        if (!q) return null;
        return Quiz.create(q, { subjectCode });
    };

    // ============================================================
    // QUIZ INSTANCE
    // ============================================================
    Quiz.create = function (quizData, options) {
        options = options || {};
        const autoStart = options.autoStart !== false;

        // ---------- Normalize questions ----------
        let questions = quizData.questionList || quizData.questions || [];
        if (!Array.isArray(questions) || !questions.length) {
            // Generate placeholder questions
            const count = quizData.questions || 10;
            questions = [];
            for (let i = 1; i <= count; i++) {
                questions.push({
                    q: 'Question ' + i + ' for ' + (quizData.title || 'quiz'),
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correct: 0,
                    explanation: 'Explanation will appear here.'
                });
            }
        }

        // ============================================================
        // STATE
        // ============================================================
        const state = {
            quiz: quizData,
            subjectCode: options.subjectCode || '',
            questions: questions,
            answers: questions.map(() => ({ chosen: null, flagged: false })),
            currentIdx: 0,
            timeLimit: (quizData.time || 10) * 60, // seconds
            timeLeft: (quizData.time || 10) * 60,
            startedAt: null,
            submittedAt: null,
            submitted: false,
            timerHandle: null,
            tickHandle: null,
            result: null
        };

        // Event handlers
        const events = {
            change: [],
            tick: [],
            submit: [],
            complete: [],
            expire: []
        };

        // ============================================================
        // EVENT EMITTER
        // ============================================================
        function emit(event, payload) {
            (events[event] || []).forEach(cb => {
                try { cb(payload, state); } catch (e) { console.warn('[Quiz]', event, e); }
            });
        }

        function on(event, cb) {
            if (!events[event]) events[event] = [];
            if (typeof cb === 'function') events[event].push(cb);
        }

        // ============================================================
        // TIMER
        // ============================================================
        function startTimer() {
            stopTimer();
            state.startedAt = Date.now();

            // Tick every second
            state.tickHandle = setInterval(() => {
                if (state.submitted) return;
                state.timeLeft--;
                emit('tick', { timeLeft: state.timeLeft });
                if (state.timeLeft <= 0) {
                    state.timeLeft = 0;
                    emit('expire', {});
                    submit(true);
                }
            }, 1000);
        }

        function stopTimer() {
            if (state.tickHandle) {
                clearInterval(state.tickHandle);
                state.tickHandle = null;
            }
        }

        // ============================================================
        // NAVIGATION
        // ============================================================
        function next() {
            if (state.currentIdx < state.questions.length - 1) {
                state.currentIdx++;
                emit('change', { reason: 'next' });
                return true;
            }
            return false;
        }

        function prev() {
            if (state.currentIdx > 0) {
                state.currentIdx--;
                emit('change', { reason: 'prev' });
                return true;
            }
            return false;
        }

        function jumpTo(idx) {
            if (idx >= 0 && idx < state.questions.length) {
                state.currentIdx = idx;
                emit('change', { reason: 'jump' });
                return true;
            }
            return false;
        }

        // ============================================================
        // ANSWERS
        // ============================================================
        function selectOption(optIdx) {
            if (state.submitted) return false;
            const q = state.questions[state.currentIdx];
            if (optIdx < 0 || optIdx >= q.options.length) return false;
            state.answers[state.currentIdx].chosen = optIdx;
            emit('change', { reason: 'select' });
            return true;
        }

        function clearAnswer() {
            if (state.submitted) return false;
            state.answers[state.currentIdx].chosen = null;
            emit('change', { reason: 'clear' });
            return true;
        }

        function toggleFlag() {
            if (state.submitted) return false;
            state.answers[state.currentIdx].flagged = !state.answers[state.currentIdx].flagged;
            emit('change', { reason: 'flag' });
            return true;
        }

        function getCurrent() {
            return {
                index: state.currentIdx,
                question: state.questions[state.currentIdx],
                answer: state.answers[state.currentIdx],
                total: state.questions.length,
                isFirst: state.currentIdx === 0,
                isLast: state.currentIdx === state.questions.length - 1
            };
        }

        // ============================================================
        // STATE SNAPSHOT
        // ============================================================
        function getState() {
            return {
                quizTitle: state.quiz.title || 'Quiz',
                currentIdx: state.currentIdx,
                total: state.questions.length,
                timeLeft: state.timeLeft,
                timeLimit: state.timeLimit,
                submitted: state.submitted,
                answeredCount: state.answers.filter(a => a.chosen !== null).length,
                flaggedCount: state.answers.filter(a => a.flagged).length,
                progress: Math.round(
                    (state.answers.filter(a => a.chosen !== null).length / state.questions.length) * 100
                )
            };
        }

        function getAnswerSheet() {
            return state.answers.map((a, i) => ({
                index: i,
                question: state.questions[i].q,
                chosen: a.chosen,
                correct: state.questions[i].correct,
                flagged: a.flagged
            }));
        }

        // ============================================================
        // SCORING
        // ============================================================
        function computeResult() {
            let correct = 0, wrong = 0, skipped = 0;
            state.answers.forEach((a, i) => {
                if (a.chosen === null) skipped++;
                else if (a.chosen === state.questions[i].correct) correct++;
                else wrong++;
            });
            const total = state.questions.length;
            const percent = total ? Math.round((correct / total) * 100) : 0;
            const timeTaken = state.startedAt
                ? Math.round((state.submittedAt - state.startedAt) / 1000)
                : 0;

            return {
                correct,
                wrong,
                skipped,
                total,
                percent,
                timeTaken,
                grade: Quiz.getGrade(percent),
                answers: getAnswerSheet()
            };
        }

        // ============================================================
        // SUBMIT
        // ============================================================
        function submit(auto) {
            if (state.submitted) return state.result;
            state.submitted = true;
            state.submittedAt = Date.now();
            stopTimer();

            state.result = computeResult();
            emit('submit', state.result);

            // Save best score
            if (state.quiz.id) {
                try {
                    API.saveQuizScore(
                        state.quiz.id,
                        state.result.percent,
                        state.result.correct,
                        state.result.total
                    );
                    DH.logActivity(
                        'fa-question-circle',
                        'Completed quiz: ' + (state.quiz.title || state.quiz.id),
                        state.result.percent + '%'
                    );
                } catch (e) { console.warn(e); }
            }

            emit('complete', state.result);
            return state.result;
        }

        // ============================================================
        // RESET
        // ============================================================
        function reset() {
            stopTimer();
            state.answers = state.questions.map(() => ({ chosen: null, flagged: false }));
            state.currentIdx = 0;
            state.timeLeft = state.timeLimit;
            state.startedAt = null;
            state.submittedAt = null;
            state.submitted = false;
            state.result = null;
            if (autoStart) startTimer();
            emit('change', { reason: 'reset' });
        }

        // ============================================================
        // START
        // ============================================================
        function start() {
            if (state.submitted) reset();
            else startTimer();
            emit('change', { reason: 'start' });
        }

        function getResult() {
            return state.result;
        }

        // ============================================================
        // INSTANCE
        // ============================================================
        const instance = {
            // Navigation
            next, prev, jumpTo,
            // Answers
            selectOption, clearAnswer, toggleFlag,
            // Accessors
            getCurrent, getState, getAnswerSheet,
            // Lifecycle
            start, submit, reset,
            getResult,
            // Events
            on,
            // Raw access (advanced)
            _state: state
        };

        // Auto-start
        if (autoStart) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => startTimer());
            } else {
                startTimer();
            }
        }

        return instance;
    };

    console.log('%c❓ Quiz engine ready', 'color:#06b6d4;font-weight:700;');

})();