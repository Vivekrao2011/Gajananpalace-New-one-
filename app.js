/* ==========================================================================
   VYMON — Main Application Controller
   Navigation, Scroll Effects, Custom Cursor, Showreel Player
   ========================================================================== */

(function () {
  'use strict';

  function initApp() {
    // 1. Sticky Navigation Header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // 2. Mobile Menu Drawer Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('active');
          mobileDrawer.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // 3. Active Link Highlighting with IntersectionObserver
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-stagger');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Custom Cursor (for desktop)
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');

    if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = -100, mouseY = -100;
      let followerX = -100, followerY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      }, { passive: true });

      function animateFollower() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(animateFollower);
      }
      requestAnimationFrame(animateFollower);

      // Interactive hover expansions
      const interactiveTargets = document.querySelectorAll('a, button, .portfolio-card, .service-card, .plan-card, .chip-btn');
      interactiveTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
          follower.style.width = '54px';
          follower.style.height = '54px';
          follower.style.borderColor = 'rgba(212, 255, 0, 0.8)';
          follower.style.backgroundColor = 'rgba(212, 255, 0, 0.08)';
        });
        el.addEventListener('mouseleave', () => {
          follower.style.width = '38px';
          follower.style.height = '38px';
          follower.style.borderColor = 'rgba(212, 255, 0, 0.4)';
          follower.style.backgroundColor = 'transparent';
        });
      });
    }

    // 6. Showreel Video Modal Player
    const showreelPlayBtn = document.getElementById('showreel-play-btn');
    const showreelModal = document.getElementById('showreel-modal');
    const showreelCloseBtn = document.getElementById('showreel-close-btn');
    const showreelPlayToggle = document.getElementById('reel-play-toggle');
    const reelProgressFill = document.getElementById('reel-progress-fill');
    const reelTimecode = document.getElementById('reel-timecode');

    let reelInterval = null;
    let reelProgress = 0;
    let isReelPlaying = false;

    function openShowreel() {
      if (!showreelModal) return;
      showreelModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      startReelPlayback();
    }

    function closeShowreel() {
      if (!showreelModal) return;
      showreelModal.classList.remove('active');
      document.body.style.overflow = '';
      pauseReelPlayback();
    }

    function startReelPlayback() {
      isReelPlaying = true;
      if (showreelPlayToggle) {
        showreelPlayToggle.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
      }
      clearInterval(reelInterval);
      reelInterval = setInterval(() => {
        reelProgress += 0.5;
        if (reelProgress > 100) reelProgress = 0;
        if (reelProgressFill) reelProgressFill.style.width = `${reelProgress}%`;
        
        // Calculate simulated time
        const totalSec = 45;
        const currentSec = Math.floor((reelProgress / 100) * totalSec);
        const formatSec = currentSec < 10 ? `0${currentSec}` : currentSec;
        if (reelTimecode) reelTimecode.textContent = `00:${formatSec} / 00:45`;
      }, 225);
    }

    function pauseReelPlayback() {
      isReelPlaying = false;
      clearInterval(reelInterval);
      if (showreelPlayToggle) {
        showreelPlayToggle.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
      }
    }

    if (showreelPlayBtn) {
      showreelPlayBtn.addEventListener('click', openShowreel);
    }

    if (showreelCloseBtn) {
      showreelCloseBtn.addEventListener('click', closeShowreel);
    }

    if (showreelPlayToggle) {
      showreelPlayToggle.addEventListener('click', () => {
        if (isReelPlaying) {
          pauseReelPlayback();
        } else {
          startReelPlayback();
        }
      });
    }

    if (showreelModal) {
      showreelModal.addEventListener('click', (e) => {
        if (e.target === showreelModal) closeShowreel();
      });
    }

    // 7. Back to Top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
