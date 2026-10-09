const menuToggle = document.querySelector(
  "button[aria-controls='primary-navigation']",
);
const primaryNavigation = document.querySelector("#primary-navigation");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  primaryNavigation.classList.add("hidden");
  primaryNavigation.classList.remove("flex");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu",
  );
  menuToggle.innerHTML = isExpanded
    ? '<i class="fas fa-bars" aria-hidden="true"></i>'
    : '<i class="fas fa-xmark" aria-hidden="true"></i>';
  primaryNavigation.classList.toggle("hidden", isExpanded);
  primaryNavigation.classList.toggle("flex", !isExpanded);
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const themeToggle = document.querySelector("#theme-toggle");
const projectListDialog = document.querySelector("#project-list-dialog");

function setTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode",
  );
  themeToggle.title = isLight ? "Switch to dark mode" : "Switch to light mode";
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-moon" aria-hidden="true"></i>'
    : '<i class="fas fa-sun" aria-hidden="true"></i>';
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
}

setTheme(localStorage.getItem("portfolio-theme") || "dark");

themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll("[data-project-list-open]").forEach((button) => {
  button.addEventListener("click", () => projectListDialog.showModal());
});

document.querySelectorAll("[data-project-list-close]").forEach((button) => {
  button.addEventListener("click", () => projectListDialog.close());
});

projectListDialog.addEventListener("click", (event) => {
  if (event.target === projectListDialog) projectListDialog.close();
});

const heroRole = document.querySelector("#hero-role");
const heroRoleAnnouncer = document.querySelector("#hero-role-announcer");
const roleDescriptions = [
  "Frontend Developer & Creative Technologist",
  "Thoughtful problem solver",
  "Turning ideas into digital experiences",
  "Creative technologist and storyteller",
  "Building intuitive web experiences",
  "Continually learning and innovating",
];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {
  heroRole.textContent = roleDescriptions[0];
} else {
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeNextCharacter() {
    const phrase = roleDescriptions[phraseIndex];

    if (deleting) {
      characterIndex -= 1;
      heroRole.textContent = phrase.slice(0, characterIndex);
    } else {
      characterIndex += 1;
      heroRole.textContent = phrase.slice(0, characterIndex);
    }

    let delay = deleting ? 32 : 68;

    if (!deleting && characterIndex === phrase.length) {
      heroRoleAnnouncer.textContent = phrase;
      deleting = true;
      delay = 1700;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % roleDescriptions.length;
      delay = 350;
    }

    window.setTimeout(typeNextCharacter, delay);
  }

  heroRole.textContent = "";
  window.setTimeout(typeNextCharacter, 400);
}

const contactForm = document.querySelector("#contact-message-form");
const contactFormStatus = document.querySelector("#contact-form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  if (event.submitter?.value !== "whatsapp") {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    window.location.href = `mailto:jsccess504@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
    contactFormStatus.textContent =
      "Opening your email app with your message ready to send.";
    return;
  }

  const whatsappUrl = `https://wa.me/2349073358266?text=${encodeURIComponent(body)}`;
  const whatsappWindow = window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer",
  );

  if (!whatsappWindow) {
    window.location.href = whatsappUrl;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
