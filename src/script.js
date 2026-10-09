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
