// ============================================
// APPLICATION STATE
// ============================================
const state = {
    currentUser: null,
    theme: 'dark',
    bookmarks: [],
    progress: {}
};

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        state.theme = 'dark';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-sun';
        state.theme = 'light';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.setAttribute('data-theme', 'light');
        const icon = document.getElementById('themeIcon');
        if (icon) icon.className = 'fas fa-sun';
        state.theme = 'light';
    }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
}

// ============================================
// AUTH STATE
// ============================================
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (user) {
        authBtn.innerHTML = '<i class="fas fa-user"></i> Dashboard';
        authBtn.href = 'dashboard.html';
        state.currentUser = user;
    } else {
        authBtn.innerHTML = 'Sign In';
        authBtn.href = 'login.html';
        state.currentUser = null;
    }
}

// ============================================
// RENDER COURSES
// ============================================
function renderCourses() {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;
    
    grid.innerHTML = COURSES.map(course => `
        <div class="course-card" onclick="window.location.href='course-detail.html?course=${course.slug}'">
            <div class="icon">${course.icon}</div>
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <span class="card-link">Explore Course <i class="fas fa-arrow-right"></i></span>
        </div>
    `).join('');
}

// ============================================
// RENDER EQUIPMENT
// ============================================
function renderEquipment(filter = '') {
    const container = document.getElementById('equipmentGrid');
    if (!container) return;
    
    let items = EQUIPMENT;
    if (filter) {
        items = items.filter(e => 
            e.name.toLowerCase().includes(filter.toLowerCase()) ||
            e.category.toLowerCase().includes(filter.toLowerCase())
        );
    }
    
    container.innerHTML = items.map(e => `
        <div class="course-card" onclick="window.location.href='equipment-detail.html?slug=${e.slug}'">
            <h3>${e.name}</h3>
            <span class="badge">${e.category}</span>
            <p style="color: var(--gray-400); font-size: 0.9rem; margin: 10px 0;">
                ${e.purpose.substring(0, 100)}...
            </p>
            <span class="card-link">View Details <i class="fas fa-arrow-right"></i></span>
        </div>
    `).join('');
}

// ============================================
// GLOBAL SEARCH
// ============================================
function performSearch() {
    const query = document.getElementById('globalSearch').value;
    if (query.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

function handleSearchKeydown(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
}

// ============================================
// GET URL PARAMETERS
// ============================================
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    return result;
}

// ============================================
// EQUIPMENT DETAIL
// ============================================
function renderEquipmentDetail() {
    const params = getUrlParams();
    const slug = params.slug;
    const equipment = EQUIPMENT.find(e => e.slug === slug);
    
    if (!equipment) {
        document.getElementById('equipmentDetail').innerHTML = '<p>Equipment not found</p>';
        return;
    }
    
    const container = document.getElementById('equipmentDetail');
    container.innerHTML = `
        <div class="section">
            <div class="container">
                <div class="equipment-header">
                    <h1>${equipment.name}</h1>
                    <span class="badge badge-lg">${equipment.category}</span>
                    <span class="badge badge-status ${equipment.verification_status}">${equipment.verification_status}</span>
                </div>
                
                <div class="equipment-grid">
                    <div class="equipment-main">
                        <h3>Purpose</h3>
                        <p>${equipment.purpose}</p>
                        
                        <h3>Working Principle</h3>
                        <p>${equipment.working_principle}</p>
                        
                        <h3>Main Parts</h3>
                        <ul>
                            ${equipment.main_parts.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                        
                        <h3>How It Works</h3>
                        <p>${equipment.how_it_works}</p>
                        
                        <h3>How It Is Used</h3>
                        <p>${equipment.how_used}</p>
                    </div>
                    
                    <div class="equipment-sidebar">
                        <div class="card">
                            <h4>Applications</h4>
                            <ul>
                                ${equipment.applications.map(a => `<li>${a}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="card">
                            <h4>Safety Precautions</h4>
                            <ul>
                                ${equipment.safety_precautions.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="card">
                            <h4>Related Courses</h4>
                            <ul>
                                ${equipment.course.map(c => `<li>${COURSES.find(course => course.id === c)?.name || c}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    updateAuthUI();
    renderCourses();
    
    // Equipment page
    if (document.getElementById('equipmentGrid')) {
        renderEquipment();
    }
    
    // Equipment detail page
    if (document.getElementById('equipmentDetail')) {
        renderEquipmentDetail();
    }
    
    // Search input
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keydown', handleSearchKeydown);
    }
});