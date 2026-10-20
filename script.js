(() => {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (editor light / dark) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const root = document.documentElement;
  const stored = null; // no localStorage available in this environment
  let theme = stored || "light";
  applyTheme(theme);

  themeToggle?.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    applyTheme(theme);
  });

  function applyTheme(t) {
    if (t === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeLabel) themeLabel.textContent = t;
    themeToggle?.setAttribute("aria-pressed", String(t === "dark"));
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const tabbar = document.getElementById("tabbar");

  menuBtn?.addEventListener("click", () => {
    const isOpen = tabbar.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      tabbar.classList.remove("is-open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Scrollspy: highlight active tab ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const tabs = document.querySelectorAll(".tab[data-tab]");

  const setActiveTab = (id) => {
    tabs.forEach((tab) => {
      const isMatch = tab.getAttribute("href") === `#${id}`;
      tab.classList.toggle("is-active", isMatch);
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-64px 0px -50% 0px" }
    );
    sections.forEach((section) => spyObserver.observe(section));
  }
})();
