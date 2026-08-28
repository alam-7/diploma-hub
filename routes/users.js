const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// ✅ REAL: Get all users (Admin only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            users: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Get user by ID (Admin or self)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Users can only view their own profile unless admin
        if (req.userId !== id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Access denied'
            });
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Update user profile
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        if (req.userId !== id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Access denied'
            });
        }

        const { full_name, username, avatar_url, bio } = req.body;

        const updates = {};
        if (full_name) updates.full_name = full_name;
        if (username) updates.username = username;
        if (avatar_url) updates.avatar_url = avatar_url;
        if (bio) updates.bio = bio;
        updates.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated',
            user: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Delete user (Admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Delete from profiles
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', id);

        if (profileError) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Delete from auth (Supabase admin)
        const { error: authError } = await supabase.auth.admin.deleteUser(id);

        if (authError) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete user from auth'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;