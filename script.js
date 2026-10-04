// fenetres qui apparaissent quand on scrolle
const fenetres = document.querySelectorAll(".window");
const liens = document.querySelectorAll(".taskbar-link");

// quand une fenetre entre dans l'ecran, on lui met la classe "show"
const observerApparition = new IntersectionObserver(
	(entrees) => {
		entrees.forEach((entree) => {
			if (entree.isIntersecting) {
				entree.target.classList.add("show");
			}
		});
	},
	{ threshold: 0.12 },
);

// la fenetre qui est au milieu de l'ecran allume son bouton dans la barre du bas
const observerMenu = new IntersectionObserver(
	(entrees) => {
		entrees.forEach((entree) => {
			if (!entree.isIntersecting) return;
			liens.forEach((lien) => {
				const actif = lien.getAttribute("href") === "#" + entree.target.id;
				lien.classList.toggle("active", actif);
			});
		});
	},
	{ rootMargin: "-40% 0px -50% 0px" },
);

fenetres.forEach((fenetre) => {
	observerApparition.observe(fenetre);
	observerMenu.observe(fenetre);
});

// horloge
const horloge = document.getElementById("clock");

function majHorloge() {
	horloge.textContent = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
}

majHorloge();
setInterval(majHorloge, 30000);

// carrousel : fleches + glisser avec la souris
const carrousel = document.getElementById("carousel");
let glisse = false;
let departX = 0;
let departScroll = 0;

document.querySelectorAll("[data-d]").forEach((bouton) => {
	bouton.onclick = () => {
		carrousel.scrollBy({ left: bouton.dataset.d * 300, behavior: "smooth" });
	};
});

carrousel.addEventListener("mousedown", (e) => {
	glisse = true;
	departX = e.pageX;
	departScroll = carrousel.scrollLeft;
	carrousel.style.scrollSnapType = "none";
});

window.addEventListener("mouseup", () => {
	glisse = false;
	carrousel.style.scrollSnapType = "";
});

carrousel.addEventListener("mousemove", (e) => {
	if (glisse) {
		carrousel.scrollLeft = departScroll - (e.pageX - departX);
	}
});
