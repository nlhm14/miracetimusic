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
    ".hero .container, .page-header, .section h2, .card, .event, .gallery figure, .quote, .about > *, .embed, .email, .video-link"
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

// Little stars scattered across the page background, twinkling at random.
// (They stay still for visitors who turn off animations.)
(() => {
  const field = document.createElement("div");
  field.className = "starfield";
  field.setAttribute("aria-hidden", "true");
  const count = window.innerWidth < 600 ? 28 : 55;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    if (Math.random() < 0.22) {
      star.textContent = "✦";                       // a few small sparkles
      star.style.fontSize = 6 + Math.random() * 6 + "px";
      star.style.setProperty("--o", (0.35 + Math.random() * 0.3).toFixed(2));
    } else {
      star.className = "dot";                        // mostly tiny points
      star.style.setProperty("--o", (0.2 + Math.random() * 0.35).toFixed(2));
    }
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = 5 + Math.random() * 8 + "s";
    star.style.animationDelay = -Math.random() * 12 + "s";
    star.style.opacity = "var(--o)";
    field.appendChild(star);
  }
  document.body.prepend(field);
})();
