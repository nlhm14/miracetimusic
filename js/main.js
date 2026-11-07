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

// Slow fade-in of content as it scrolls into view.
// Content stays visible if JavaScript is off or the browser is too old.
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  const targets = document.querySelectorAll(
    ".hero .container, .page-header, .section h2, .card, .event, .gallery figure, .quote, .about > *, .embed, .email"
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
