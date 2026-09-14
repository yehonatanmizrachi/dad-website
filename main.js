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
  const navTarget = { cbt: "approach", emr: "approach", biofeedback: "approach" };
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

  // Lite YouTube: load the iframe only on click
  document.querySelectorAll(".video[data-yt]").forEach((btn) => {
    btn.setAttribute("aria-label", `ניגון הסרטון: ${btn.querySelector(".video__title").textContent}`);
    btn.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
      iframe.title = btn.querySelector(".video__title").textContent;
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      btn.replaceChildren(iframe);
      btn.removeAttribute("aria-label");
    }, { once: true });
  });

  // Contact form -> WhatsApp message
  const form = document.getElementById("wa-form");
  const error = document.getElementById("form-error");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name: nameInput, phone: phoneInput, message: messageInput } = form.elements;
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();
    if (!name) {
      error.hidden = false;
      nameInput.focus();
      return;
    }
    error.hidden = true;
    const lines = [`שלום שרון, שמי ${name}.`];
    if (phone) lines.push(`טלפון: ${phone}`);
    lines.push(message || "אשמח לתאם שיחת היכרות.");
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

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
