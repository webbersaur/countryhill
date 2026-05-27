/* ===================================================================
   Country Hill Landscaping — Main JS
   Mobile nav, scroll header, scroll animations, smooth scroll
   =================================================================== */

(function () {
  'use strict';

  // ── Mobile Navigation ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');

  function openMobileNav() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('nav-open');
  }

  function closeMobileNav() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('active');
      isOpen ? closeMobileNav() : openMobileNav();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileNav);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      closeMobileNav();
    }
  });

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ── Scroll Header Effect ───────────────────────────────────────
  const header = document.getElementById('header');
  let ticking = false;

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();

  // ── Scroll-Reveal Animations ───────────────────────────────────
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Image Lightbox ─────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxSource = document.getElementById('lightbox-source');
  const lightboxTriggers = document.querySelectorAll('.work-mosaic__trigger');

  if (lightbox && lightboxImage && lightboxTriggers.length > 0) {
    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const src = trigger.getAttribute('data-lightbox-src');
        const srcset = trigger.getAttribute('data-lightbox-srcset');
        const alt = trigger.getAttribute('data-lightbox-alt') || '';
        if (lightboxSource) lightboxSource.setAttribute('srcset', srcset || '');
        lightboxImage.setAttribute('src', src);
        lightboxImage.setAttribute('alt', alt);
        if (typeof lightbox.showModal === 'function') {
          lightbox.showModal();
        } else {
          lightbox.setAttribute('open', '');
        }
        document.body.classList.add('lightbox-open');
      });
    });

    // Close on backdrop click (click target is the dialog itself, not its children)
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.hasAttribute('data-lightbox-close') || e.target.closest('[data-lightbox-close]')) {
        lightbox.close();
      }
    });

    lightbox.addEventListener('close', function () {
      document.body.classList.remove('lightbox-open');
      lightboxImage.setAttribute('src', '');
      if (lightboxSource) lightboxSource.setAttribute('srcset', '');
    });
  }

  // ── Smooth Scroll for Anchor Links ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

})();
