/* ============================================================
   E-COMMERCE CUSTOMER ANALYTICS DASHBOARD — script.js
   Vanilla JavaScript only. Simulated static data (educational).
   ------------------------------------------------------------
   01. Loading screen
   02. Navbar (scroll shadow, hamburger)
   03. Theme toggle (light / dark)
   04. Toast notifications
   05. Scroll-to-top
   06. Animated counters (IntersectionObserver)
   07. Progress bars, rings & SVG chart animation
   08. AOS init
   09. Product data + grid render + search + sort (products page)
   10. Market basket pairing engine (basket page)
   ============================================================ */

"use strict";

/* ---------- 01. LOADING SCREEN ---------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hidden"), 600);
  }
});

/* ---------- 02. NAVBAR ---------- */
const navbar = document.querySelector(".navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 8);
});

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  // Close drawer when a link is tapped
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );
}

/* ---------- 03. THEME TOGGLE ---------- */
const themeBtn = document.getElementById("themeToggle");

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, val); } catch { /* private mode fallback */ }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeBtn) {
    themeBtn.innerHTML =
      theme === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
}

applyTheme(safeGet("eca-theme") || "light");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    safeSet("eca-theme", next);
    showToast(next === "dark" ? "Dark mode on" : "Light mode on", "success");
  });
}

/* ---------- 04. TOASTS ---------- */
function showToast(message, type = "info") {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "success" : ""}`;
  toast.innerHTML = `<i class="fa-solid ${
    type === "success" ? "fa-circle-check" : "fa-circle-info"
  }"></i><span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("leaving");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, 3200);
}

/* ---------- 05. SCROLL-TO-TOP ---------- */
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 420);
  });
  scrollTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/* ---------- 06. ANIMATED COUNTERS ---------- */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const value = target * eased;
    el.textContent =
      prefix +
      value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- 07. ON-SCROLL ANIMATIONS (counters, bars, rings, lines) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.matches("[data-count]")) animateCounter(el);

      if (el.matches(".bar-fill")) el.style.width = el.dataset.width + "%";

      if (el.matches(".col-bar")) el.style.height = el.dataset.height + "%";

      if (el.matches(".ring .meter")) {
        const pct = parseFloat(el.dataset.pct);
        const circumference = 2 * Math.PI * 50; // r = 50
        el.style.strokeDashoffset = circumference * (1 - pct / 100);
      }

      if (el.matches(".chart-svg")) el.classList.add("animate");

      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.35 }
);

document
  .querySelectorAll("[data-count], .bar-fill, .col-bar, .ring .meter, .chart-svg")
  .forEach((el) => revealObserver.observe(el));

/* ---------- 08. AOS ---------- */
if (window.AOS) {
  AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
}

/* ---------- 09. PRODUCTS PAGE ---------- */
/* Simulated catalogue inspired by the Online Retail & Instacart datasets. */
const PRODUCTS = [
  { name: "Wireless Ergonomic Mouse", cat: "Electronics", icon: "fa-computer-mouse", sold: 4820, revenue: 120500, rating: 4.8, stock: "In Stock", best: true },
  { name: "Organic Whole Milk 1L", cat: "Groceries", icon: "fa-bottle-water", sold: 9640, revenue: 28920, rating: 4.6, stock: "In Stock", best: true },
  { name: "Artisan Sourdough Bread", cat: "Groceries", icon: "fa-bread-slice", sold: 8215, revenue: 32860, rating: 4.7, stock: "In Stock", best: true },
  { name: "Noise-Cancelling Earbuds", cat: "Electronics", icon: "fa-headphones", sold: 3980, revenue: 199000, rating: 4.9, stock: "Low Stock", best: true },
  { name: "Premium Assam Tea 500g", cat: "Groceries", icon: "fa-mug-hot", sold: 6120, revenue: 42840, rating: 4.5, stock: "In Stock", best: false },
  { name: "Cold Brew Coffee Beans", cat: "Groceries", icon: "fa-mug-saucer", sold: 5540, revenue: 66480, rating: 4.7, stock: "In Stock", best: false },
  { name: "14\u2033 Ultrabook Laptop", cat: "Electronics", icon: "fa-laptop", sold: 1240, revenue: 868000, rating: 4.8, stock: "In Stock", best: true },
  { name: "Smartphone Pro 5G", cat: "Electronics", icon: "fa-mobile-screen", sold: 2110, revenue: 1055000, rating: 4.6, stock: "Low Stock", best: false },
  { name: "Butter Croissant Pack", cat: "Bakery", icon: "fa-cookie-bite", sold: 7430, revenue: 22290, rating: 4.4, stock: "In Stock", best: false },
  { name: "Digestive Biscuits Family", cat: "Snacks", icon: "fa-cookie", sold: 6890, revenue: 20670, rating: 4.3, stock: "In Stock", best: false },
  { name: "Cane Sugar 1kg", cat: "Groceries", icon: "fa-cubes-stacked", sold: 5310, revenue: 10620, rating: 4.2, stock: "In Stock", best: false },
  { name: "Yoga Mat Pro Grip", cat: "Fitness", icon: "fa-person-praying", sold: 2960, revenue: 88800, rating: 4.7, stock: "Out of Stock", best: false },
];

