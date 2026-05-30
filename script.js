/* ============================================================
   YANDOTI THANU SRI — PORTFOLIO
   script.js
   ============================================================ */

/* ─── HAMBURGER MENU TOGGLE ─── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections  = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-menu a');

let isClickScrolling = false;
let scrollTimer = null;

function setActiveLink(id) {
  menuLinks.forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('active');
}

function onScroll() {
  if (isClickScrolling) return;
  let currentSection = null;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom > 80) {
      currentSection = sec.id;
    }
  });
  if (currentSection) setActiveLink(currentSection);
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();

      menuLinks.forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      isClickScrolling = true;

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isClickScrolling = false;
      }, 1000);

      // Manually scroll with exact navbar offset
      const navHeight = 60;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── SCROLL-IN ANIMATION ─── */
const animateEls = document.querySelectorAll(
  '.skill-card, .proj-card, .exp-card, .edu-item, .cert-ul li, .abt-info'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

/* ─── RESUME DOWNLOAD ─── */
function downloadResume(e) {
  e.preventDefault();
  const url = 'https://raw.githubusercontent.com/2273A05147/my_resume/main/RESUME%20.pdf';

  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'Yandoti_Thanu_Sri_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      window.open(url, '_blank');
    });
}