// Accessibility menu: text size, high contrast, readable font, underlined links, stop motion.
// Settings are saved per visitor (localStorage) and applied early by the inline script in <head>.
(() => {
  const root = document.documentElement;
  const wrap = document.getElementById("a11y");
  if (!wrap) return;
  const toggle = wrap.querySelector(".a11y__toggle");
  const panel = document.getElementById("a11y-panel");
  const sizeOut = wrap.querySelector("[data-a11y-size-value]");
  const FLAGS = ["contrast", "font", "links", "motion"];
  const SIZES = [100, 112.5, 125, 137.5, 150];

  const load = () => {
    try { return JSON.parse(localStorage.getItem("a11y")) || {}; } catch { return {}; }
  };
  const state = { z: 100, f: [], ...load() };

  const save = () => {
    try { localStorage.setItem("a11y", JSON.stringify(state)); } catch { /* storage unavailable */ }
  };

  const render = () => {
    FLAGS.forEach((f) => {
      const on = state.f.includes(f);
      root.classList.toggle(`a11y-${f}`, on);
      const btn = wrap.querySelector(`[data-a11y="${f}"]`);
      if (btn) btn.setAttribute("aria-pressed", String(on));
    });
    root.style.fontSize = state.z === 100 ? "" : `${state.z}%`;
    sizeOut.textContent = `${Math.round(state.z)}%`;
    wrap.querySelector('[data-a11y-size="-1"]').disabled = state.z <= SIZES[0];
    wrap.querySelector('[data-a11y-size="1"]').disabled = state.z >= SIZES[SIZES.length - 1];
  };

  const setOpen = (open, focusToggle) => {
    toggle.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    if (open) panel.querySelector("button").focus();
    else if (focusToggle) toggle.focus();
  };

  toggle.addEventListener("click", () => setOpen(panel.hidden));

  panel.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.a11y) {
      const f = btn.dataset.a11y;
      state.f = state.f.includes(f) ? state.f.filter((x) => x !== f) : [...state.f, f];
    } else if (btn.dataset.a11ySize) {
      const i = SIZES.indexOf(state.z);
      const next = SIZES[Math.min(SIZES.length - 1, Math.max(0, (i < 0 ? 0 : i) + Number(btn.dataset.a11ySize)))];
      state.z = next;
    } else if ("a11yReset" in btn.dataset) {
      state.z = 100;
      state.f = [];
    } else if ("a11yClose" in btn.dataset) {
      setOpen(false, true);
      return;
    }
    save();
    render();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) setOpen(false, true);
  });
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !wrap.contains(e.target)) setOpen(false);
  });

  render();
})();
