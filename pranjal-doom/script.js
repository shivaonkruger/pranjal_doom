document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBox").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchManga();
        }
    });
    loadAllManga();
});

async function searchManga() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    try {
        const response = await fetch("manga.json");
        const mangaList = await response.json();
        const manga = mangaList.find(m => m.name.toLowerCase().includes(query));
        
        if (manga) {
            displayManga(manga);
        } else {
            hideManga();
            alert("Manga not found");
        }
    } catch (error) {
        console.error("Error fetching manga data:", error);
    }
}

async function loadAllManga() {
    try {
        const response = await fetch("manga.json");
        const mangaList = await response.json();
        const mangaContainer = document.getElementById("mangaList");
        mangaContainer.innerHTML = "";
        
        const visibleManga = 5; // Number of mangas to show initially
        
        mangaList.slice(0, visibleManga).forEach(manga => {
            const mangaItem = createMangaElement(manga);
            mangaContainer.appendChild(mangaItem);
        });
        
        if (mangaList.length > visibleManga) {
            const seeMoreButton = document.createElement("button");
            seeMoreButton.innerText = "See More ↓";
            seeMoreButton.classList.add("see-more-btn");
            seeMoreButton.onclick = function () {
                mangaList.slice(visibleManga).forEach(manga => {
                    const mangaItem = createMangaElement(manga);
                    mangaContainer.appendChild(mangaItem);
                });
                seeMoreButton.style.display = "none";
            };
            mangaContainer.appendChild(seeMoreButton);
        }
    } catch (error) {
        console.error("Error loading manga list:", error);
    }
}

function createMangaElement(manga) {
    const mangaItem = document.createElement("div");
    mangaItem.classList.add("manga-item");
    mangaItem.innerHTML = `
        <div class="manga-container">
            <img src="${manga.poster}" alt="${manga.name} Poster" class="manga-poster">
            <div class="manga-info">
                <h3>${manga.name}</h3>
                <p>${manga.description}</p>
                <a href="${manga.download}" target="_blank" class="download-btn">Download</a>
            </div>
        </div>
    `;
    return mangaItem;
}

function displayManga(manga) {
    document.getElementById("mangaName").innerText = manga.name;
    document.getElementById("mangaPoster").src = manga.poster;
    document.getElementById("mangaDescription").innerText = manga.description;
    document.getElementById("downloadLink").href = manga.download;
    document.getElementById("mangaDisplay").style.display = "block";
}

function hideManga() {
    document.getElementById("mangaDisplay").style.display = "none";
}
