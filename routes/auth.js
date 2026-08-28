const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// ✅ REAL: Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { email, password, fullName, username } = req.body;

        // Validate input
        if (!email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                error: 'Email, password, and full name are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters'
            });
        }

        // Check if username exists
        if (username) {
            const { data: existing } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username)
                .single();
            
            if (existing) {
                return res.status(400).json({
                    success: false,
                    error: 'Username already taken'
                });
            }
        }

        // Create user in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    username: username || email.split('@')[0]
                }
            }
        });

        if (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: 'Account created! Please verify your email.',
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: data.user.user_metadata?.full_name
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Sign In
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password required'
            });
        }

        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({
                success: false,
                error: error.message
            });
        }

        // Get user profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        // Generate JWT
        const token = jwt.sign(
            { 
                id: data.user.id,
                email: data.user.email,
                role: profile?.role || 'user'
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: profile?.full_name || data.user.user_metadata?.full_name,
                username: profile?.username,
                role: profile?.role || 'user',
                xp: profile?.xp || 0,
                level: profile?.level || 1
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Get Current User
router.get('/me', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Token required'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', decoded.id)
            .single();

        if (error || !profile) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: profile
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Refresh Token
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                error: 'Refresh token required'
            });
        }

        // Verify refresh token (using Supabase session)
        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken
        });

        if (error) {
            return res.status(401).json({
                success: false,
                error: 'Invalid refresh token'
            });
        }

        const token = jwt.sign(
            { id: data.user.id, email: data.user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ REAL: Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email required'
            });
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.FRONTEND_URL}/reset-password.html`
        });

        if (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            message: 'Password reset email sent'
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;