// ============================================
// SUPABASE AUTH - COMPLETE WORKING VERSION
// ============================================

// YOUR SUPABASE KEYS (Replace with your actual keys if different)
const SUPABASE_URL = 'https://segzsnhljtjhgoosughk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZ3pzbmhsanRqaGdvb3N1Z2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MjcsImV4cCI6MjEwMzMzNzkyN30.Q4thFQBm2t9EsUsKAesIpiRiq3_ISIxuphWbMmj-jmI';

let supabase = null;

// ============================================
// INITIALIZE SUPABASE
// ============================================
function initSupabase() {
    try {
        if (typeof createClient === 'undefined') {
            console.error('❌ Supabase library not loaded!');
            return null;
        }
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialized successfully!');
        return supabase;
    } catch (err) {
        console.error('❌ Failed to initialize Supabase:', err);
        return null;
    }
}

// ============================================
// SIGN UP
// ============================================
async function signUp(email, password, fullName) {
    if (!supabase) {
        const result = initSupabase();
        if (!result) {
            alert('❌ Supabase not initialized. Please refresh.');
            return false;
        }
    }
    
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
        
        if (data.user) {
            alert('✅ Account created! Please check your email for verification.');
            window.location.href = 'login.html';
            return true;
        } else {
            alert('❌ Something went wrong. Please try again.');
            return false;
        }
    } catch (err) {
        alert('❌ Error: ' + err.message);
        return false;
    }
}

// ============================================
// SIGN IN
// ============================================
async function signIn(email, password) {
    if (!supabase) {
        const result = initSupabase();
        if (!result) {
            alert('❌ Supabase not initialized. Please refresh.');
            return false;
        }
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            alert('❌ ' + error.message);
            return false;
        }
        
        if (data.session) {
            localStorage.setItem('supabase_session', JSON.stringify(data.session));
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('✅ Welcome back, ' + (data.user.user_metadata?.full_name || 'Student') + '!');
            window.location.href = 'dashboard.html';
            return true;
        } else {
            alert('❌ No session created. Please try again.');
            return false;
        }
    } catch (err) {
        alert('❌ Error: ' + err.message);
        return false;
    }
}

// ============================================
// SIGN OUT
// ============================================
async function signOut() {
    if (!supabase) initSupabase();
    if (!supabase) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        await supabase.auth.signOut();
        localStorage.removeItem('supabase_session');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    } catch (err) {
        alert('❌ Error: ' + err.message);
    }
}

// ============================================
// GET CURRENT USER
// ============================================
async function getCurrentUser() {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (err) {
        console.error('Error getting user:', err);
        return null;
    }
}

// ============================================
// GET SESSION
// ============================================
async function getSession() {
    if (!supabase) initSupabase();
    if (!supabase) return null;
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    } catch (err) {
        console.error('Error getting session:', err);
        return null;
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

console.log('✅ Supabase Auth functions loaded!');
console.log('📡 Supabase URL:', SUPABASE_URL);