// ============================================================
// AUTHENTICATION MODULE WITH SUPABASE
// ============================================================
// This file handles authentication for DIPLOMA HUB
// ============================================================

// ============================================================
// SUPABASE CONFIGURATION
// ============================================================
// IMPORTANT: Replace these with YOUR actual Supabase credentials
// You can find these in your Supabase Dashboard:
// Settings → API → Project URL and anon public key
// ============================================================

var SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'; // Example: 'https://abcdefghijklm.supabase.co'
var SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE'; // Long string starting with 'eyJ...'

var supabaseClient = null;

// ============================================================
// INITIALIZE SUPABASE
// ============================================================
function initSupabase() {
    try {
        // Check if Supabase SDK is loaded
        if (typeof window.supabase === 'undefined') {
            console.error('❌ Supabase SDK not loaded!');
            console.error('Make sure this script is in your HTML:');
            console.error('<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
            return null;
        }

        // Validate credentials
        if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') {
            console.error('❌ Supabase URL not configured!');
            console.error('Please replace SUPABASE_URL in js/auth.js with your actual Supabase URL');
            return null;
        }

        if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
            console.error('❌ Supabase anon key not configured!');
            console.error('Please replace SUPABASE_ANON_KEY in js/auth.js with your actual anon key');
            return null;
        }

        // Create Supabase client
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialized successfully!');
        
        return supabaseClient;
    } catch (e) {
        console.error('❌ Failed to initialize Supabase:', e.message);
        return null;
    }
}

// ============================================================
// GET CURRENT USER
// ============================================================
async function getCurrentUser() {
    try {
        if (!supabaseClient) {
            initSupabase();
        }
        
        if (!supabaseClient) {
            console.warn('Supabase not available. Checking localStorage...');
            return getLocalUser();
        }
        
        var { data: { user }, error } = await supabaseClient.auth.getUser();
        
        if (error) {
            console.warn('Supabase getUser error:', error.message);
            return getLocalUser();
        }
        
        if (user) {
            // Store in localStorage for session persistence
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        
        return null;
    } catch (e) {
        console.warn('Error getting current user:', e.message);
        return getLocalUser();
    }
}

// ============================================================
// GET LOCAL USER (FALLBACK)
// ============================================================
function getLocalUser() {
    try {
        var storedUser = localStorage.getItem('user');
        if (storedUser) {
            return JSON.parse(storedUser);
        }
    } catch (e) {
        console.warn('Error parsing local user:', e.message);
    }
    return null;
}

// ============================================================
// SIGN UP
// ============================================================
async function signUp(email, password, fullName) {
    try {
        if (!supabaseClient) {
            initSupabase();
        }
        
        if (!supabaseClient) {
            throw new Error('Supabase not initialized. Please configure your credentials.');
        }
        
        var { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName || email.split('@')[0]
                }
            }
        });
        
        if (error) throw error;
        
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('✅ User signed up successfully!');
        }
        
        return { user: data.user, error: null };
    } catch (e) {
        console.error('❌ Signup error:', e.message);
        return { user: null, error: e.message };
    }
}

// ============================================================
// SIGN IN
// ============================================================
async function signIn(email, password) {
    try {
        if (!supabaseClient) {
            initSupabase();
        }
        
        if (!supabaseClient) {
            throw new Error('Supabase not initialized. Please configure your credentials.');
        }
        
        var { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('✅ User signed in successfully!');
        }
        
        return { user: data.user, error: null };
    } catch (e) {
        console.error('❌ Login error:', e.message);
        return { user: null, error: e.message };
    }
}

// ============================================================
// SIGN OUT
// ============================================================
async function signOut() {
    try {
        if (supabaseClient) {
            var { error } = await supabaseClient.auth.signOut();
            if (error) {
                console.warn('Supabase signout error:', error.message);
            }
        }
    } catch (e) {
        console.warn('Supabase signout error:', e.message);
    }
    
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('supabase.auth.token');
    
    console.log('✅ User signed out successfully!');
    
    // Redirect to home
    window.location.href = 'index.html';
}

// ============================================================
// CHECK IF LOGGED IN
// ============================================================
function isLoggedIn() {
    var user = localStorage.getItem('user');
    return !!user;
}

// ============================================================
// UPDATE AUTH UI
// ============================================================
async function updateAuthUI() {
    var btn = document.getElementById('authBtn');
    if (!btn) return;
    
    try {
        var user = await getCurrentUser();
        if (user) {
            var name = user.user_metadata?.full_name || user.email || 'Dashboard';
            btn.innerHTML = '<i class="fas fa-user"></i> ' + name;
            btn.href = 'dashboard.html';
            return;
        }
    } catch (e) {
        console.warn('Error updating auth UI:', e.message);
    }
    
    btn.innerHTML = 'Sign In';
    btn.href = 'login.html';
}

// ============================================================
// PROTECT ROUTE (For dashboard and protected pages)
// ============================================================
async function protectRoute() {
    var user = await getCurrentUser();
    if (!user) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return false;
    }
    return true;
}

// ============================================================
// EXPORT FUNCTIONS
// ============================================================
if (typeof window !== 'undefined') {
    window.initSupabase = initSupabase;
    window.getCurrentUser = getCurrentUser;
    window.signUp = signUp;
    window.signIn = signIn;
    window.signOut = signOut;
    window.isLoggedIn = isLoggedIn;
    window.updateAuthUI = updateAuthUI;
    window.protectRoute = protectRoute;
}

// ============================================================
// INITIALIZE ON PAGE LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Auth module loaded successfully!');
    
    // Initialize Supabase
    initSupabase();
    
    // Update auth UI
    updateAuthUI();
});