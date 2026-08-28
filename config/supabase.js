const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase environment variables!');
    process.exit(1);
}

// Create Supabase client with service_role key (admin access)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

// Test connection
supabase.from('profiles').select('count', { count: 'exact', head: true })
    .then(() => console.log('✅ Supabase connected!'))
    .catch(err => console.error('❌ Supabase connection failed:', err.message));

module.exports = supabase;