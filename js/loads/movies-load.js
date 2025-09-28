const DATA_URL = "https://raw.githubusercontent.com/PratikKun/XS-Stream-Main/refs/heads/main/movies-load.json";
let allData = []; // store full dataset

async function loadData() {
  const container = document.getElementById("card-container");

  container.innerHTML = `
    <div class="card">
      <div class="card-content">
        <p>Loading...</p>
      </div>
    </div>
  `;

  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error("Failed to fetch JSON");
    allData = await res.json();

    renderCards(allData);
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="card">
        <div class="card-content">
          <p style="color:red;">Failed to load data.</p>
        </div>
      </div>
    `;
  }
}

function renderCards(data) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p style="padding:1rem;">No results found.</p>`;
    return;
  }

  data.forEach((series, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${series.banner}" alt="${series.title}">
      <div class="card-content">
        <h2 class="card-title">${series.title}</h2>
        <p class="card-description">${series.description}</p>
        <a href="player.html?series=${index}&season=0&episode=0" class="watch-now-button">Watch Now</a>
      </div>
    `;
    container.appendChild(div);
  });
}

// 🔍 Search feature
document.addEventListener("input", (e) => {
  if (e.target.id === "searchInput") {
    const query = e.target.value.toLowerCase().trim();
    const filtered = allData.filter(series =>
      series.title.toLowerCase().includes(query) ||
      (series.description && series.description.toLowerCase().includes(query))
    );
    renderCards(filtered);
  }
});

loadData();
