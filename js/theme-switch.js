(() => {
  const btn = document.querySelector(".theam-toggle");
  const themeLink = document.getElementById("theme-style");
  const THEME_KEY = "xs_theme";

  function applyTheme(theme) {
    themeLink.href = theme === "dark" ? "styles/index-dark.css" : "styles/index-light.css";
    btn.textContent = theme === "dark" ? "☾" : "☀︎";
    localStorage.setItem(THEME_KEY, theme);
  }

  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  btn.addEventListener("click", () => {
    const current = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();
