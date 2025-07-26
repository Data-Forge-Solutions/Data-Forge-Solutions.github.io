function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

window.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('theme') || 'dark';
    setTheme(stored);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', toggleTheme);
    }
});