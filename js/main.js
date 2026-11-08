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

// Gallery layout, filled row by row: photo 1 -> column 1, photo 2 -> column 2, ...
// so the first photos in gallery.html form the top row. Columns keep each photo's
// natural height. Without JavaScript, the CSS multi-column layout is used instead.
(() => {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;
  const figures = [...gallery.querySelectorAll("figure")];
  figures.forEach((fig, i) => (fig.dataset.order = i));
  const MIN_COL = 270, GAP = 28, MAX_COLS = 3;
  let current = 0;
  const layout = () => {
    const n = Math.max(1, Math.min(MAX_COLS, Math.floor((gallery.clientWidth + GAP) / (MIN_COL + GAP))));
    if (n === current) return;
    current = n;
    const cols = Array.from({ length: n }, () => {
      const col = document.createElement("div");
      col.className = "gallery-col";
      return col;
    });
    figures.forEach((fig, i) => cols[i % n].appendChild(fig));
    gallery.replaceChildren(...cols);
    gallery.classList.add("rows");
  };
  layout();
  window.addEventListener("resize", layout);
})();

// Gallery lightbox: click a photo to see it large, with its caption.
// Arrows or ← / → to browse, Esc / × / click outside the photo to close.
(() => {
  // in the order of gallery.html (the row-by-row layout moves them into columns)
  const figures = [...document.querySelectorAll(".gallery figure")]
    .sort((a, b) => (a.dataset.order ?? 0) - (b.dataset.order ?? 0));
  if (!figures.length || !window.HTMLDialogElement) return;

  const box = document.createElement("dialog");
  box.className = "lightbox";
  box.innerHTML = `
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
    <button class="lb-close" aria-label="Close">×</button>
    <button class="lb-prev" aria-label="Previous photo">‹</button>
    <button class="lb-next" aria-label="Next photo">›</button>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const caption = box.querySelector("figcaption");
  let current = 0;

  const show = (i) => {
    current = (i + figures.length) % figures.length;
    const src = figures[current].querySelector("img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    caption.textContent = figures[current].querySelector("figcaption")?.textContent || "";
  };

  figures.forEach((fig, i) => {
    const thumb = fig.querySelector("img");
    thumb.tabIndex = 0;
    thumb.setAttribute("role", "button");
    thumb.addEventListener("click", () => { show(i); box.showModal(); });
    thumb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(i); box.showModal(); }
    });
  });

  box.querySelector(".lb-close").addEventListener("click", () => box.close());
  box.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
  // a click on the dark background (not on the photo or a button) closes it
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.tagName === "FIGURE") box.close();
  });
})();
