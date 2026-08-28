const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// ✅ REAL: Get all courses
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('name');

        if (error) throw error;

        res.json({
            success: true,
            courses: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Get course by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }

        // Get semesters for this course
        const { data: semesters } = await supabase
            .from('semesters')
            .select('*')
            .eq('course_id', data.id)
            .order('semester_number');

        res.json({
            success: true,
            course: { ...data, semesters }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Add course (Admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { slug, name, description, icon } = req.body;

        if (!slug || !name) {
            return res.status(400).json({
                success: false,
                error: 'Slug and name are required'
            });
        }

        const { data, error } = await supabase
            .from('courses')
            .insert([{
                id: uuidv4(),
                slug,
                name,
                description: description || '',
                icon: icon || '📘',
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: 'Course added successfully',
            course: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;