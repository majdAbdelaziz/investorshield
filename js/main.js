'use strict';

// Nav shadow on scroll
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.40)' : 'none';
});

// Hamburger
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
if (hbg && mob) {
  hbg.addEventListener('click', () => mob.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!hbg.contains(e.target) && !mob.contains(e.target)) mob.classList.remove('open');
  });
}

// Active nav link
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(a => {
  if (a.getAttribute('href') === current) a.classList.add('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' });
      if (mob) mob.classList.remove('open');
    }
  });
});

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('on'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
