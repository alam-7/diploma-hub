// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// ============================================
// SIGN UP
// ============================================
function signUp(email, password, fullName) {
    // In production, this would call a backend API
    // For demo, we store in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
        alert('User already exists!');
        return false;
    }
    
    const user = {
        id: Date.now().toString(),
        email,
        password,
        fullName,
        xp: 0,
        level: 1,
        studyStreak: 0,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));
    
    alert('Account created successfully!');
    window.location.href = 'dashboard.html';
    return true;
}

// ============================================
// SIGN IN
// ============================================
function signIn(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Invalid email or password!');
        return false;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'dashboard.html';
    return true;
}

// ============================================
// SIGN OUT
// ============================================
function signOut() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// ============================================
// GET CURRENT USER
// ============================================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
}

// ============================================
// UPDATE USER PROFILE
// ============================================
function updateUserProfile(updates) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.id === user.id);
    
    if (index === -1) return false;
    
    users[index] = { ...users[index], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(users[index]));
    
    return true;
}

// ============================================
// ADD XP
// ============================================
function addXP(amount) {
    const user = getCurrentUser();
    if (!user) return;
    
    const newXP = (user.xp || 0) + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    updateUserProfile({ xp: newXP, level: newLevel });
}

// ============================================
// BOOKMARKS
// ============================================
function addBookmark(itemId, itemType) {
    const user = getCurrentUser();
    if (!user) {
        alert('Please sign in to bookmark');
        return false;
    }
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks_' + user.id) || '[]');
    
    if (bookmarks.find(b => b.itemId === itemId)) {
        alert('Already bookmarked!');
        return false;
    }
    
    bookmarks.push({ itemId, itemType, addedAt: new Date().toISOString() });
    localStorage.setItem('bookmarks_' + user.id, JSON.stringify(bookmarks));
    alert('Bookmarked!');
    return true;
}

function removeBookmark(itemId) {
    const user = getCurrentUser();
    if (!user) return false;
    
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks_' + user.id) || '[]');
    bookmarks = bookmarks.filter(b => b.itemId !== itemId);
    localStorage.setItem('bookmarks_' + user.id, JSON.stringify(bookmarks));
    return true;
}

function getBookmarks() {
    const user = getCurrentUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem('bookmarks_' + user.id) || '[]');
}

// ============================================
// LOGIN PAGE HANDLER
// ============================================
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signIn(email, password);
}

// ============================================
// SIGNUP PAGE HANDLER
// ============================================
function handleSignup(e) {
    e.preventDefault();
    const fullName = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    signUp(email, password, fullName);
}