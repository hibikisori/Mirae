
// Theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function setTheme(mode) {
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  localStorage.setItem('theme', mode);
}
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved);
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

if (burger) {
  burger.addEventListener('click', () => {
    if (getComputedStyle(nav).display === 'none') {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '60px';
      nav.style.right = '16px';
      nav.style.background = getComputedStyle(document.body).backgroundColor;
      nav.style.border = '1px solid var(--border)';
      nav.style.borderRadius = '12px';
      nav.style.padding = '10px';
      nav.style.boxShadow = 'var(--shadow)';
      Array.from(nav.children).forEach(a => a.style.padding = '6px 8px');
    } else {
      nav.removeAttribute('style');
      Array.from(nav.children).forEach(a => a.removeAttribute('style'));
    }
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Contact form -> mailto fallback
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const body = [...data.entries()].map(([k,v]) => `${k}: ${v}`).join('%0D%0A');
    const mail = `mailto:hello@yourdomain.com?subject=New Inquiry (${data.get('tier')})&body=${body}`;
    window.location.href = mail;
  });
}
