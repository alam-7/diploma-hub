const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// ✅ REAL: Verify JWT Token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                error: 'Access token required' 
            });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from Supabase to ensure they still exist
        const { data: user, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', decoded.id)
            .single();

        if (error || !user) {
            return res.status(401).json({ 
                success: false,
                error: 'User not found' 
            });
        }

        req.user = user;
        req.userId = decoded.id;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid token' 
            });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                error: 'Token expired' 
            });
        }
        return res.status(500).json({ 
            success: false,
            error: 'Authentication error' 
        });
    }
};

// ✅ REAL: Check if user is admin
const verifyAdmin = async (req, res, next) => {
    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', req.userId)
            .single();

        if (error || !profile || profile.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                error: 'Admin access required' 
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({ 
            success: false,
            error: 'Authorization error' 
        });
    }
};

module.exports = { verifyToken, verifyAdmin };