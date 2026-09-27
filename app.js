const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Project filtering
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;
    cards.forEach(card => {
      const show = category === "all" || card.dataset.category === category;
      card.classList.toggle("hidden", !show);
    });
  });
});

// Project modal
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalClose = document.getElementById("modalClose");

function openModal(card) {
  modalTitle.textContent = card.dataset.title;
  modalDescription.textContent = card.dataset.description;
  modalTech.innerHTML = "";

  card.dataset.tech.split(",").forEach(tech => {
    const tag = document.createElement("span");
    tag.textContent = tech.trim();
    modalTech.appendChild(tag);
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => openModal(button.closest(".project-card")));
});

modalClose.addEventListener("click", closeModal);
document.querySelector("[data-close-modal]").addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Contact form UI (no backend)
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formNote").textContent =
    "Thanks! This demo form is ready to connect to a backend or email service.";
  event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
