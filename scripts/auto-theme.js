// Theme based on system theme (dark/light)
function setTheme() {
    document.documentElement
        .setAttribute('data-bs-theme', 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        );
}

// Update theme if change
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => setTheme());

setTheme();
