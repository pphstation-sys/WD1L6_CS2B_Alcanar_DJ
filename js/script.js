// WD1-L6: External JavaScript for the Developer's Profile page
// Arrays hold the data and for loops generate the HTML, which avoids repeating markup.


// ============================================================
// DATA (edit these arrays with your own content)
// ============================================================

// Mottos shown in the hero section (rotates every 4 seconds)
const mottos = [
  "Dream big, work hard, and never give up.",
  "Simple is powerful.",
  "Build it, break it, learn from it."
];

// Design philosophy pillars (one card per item)
const philosophy = [
  { icon: "🎯", title: "Simplicity", text: "Clean layouts and clear hierarchy. Every element must earn its place." },
  { icon: "🧭", title: "Usability", text: "Clear navigation and an intuitive, seamless experience for every user." },
  { icon: "📱", title: "Responsiveness", text: "A great experience on any screen, from phones to desktops." },
  { icon: "♿", title: "Accessibility", text: "Readable, usable, and welcoming to everyone." }
];

// Projects (Midterm to Finals)
// EDIT: replace titles, descriptions, tech, screenshots, and GitHub links with your own
const projects = [
  {
    title: "Project 1 Title",
    term: "Midterm",
    description: "Short description of what the project does and what you learned.",
    tech: ["HTML", "CSS"],
    image: "images/project1.png",
    github: "https://github.com/yourusername/project1"
  },
  {
    title: "Project 2 Title",
    term: "Midterm",
    description: "Short description of what the project does and what you learned.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/project2.png",
    github: "https://github.com/yourusername/project2"
  },
  {
    title: "Project 3 Title",
    term: "Finals",
    description: "Short description of what the project does and what you learned.",
    tech: ["HTML", "Bootstrap", "JavaScript"],
    image: "images/project3.png",
    github: "https://github.com/yourusername/project3"
  },
  {
    title: "Project 4 Title",
    term: "Finals",
    description: "Short description of what the project does and what you learned.",
    tech: ["HTML", "Bootstrap", "JavaScript"],
    image: "images/project4.png",
    github: "https://github.com/yourusername/project4"
  }
];


// ============================================================
// FUNCTIONS
// ============================================================

// Rotates the motto text in the hero section
function startMottoRotation() {
  const mottoElement = document.getElementById("rotatingMotto");
  let index = 0;

  mottoElement.textContent = mottos[index];   // show the first motto immediately

  setInterval(function () {
    index = (index + 1) % mottos.length;      // wrap back to 0 after the last motto
    mottoElement.textContent = mottos[index];
  }, 4000);
}

// Builds the design philosophy cards using a FOR loop
function renderPhilosophy() {
  const container = document.getElementById("philosophyContainer");
  let cards = "";

  for (let i = 0; i < philosophy.length; i++) {
    cards += `
      <div class="col-sm-6 col-lg-3">
        <div class="card h-100 text-center border-0 shadow-sm hover-card">
          <div class="card-body p-4">
            <div class="philosophy-icon mb-3">${philosophy[i].icon}</div>
            <h3 class="h5 card-title">${philosophy[i].title}</h3>
            <p class="card-text text-muted">${philosophy[i].text}</p>
          </div>
        </div>
      </div>`;
  }

  container.innerHTML = cards;
}

// Builds the project cards using a FOR loop
function renderProjects() {
  const container = document.getElementById("projectContainer");
  let cards = "";

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];

    // Ternary operator: blue badge for Midterm, green badge for Finals
    const badgeColor = p.term === "Midterm" ? "bg-primary" : "bg-success";

    // Build the technology badges with a nested loop
    let techBadges = "";
    for (let j = 0; j < p.tech.length; j++) {
      techBadges += `<span class="badge bg-secondary me-1">${p.tech[j]}</span>`;
    }

    cards += `
      <div class="col-md-6 col-lg-3">
        <div class="card h-100 shadow-sm hover-card">
          <img src="${p.image}" class="card-img-top project-img" alt="Screenshot of ${p.title}"
               onerror="this.src='https://placehold.co/600x350?text=Screenshot'">
          <div class="card-body d-flex flex-column">
            <span class="badge ${badgeColor} align-self-start mb-2">${p.term}</span>
            <h3 class="h5 card-title">${p.title}</h3>
            <p class="card-text">${p.description}</p>
            <div class="mb-3">${techBadges}</div>
            <a href="${p.github}" target="_blank" rel="noopener"
               class="btn btn-outline-dark mt-auto">View on GitHub</a>
          </div>
        </div>
      </div>`;
  }

  container.innerHTML = cards;
}

// Validates the contact form (Bootstrap validation styles) and shows a success message
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", function (event) {
    event.preventDefault();   // stop the page from reloading

    // If any field is invalid, show the red messages and stop
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Valid: show the success message (there is no backend, so nothing is actually sent)
    const name = document.getElementById("fullName").value.trim();
    alertBox.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Thank you, <strong>${name}</strong>! Your message has been received.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

    form.reset();
    form.classList.remove("was-validated");
  });
}

// Handles scroll effects: navbar background and back-to-top button
function setupScrollEffects() {
  const navbar = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    // Navbar gets a dark background after scrolling 50px
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    // Back-to-top button appears after scrolling 300px
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Scroll smoothly to the top when the button is clicked
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Closes the mobile menu after a nav link is clicked
function setupNavbarAutoClose() {
  const menu = document.getElementById("navMenu");
  const links = document.querySelectorAll("#navMenu .nav-link");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      const instance = bootstrap.Collapse.getInstance(menu);
      if (instance) {
        instance.hide();
      }
    });
  }
}


// ============================================================
// INITIALIZE (runs once the HTML is fully loaded)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  startMottoRotation();
  renderPhilosophy();
  renderProjects();
  setupContactForm();
  setupScrollEffects();
  setupNavbarAutoClose();

  // Automatic year in the footer
  document.getElementById("year").textContent = new Date().getFullYear();
});