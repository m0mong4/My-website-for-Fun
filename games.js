// carrousel des jeux : un jeu au centre, les autres sur les cotes
const cartes = document.querySelectorAll(".game-card");
const total = cartes.length;
let courant = 0;

function afficher() {
	cartes.forEach((carte, i) => {
		carte.classList.remove("active", "prev", "next");

		if (i === courant) {
			carte.classList.add("active");
		} else if (i === (courant - 1 + total) % total) {
			carte.classList.add("prev");
		} else if (i === (courant + 1) % total) {
			carte.classList.add("next");
		}
	});
}

function suivant() {
	courant = (courant + 1) % total;
	afficher();
}

function precedent() {
	courant = (courant - 1 + total) % total;
	afficher();
}

document.getElementById("games-next").addEventListener("click", suivant);
document.getElementById("games-prev").addEventListener("click", precedent);

// clic sur une carte du cote = elle passe au centre
cartes.forEach((carte, i) => {
	carte.addEventListener("click", () => {
		if (i !== courant) {
			courant = i;
			afficher();
		}
	});
});

// fleches du clavier
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowRight") suivant();
	if (e.key === "ArrowLeft") precedent();
});

afficher();