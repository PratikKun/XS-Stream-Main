(() => {
  const THEME_KEY = 'xs_theme';
  const btn = document.querySelector('.theam-toggle');
  const themeLink = document.getElementById('theme-style');

  function applyTheme(theme) {
    themeLink.href = theme === 'dark' ? 'styles/index-dark.css' : 'styles/index-light.css';
    btn.textContent = theme === 'dark' ? '☾' : '☀︎';
    localStorage.setItem(THEME_KEY, theme);
  }

  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  btn.addEventListener('click', () => {
    const current = localStorage.getItem(THEME_KEY) || initial;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();

// Dummy JSON data
const data = {
  "title": "Atana",
  "description": "An epic game trailer.",
  "seasons": [
    {
      "name": "Season 1",
      "episodes": [
        { "title": "Episode 1", "iframe": "https://drive.google.com/file/d/1eUrFsf_lbtIKQig4W0NS0jxgD_wYig7M/preview" },
        { "title": "Episode 2", "iframe": "https://drive.google.com/file/d/1eUrFsf_lbtIKQig4W0NS0jxgD_wYig7M/preview" }
      ]
    },
    {
      "name": "Season 2",
      "episodes": [
        { "title": "Episode 1", "iframe": "https://drive.google.com/file/d/1eUrFsf_lbtIKQig4W0NS0jxgD_wYig7M/preview" },
        { "title": "Episode 2", "iframe": "https://www.youtube.com/embed/oHg5SJYRHA0" }
      ]
    }
  ]
};

// Render cards
function renderCards(data) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  data.seasons.forEach((season, seasonIndex) => {
    season.episodes.forEach((ep, epIndex) => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <div class="card-content">
          <h2 class="card-title">${season.name} - ${ep.title}</h2>
          <p class="card-description">${data.description}</p>
          <a href="${ep.iframe}" target="_blank" class="watch-now-button">Watch Now</a>
        </div>
      `;

      container.appendChild(div);
    });
  });
}

renderCards(data);
