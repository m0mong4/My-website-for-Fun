// recherche d'anime : filtre par texte et par genre
const cartes = document.querySelectorAll(".anime-card");
const recherche = document.getElementById("anime-search");
const boutonsGenre = document.querySelectorAll(".anime-genre");
const compteur = document.getElementById("anime-count");
const vide = document.getElementById("anime-empty");
let genre = "All";

// on montre seulement les cartes qui correspondent au texte et au genre choisi
function filtrer() {
	const texte = recherche.value.toLowerCase().trim();
	let visibles = 0;

	cartes.forEach((carte) => {
		const bonGenre = genre === "All" || carte.dataset.genres.split(",").includes(genre);
		const bonTexte = carte.dataset.title.toLowerCase().includes(texte);

		carte.hidden = !(bonGenre && bonTexte);
		carte.classList.remove("open");

		if (!carte.hidden) {
			visibles++;
		}
	});

	compteur.textContent = visibles + (visibles === 1 ? " fav title" : " fav titles");
	vide.hidden = visibles > 0;
}

recherche.addEventListener("input", filtrer);

boutonsGenre.forEach((bouton) => {
	bouton.addEventListener("click", () => {
		genre = bouton.textContent;
		boutonsGenre.forEach((b) => {
			b.setAttribute("aria-pressed", String(b === bouton));
		});
		filtrer();
	});
});

// clic ou Entree = on affiche le resume (utile sur telephone, ou il n'y a pas de survol)
cartes.forEach((carte) => {
	carte.addEventListener("click", () => {
		const etaitOuverte = carte.classList.contains("open");
		cartes.forEach((c) => c.classList.remove("open"));

		if (!etaitOuverte) {
			carte.classList.add("open");
		}
	});

	carte.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			carte.click();
		}
	});
});

filtrer();