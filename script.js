(() => {
  'use strict';

  const root = document.documentElement;
  const STORAGE_KEY = 'chris-portfolio-theme';

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById('theme-toggle');

  const getInitialTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeToggle?.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#fafbfd' : '#0b0d12');
  };

  applyTheme(getInitialTheme());

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Follow OS preference if user hasn't chosen one
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  const setMobileNav = (open) => {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.hidden = !open;
  };

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    setMobileNav(!open);
  });

  mobileNav?.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) setMobileNav(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMobileNav(false);
  });

  // Close mobile nav when crossing desktop breakpoint
  const desktopMq = window.matchMedia('(min-width: 900px)');
  desktopMq.addEventListener('change', (e) => {
    if (e.matches) setMobileNav(false);
  });

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = Number(el.getAttribute('data-reveal-delay') || 0);
          window.setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Rotating hero word ---------- */
  const rotator = document.querySelector('.rotating-word');
  if (rotator && !reduced) {
    const words = ['software', 'systems', 'services', 'platforms'];
    let i = 0;
    window.setInterval(() => {
      rotator.classList.add('is-swapping');
      window.setTimeout(() => {
        i = (i + 1) % words.length;
        rotator.textContent = words[i];
        rotator.classList.remove('is-swapping');
      }, 240);
    }, 2600);
  }

  /* ---------- Contact form → mailto ---------- */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!(form instanceof HTMLFormElement)) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Portfolio inquiry from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    const href = `mailto:chr.loewer@googlemai.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;

    if (note) {
      note.textContent = 'Opening your email client…';
      window.setTimeout(() => {
        note.textContent = 'Opens your email client — no server, no tracking.';
      }, 3200);
    }
  });

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Parallax glow (gentle) ---------- */
  const glows = document.querySelectorAll('.hero-glow');
  if (glows.length && !reduced) {
    let raf = 0;
    window.addEventListener(
      'pointermove',
      (e) => {
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 20;
          glows.forEach((g, idx) => {
            const sign = idx % 2 === 0 ? 1 : -1;
            g.style.transform = `translate(${x * sign}px, ${y * sign}px)`;
          });
          raf = 0;
        });
      },
      { passive: true }
    );
  }
})();
