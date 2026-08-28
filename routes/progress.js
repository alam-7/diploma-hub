const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { verifyToken } = require('../middleware/auth');

// ✅ REAL: Get user progress
router.get('/', verifyToken, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', req.userId);

        if (error) throw error;

        res.json({
            success: true,
            progress: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Update progress for a subject
router.post('/', verifyToken, async (req, res) => {
    try {
        const { subject_id, lessons_completed, total_lessons, practicals_completed, total_practicals } = req.body;

        if (!subject_id) {
            return res.status(400).json({
                success: false,
                error: 'subject_id required'
            });
        }

        // Calculate progress percentage
        const progress_percentage = total_lessons > 0 
            ? Math.round((lessons_completed / total_lessons) * 100) 
            : 0;

        const { data, error } = await supabase
            .from('user_progress')
            .upsert({
                user_id: req.userId,
                subject_id,
                lessons_completed: lessons_completed || 0,
                total_lessons: total_lessons || 0,
                practicals_completed: practicals_completed || 0,
                total_practicals: total_practicals || 0,
                progress_percentage,
                last_accessed_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            progress: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;