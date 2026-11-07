// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Grey out concerts whose date has passed (uses data-date="YYYY-MM-DD")
const today = new Date().toISOString().slice(0, 10);
document.querySelectorAll(".event[data-date]").forEach((el) => {
  if (el.dataset.date < today) el.classList.add("past");
});

// Footer year
document.querySelectorAll(".year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
