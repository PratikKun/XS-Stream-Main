const DATA_URL = "https://raw.githubusercontent.com/PratikKun/XS-Stream-Main/refs/heads/main/data.json";
const params = new URLSearchParams(window.location.search);
let seriesIndex = parseInt(params.get("series") || 0);
let seasonIndex = parseInt(params.get("season") || 0);
let episodeIndex = parseInt(params.get("episode") || 0);
let data;

const videoPlayer = document.getElementById("videoPlayer");
const desc = document.getElementById("desc");

function showError(message) {
  desc.innerText = message;
  videoPlayer.src = "";
}

function validateIndices() {
  if (!data || !Array.isArray(data) || seriesIndex >= data.length) {
    showError("Invalid series index");
    return false;
  }

  const series = data[seriesIndex];
  if (!series.seasons || !Array.isArray(series.seasons) || seasonIndex >= series.seasons.length) {
    showError("Invalid season index");
    return false;
  }

  const season = series.seasons[seasonIndex];
  if (!season.episodes || !Array.isArray(season.episodes) || episodeIndex >= season.episodes.length) {
    showError("Invalid episode index");
    return false;
  }

  return true;
}

(async function init() {
  try {
    desc.innerText = "Loading content...";
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error("Failed to fetch content");
    
    data = await res.json();
    if (!validateIndices()) {
      seriesIndex = 0;
      seasonIndex = 0;
      episodeIndex = 0;
    }
    
    setupSelectors();
    loadVideo();
  } catch (err) {
    console.error(err);
    showError("Failed to load content. Please try again later.");
  }
})();

function setupSelectors() {
  const seasonSelect = document.getElementById("seasonSelect");
  const epContainer = document.getElementById("episodeButtons");
  seasonSelect.innerHTML = "";
  epContainer.innerHTML = "";

  if (!validateIndices()) return;

  // Seasons dropdown
  data[seriesIndex].seasons.forEach((season, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = season.name || `Season ${idx + 1}`;
    seasonSelect.appendChild(opt);
  });
  seasonSelect.value = seasonIndex;

  seasonSelect.addEventListener("change", () => {
    seasonIndex = parseInt(seasonSelect.value);
    episodeIndex = 0;
    renderEpisodeButtons();
    loadVideo();
  });

  renderEpisodeButtons();
}

function renderEpisodeButtons() {
  const epContainer = document.getElementById("episodeButtons");
  epContainer.innerHTML = "";
  
  if (!validateIndices()) return;
  
  const episodes = data[seriesIndex].seasons[seasonIndex].episodes;
  episodes.forEach((ep, idx) => {
    const btn = document.createElement("button");
    btn.textContent = ep.title || `Episode ${idx + 1}`;
    if (idx === episodeIndex) {
      btn.style.background = "var(--accent-color, #4a90e2)";
    }
    btn.addEventListener("click", () => {
      episodeIndex = idx;
      loadVideo();
      renderEpisodeButtons(); // Re-render to update active state
    });
    epContainer.appendChild(btn);
  });
}

function loadVideo() {
  if (!validateIndices()) return;

  const series = data[seriesIndex];
  const season = series.seasons[seasonIndex];
  const episode = season.episodes[episodeIndex];
  
  if (!episode.iframe) {
    showError("Video source not available");
    return;
  }
  
  videoPlayer.src = episode.iframe;
  desc.innerText = `${series.title || "Unknown Series"} - ${season.name || "Season " + (seasonIndex + 1)} - ${episode.title || "Episode " + (episodeIndex + 1)}\n${series.description || ""}`;
}
