# Cartalytics — E-Commerce Customer Analytics Dashboard

A premium, frontend-only Big Data analytics dashboard that demonstrates how e-commerce
companies understand customer behaviour, identify best-selling products, and perform
**Market Basket Analysis** — built entirely with **HTML5, CSS3 and Vanilla JavaScript**.

> All data is **simulated** and inspired by the Online Retail (UCI) and Instacart (Kaggle)
> datasets. No backend, no database, no frameworks.

---

## Project Overview

Cartalytics simulates the analytics stack of a modern online store. It visualises a
year of retail activity — 48k customers, 1.8k products, 129k orders and $4.6M revenue —
across five interactive modules, styled like a 2026 SaaS product (Stripe / Linear /
GA4-inspired design language) with light and dark themes.

## Objectives

- Visualise customer segmentation, retention, behaviour and geography
- Rank best-selling products by units, revenue, rating and growth
- Explain and demonstrate Market Basket Analysis (support, confidence, lift)
- Convert analytics into business recommendations
- Prove that a premium dashboard can be built with zero libraries for charts or UI

## Features

- ✨ Glassmorphism UI, gradient accents, soft shadows, floating cards
- 🌗 Light / dark theme toggle (persisted)
- 🔢 Animated KPI counters, progress bars and circular progress rings
- 📈 Hand-coded SVG line, area, donut and sparkline charts (no Chart.js / D3)
- 🔥 Heat-map of peak shopping hours with hover tooltips
- 🔍 Live product search + sorting (units, revenue, rating, name)
- 🧺 Interactive Market Basket recommendation engine with association rules
- 🕸 Product relationship network graph (SVG)
- 🍞 Toast notifications, loading screen, scroll-to-top, page fade transitions
- 📱 Fully responsive: desktop, laptop, tablet and mobile (hamburger drawer)
- ♿ Semantic HTML, keyboard-focusable controls, `prefers-reduced-motion` support

## Technology Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Structure  | HTML5 (semantic)                             |
| Styling    | CSS3 — variables, Grid, Flexbox, animations  |
| Logic      | Vanilla JavaScript (ES6+)                    |
| Icons      | Font Awesome (CDN)                           |
| Fonts      | Google Fonts — Sora, Inter, JetBrains Mono   |
| Animations | AOS — Animate On Scroll (CDN)                |

No React, Bootstrap, Tailwind, jQuery, Chart.js, backend or database.

## Folder Structure

```
Ecommerce-Customer-Analytics/
│── index.html            → Home dashboard (hero, KPIs, previews)
│── customers.html        → Customer analytics module
│── products.html         → Best-selling products module
│── basket-analysis.html  → Market Basket Analysis module
│── insights.html         → Business insights & recommendations
│── about.html            → Datasets, objectives, workflow
├── css/
│   └── style.css         → Full design system (tokens, components, themes)
├── js/
│   └── script.js         → Counters, theme, charts, search/sort, basket engine
├── images/               → (reserved for screenshots / assets)
└── README.md
```

## Installation

No build tools required.

```bash
git clone <your-repo-url>
cd Ecommerce-Customer-Analytics
```

## How to Run

**Option 1 — just open it:** double-click `index.html` in any modern browser.

**Option 2 — local server (recommended):**

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000

# or VS Code → "Live Server" extension → Open with Live Server
```

## Screenshots

> _Add screenshots of each page here after running the project._

| Page | Preview |
|------|---------|
| Home Dashboard | _screenshot_ |
| Customer Analytics | _screenshot_ |
| Best-Selling Products | _screenshot_ |
| Market Basket Analysis | _screenshot_ |
| Business Insights | _screenshot_ |

## Future Scope

- **Machine Learning** — automatic customer clustering instead of fixed RFM buckets
- **AI Recommendation System** — collaborative filtering in place of static rules
- **Real-Time Analytics** — streaming pipelines (Kafka + Spark) feeding live charts
- **Cloud Computing** — elastic storage/compute on cloud data lakes
- **Predictive Analytics** — demand and churn forecasting
- **In-browser Apriori** — mine association rules live from an uploaded CSV

---

**Team:** Umar Ahmed Siddiqui, Amaan Maniyar · **Department:** Computer Science Engineering · **College:** MGMU SOET

© 2026 Cartalytics — E-Commerce Customer Analytics Dashboard.
