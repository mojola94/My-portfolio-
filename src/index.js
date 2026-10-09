const welcomeMessage = document.querySelector("#welcome-message");
const welcomeAnnouncer = document.querySelector("#welcome-message-announcer");
const welcomePhrases = [
  "A warm welcome, just for you",
  "So glad you stopped by",
  "Come on in and explore",
  "Make yourself at home",
  "There's always room for a little inspiration",
];
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (prefersReducedMotion.matches) {
  welcomeMessage.textContent = welcomePhrases[0];
} else {
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  function typeWelcomeMessage() {
    const phrase = welcomePhrases[phraseIndex];
    characterIndex += isDeleting ? -1 : 1;
    welcomeMessage.textContent = phrase.slice(0, characterIndex);

    let delay = isDeleting ? 32 : 65;

    if (!isDeleting && characterIndex === phrase.length) {
      welcomeAnnouncer.textContent = phrase;
      isDeleting = true;
      delay = 1700;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % welcomePhrases.length;
      delay = 350;
    }

    window.setTimeout(typeWelcomeMessage, delay);
  }

  welcomeMessage.textContent = "";
  window.setTimeout(typeWelcomeMessage, 400);
}

const scrollProgress = document.querySelector("#scroll-progress");
let scrollProgressFrame = 0;

function updateScrollProgress() {
  scrollProgressFrame = 0;
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0
      ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
      : 0;

  scrollProgress.style.transform = `scaleX(${progress / 100})`;
  scrollProgress.setAttribute("aria-valuenow", String(Math.round(progress)));
}

function scheduleScrollProgressUpdate() {
  if (scrollProgressFrame) return;
  scrollProgressFrame = window.requestAnimationFrame(updateScrollProgress);
}

window.addEventListener("scroll", scheduleScrollProgressUpdate, {
  passive: true,
});
window.addEventListener("resize", scheduleScrollProgressUpdate);
updateScrollProgress();

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealTargets = document.querySelectorAll("[data-scroll-reveal]");
  revealTargets.forEach((element, index) => {
    element.style.setProperty("--scroll-reveal-delay", `${index * 100}ms`);
  });
  document.body.classList.add("scroll-reveal-ready");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.12 },
  );
  revealTargets.forEach((element) => revealObserver.observe(element));
}
