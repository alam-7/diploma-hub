// ============================================
// SUPABASE AUTH - DIPLOMA HUB
// ============================================

// YOUR SUPABASE KEYS
const SUPABASE_URL = 'https://segzsnhljtjhgoosughk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZ3pzbmhsanRqaGdvb3N1Z2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MjcsImV4cCI6MjEwMzMzNzkyN30.Q4thFQBm2t9EsUsKAesIpiRiq3_ISIxuphWbMmj-jmI';

let supabase = null;

// ============================================
// INITIALIZE SUPABASE
// ============================================
function initSupabase() {
    if (typeof createClient === 'undefined') {
        console.error('❌ Supabase library not loaded! Add: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
        return;
    }
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase initialized!');
    return supabase;
}

// ============================================
// AUTH FUNCTIONS
// ============================================

// SIGN UP
async function signUp(email, password, fullName) {
    if (!supabase) initSupabase();
    if (!supabase) { alert('❌ Supabase not initialized'); return false; }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    username: email.split('@')[0]
                }
            }
        });
        
        if (error) {
            alert('❌ ' + error.message);
            return false;
        }
        
        alert('✅ Account created! Please check your email for verification.');
        window.location.href = 'login.html';
        return true;
    } catch (err) {
        alert('❌ Error: ' + err.message);
        return false;
    }
}

// SIGN IN
async function signIn(email, password) {
    if (!supabase) initSupabase();
    if (!supabase) { alert('❌ Supabase not initialized'); return false; }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            alert('❌ ' + error.message);
            return false;
        }
        
        localStorage.setItem('supabase_session', JSON.stringify(data.session));
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.location.href = 'dashboard.html';
        return true;
    } catch (err) {
        alert('❌ Error: ' + err.message);
        return false;
    }
}

// SIGN OUT
async function signOut() {
    if (!supabase) initSupabase();
    if (!supabase) return;
    
    try {
        await supabase.auth.signOut();
        localStorage.removeItem('supabase_session');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    } catch (err) {
        alert('❌ Error: ' + err.message);
    }
}

// GET CURRENT USER
async function getCurrentUser() {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (err) {
        return null;
    }
}

// GET SESSION
async function getSession() {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    } catch (err) {
        return null;
    }
}

// ============================================
// PROFILE FUNCTIONS
// ============================================

async function getProfile(userId) {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching profile:', err);
        return null;
    }
}

async function updateProfile(updates) {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    const user = await getCurrentUser();
    if (!user) return null;
    
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error updating profile:', err);
        return null;
    }
}

// ============================================
// PROGRESS FUNCTIONS
// ============================================

async function getUserProgress() {
    if (!supabase) initSupabase();
    if (!supabase) return [];
    
    const user = await getCurrentUser();
    if (!user) return [];
    
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id);
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching progress:', err);
        return [];
    }
}

async function updateProgress(subjectId, updates) {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    const user = await getCurrentUser();
    if (!user) return null;
    
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .upsert({
                user_id: user.id,
                subject_id: subjectId,
                ...updates,
                last_accessed_at: new Date().toISOString()
            })
            .select()
            .single();
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error updating progress:', err);
        return null;
    }
}

// ============================================
// BOOKMARK FUNCTIONS
// ============================================

async function addBookmark(itemType, itemId) {
    if (!supabase) initSupabase();
    if (!supabase) return false;
    
    const user = await getCurrentUser();
    if (!user) {
        alert('Please sign in to bookmark');
        return false;
    }
    
    try {
        const { error } = await supabase
            .from('bookmarks')
            .insert({
                user_id: user.id,
                item_type: itemType,
                item_id: itemId
            });
        
        if (error) throw error;
        alert('✅ Bookmarked!');
        return true;
    } catch (err) {
        if (err.code === '23505') {
            alert('Already bookmarked!');
        } else {
            alert('❌ Error: ' + err.message);
        }
        return false;
    }
}

async function removeBookmark(itemId) {
    if (!supabase) initSupabase();
    if (!supabase) return false;
    
    const user = await getCurrentUser();
    if (!user) return false;
    
    try {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('user_id', user.id)
            .eq('item_id', itemId);
        
        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error removing bookmark:', err);
        return false;
    }
}

async function getBookmarks() {
    if (!supabase) initSupabase();
    if (!supabase) return [];
    
    const user = await getCurrentUser();
    if (!user) return [];
    
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id);
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching bookmarks:', err);
        return [];
    }
}

// ============================================
// QUIZ FUNCTIONS
// ============================================

async function saveQuizAttempt(quizId, score, totalQuestions, correct, wrong, timeTaken) {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    const user = await getCurrentUser();
    if (!user) return null;
    
    try {
        const { data, error } = await supabase
            .from('quiz_attempts')
            .insert({
                user_id: user.id,
                quiz_id: quizId,
                score: score,
                total_questions: totalQuestions,
                correct_answers: correct,
                wrong_answers: wrong,
                time_taken_seconds: timeTaken,
                completed_at: new Date().toISOString()
            })
            .select()
            .single();
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error saving quiz attempt:', err);
        return null;
    }
}

async function getQuizHistory() {
    if (!supabase) initSupabase();
    if (!supabase) return [];
    
    const user = await getCurrentUser();
    if (!user) return [];
    
    try {
        const { data, error } = await supabase
            .from('quiz_attempts')
            .select('*')
            .eq('user_id', user.id)
            .order('completed_at', { ascending: false });
        
        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching quiz history:', err);
        return [];
    }
}

// ============================================
// EXPOSE FUNCTIONS GLOBALLY
// ============================================

window.initSupabase = initSupabase;
window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.getCurrentUser = getCurrentUser;
window.getSession = getSession;
window.getProfile = getProfile;
window.updateProfile = updateProfile;
window.getUserProgress = getUserProgress;
window.updateProgress = updateProgress;
window.addBookmark = addBookmark;
window.removeBookmark = removeBookmark;
window.getBookmarks = getBookmarks;
window.saveQuizAttempt = saveQuizAttempt;
window.getQuizHistory = getQuizHistory;

console.log('✅ Supabase Auth loaded with keys!');