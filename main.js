(() => {
  const WA_NUMBER = "972528802452";
  const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  // Prefilled WhatsApp messages on links
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa);
  });

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const list = document.getElementById("nav-list");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    list.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  list.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Sticky nav shadow
  const nav = document.querySelector(".site-nav");
  const sentinel = document.createElement("div");
  nav.before(sentinel);
  new IntersectionObserver(([entry]) => nav.classList.toggle("is-stuck", !entry.isIntersecting)).observe(sentinel);

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Active nav link (method sections count as "approach")
  const links = [...list.querySelectorAll("a")];
  const navTarget = { cbt: "approach", emr: "approach", biofeedback: "approach", trauma: "approach" };
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = navTarget[entry.target.id] || entry.target.id;
      links.forEach((a) => {
        if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main > section[id]").forEach((s) => spy.observe(s));

  // Hide the floating WhatsApp button where it would duplicate on-screen CTAs (hero, contact)
  const fab = document.querySelector(".fab");
  const ctaZones = new Set();
  const fabIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? ctaZones.add(entry.target) : ctaZones.delete(entry.target)));
    fab.classList.toggle("is-hidden", ctaZones.size > 0);
  }, { threshold: 0.15 });
  [document.querySelector(".hero"), document.getElementById("contact")].forEach((el) => fabIo.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
