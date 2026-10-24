export {};
document.documentElement.classList.add("js-ready");
const header = document.querySelector<HTMLElement>(".site-header");
const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const nav = document.querySelector<HTMLElement>("#main-nav");
function closeMenu(returnFocus = false) {
  toggle?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("is-open");
  if (returnFocus) toggle?.focus();
}
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  nav?.classList.toggle("is-open", open);
});
nav
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
document.addEventListener("click", (e) => {
  if (e.target instanceof Node && !header?.contains(e.target)) closeMenu();
});
const desktop = matchMedia("(min-width: 1001px)");
desktop.addEventListener("change", () => closeMenu());
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const reveals = document.querySelectorAll<HTMLElement>(".reveal");
// Content is visible by default; enhancement never makes the page depend on JavaScript.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-pending");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
if (!reducedMotion.matches)
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top > innerHeight) {
      el.classList.add("reveal-pending");
      revealObserver.observe(el);
    }
  });
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    reveals.forEach((el) => el.classList.remove("reveal-pending"));
    revealObserver.disconnect();
  }
});
const chapters = [...document.querySelectorAll<HTMLElement>(".story-chapter")];
const storyConsole = document.querySelector<HTMLElement>(".story-console");
const readout = document.querySelector<HTMLElement>(".story-readout");
const storyStatus = document.querySelector<HTMLElement>(".story-status");
const stageLabels = [
  ["Model loaded.\nNow meet production.", "WORKLOAD: CHANGING"],
  ["The GPU is waiting.\nSo are your users.", "BOTTLENECK: UNIDENTIFIED"],
  ["More hardware.\nSame question.", "CAPACITY ≠ EFFICIENCY"],
  ["Find the stall.\nNot another instance.", "NEXT STEP: INVESTIGATE"],
  ["Less waiting.\nMore useful work.", "MEASURE → OPTIMIZE → VALIDATE"],
];
let stage = -1;
let ticking = false;
function updateScroll() {
  header?.classList.toggle("is-scrolled", scrollY > 16);
  if (chapters.length) {
    const target = innerHeight * 0.5;
    let closest = 0;
    let distance = Infinity;
    chapters.forEach((chapter, i) => {
      const r = chapter.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - target);
      if (d < distance) {
        distance = d;
        closest = i;
      }
    });
    if (closest !== stage) {
      stage = closest;
      if (storyConsole) storyConsole.dataset.stage = String(stage);
      if (readout) readout.textContent = stageLabels[stage][0];
      if (storyStatus) storyStatus.textContent = stageLabels[stage][1];
      document
        .querySelectorAll<HTMLElement>("[data-progress]")
        .forEach((el) =>
          el.classList.toggle("active", Number(el.dataset.progress) === stage),
        );
      chapters.forEach((el, i) =>
        el.classList.toggle("is-active", i === stage),
      );
    }
  }
  ticking = false;
}
addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  },
  { passive: true },
);
addEventListener("resize", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateScroll);
  }
});
updateScroll();

const motionButton =
  document.querySelector<HTMLButtonElement>(".motion-toggle");
motionButton?.addEventListener("click", () => {
  const paused = document.body.classList.toggle("motion-paused");
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused ? "RESUME MOTION" : "PAUSE MOTION";
});
