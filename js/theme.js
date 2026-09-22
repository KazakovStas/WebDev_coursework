// ==========================================================================
// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (СВЕТЛАЯ / ТЁМНАЯ) + СОХРАНЕНИЕ В LOCALSTORAGE
// ==========================================================================
(function() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    window.toggleTheme = function() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeBtn(next);
    };

    function updateThemeBtn(theme) {
        const btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => updateThemeBtn(saved));
    } else {
        updateThemeBtn(saved);
    }
})();