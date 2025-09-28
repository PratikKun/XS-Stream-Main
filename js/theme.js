(() => {
  const THEME_KEY = 'xs_theme';
  const btn = document.querySelector('.theme-toggle');
  const themeLink = document.getElementById('theme-style');

  function applyTheme(theme) {
    const newTheme = theme === 'dark' ? 'dark' : 'light';
    const isPlayerPage = window.location.pathname.includes('player.html');
    const prefix = isPlayerPage ? 'player' : 'index';
    themeLink.href = `css/${prefix}-${newTheme}.css`;
    btn.textContent = newTheme === 'dark' ? '☾' : '☀︎';
    localStorage.setItem(THEME_KEY, newTheme);
    document.body.dataset.theme = newTheme;
  }

  // Handle theme changes in other tabs/windows
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_KEY) {
      applyTheme(e.newValue);
    }
  });

  // Apply theme on load
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  
  // Force immediate theme application
  applyTheme(initial);

  // Handle theme toggle click
  btn.addEventListener('click', () => {
    const current = document.body.dataset.theme || initial;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Handle system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