const productGrid = document.getElementById("productGrid");

function stockBadge(stock) {
  if (stock === "In Stock") return '<span class="badge badge-green"><i class="fa-solid fa-circle-check"></i> In Stock</span>';
  if (stock === "Low Stock") return '<span class="badge badge-amber"><i class="fa-solid fa-triangle-exclamation"></i> Low Stock</span>';
  return '<span class="badge badge-red"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>';
}

function starRow(rating) {
  const full = Math.floor(rating);
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += i < full ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
  }
  return `${html}<small>${rating.toFixed(1)}</small>`;
}

function renderProducts(list) {
  if (!productGrid) return;
  if (!list.length) {
    productGrid.innerHTML = `
      <div class="card" style="grid-column:1/-1;text-align:center;padding:3rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:1.6rem;color:var(--muted);"></i>
        <h3 style="margin-top:0.8rem;">No products match your search</h3>
        <p>Try a different name or category.</p>
      </div>`;
    return;
  }
  productGrid.innerHTML = list
    .map(
      (p) => `
    <article class="card product-card">
      ${p.best ? '<span class="badge badge-bestseller"><i class="fa-solid fa-crown"></i> Best Seller</span>' : ""}
      <div class="product-img"><i class="fa-solid ${p.icon}"></i></div>
      <p class="product-cat">${p.cat}</p>
      <h3>${p.name}</h3>
      <div class="product-stats">
        <div><span>Units Sold</span><strong>${p.sold.toLocaleString()}</strong></div>
        <div><span>Revenue</span><strong>$${(p.revenue / 1000).toFixed(1)}k</strong></div>
      </div>
      <div class="product-foot">
        <span class="stars">${starRow(p.rating)}</span>
        ${stockBadge(p.stock)}
      </div>
    </article>`
    )
    .join("");
}

function applyProductFilters() {
  const q = (document.getElementById("productSearch")?.value || "").toLowerCase().trim();
  const sort = document.getElementById("productSort")?.value || "sold";
  let list = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
  );
  const sorters = {
    sold: (a, b) => b.sold - a.sold,
    revenue: (a, b) => b.revenue - a.revenue,
    rating: (a, b) => b.rating - a.rating,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  list.sort(sorters[sort]);
  renderProducts(list);
}

if (productGrid) {
  applyProductFilters();
  document.getElementById("productSearch")?.addEventListener("input", applyProductFilters);
  document.getElementById("productSort")?.addEventListener("change", () => {
    applyProductFilters();
    showToast("Products re-sorted", "success");
  });
}

/* ---------- 10. MARKET BASKET PAIRING ENGINE ---------- */
/* Simulated association rules: pick a product, see its strongest pair. */
const RULES = {
  Milk:      { pair: "Bread",      support: 12.4, confidence: 68, lift: 2.4, note: "Households restocking staples buy these in the same trip." },
  Bread:     { pair: "Butter",     support: 10.8, confidence: 61, lift: 2.1, note: "A classic breakfast combination with a strong co-purchase signal." },
  Tea:       { pair: "Sugar",      support: 8.6,  confidence: 57, lift: 2.7, note: "Tea drinkers frequently top up sugar in the same order." },
  Coffee:    { pair: "Biscuits",   support: 7.9,  confidence: 54, lift: 2.9, note: "Evening-snack baskets pair coffee with biscuits most often." },
  Laptop:    { pair: "Mouse",      support: 4.2,  confidence: 72, lift: 5.8, note: "Accessory attach rate spikes right after a laptop purchase." },
  Phone:     { pair: "Earphones",  support: 5.1,  confidence: 66, lift: 4.9, note: "New-phone orders very often include audio accessories." },
};

const pickerChips = document.querySelectorAll(".picker .chip");
const recoPanel = document.getElementById("recoPanel");

pickerChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    pickerChips.forEach((c) => c.classList.remove("selected"));
    chip.classList.add("selected");
    const rule = RULES[chip.dataset.item];
    if (!rule || !recoPanel) return;
    recoPanel.style.display = "block";
    recoPanel.innerHTML = `
      <h4><i class="fa-solid fa-wand-magic-sparkles"></i> Customers who buy ${chip.dataset.item} also buy ${rule.pair}</h4>
      <p>${rule.note}</p>
      <div class="pair-stats">
        <span class="badge badge-blue">Support ${rule.support}%</span>
        <span class="badge badge-green">Confidence ${rule.confidence}%</span>
        <span class="badge badge-amber">Lift ${rule.lift}\u00d7</span>
      </div>`;
    showToast(`Rule generated: ${chip.dataset.item} \u2192 ${rule.pair}`, "success");
  });
});
