/* ==========================================================================
   VYMON — Contact Form & Toast Feedback System
   ========================================================================== */

(function () {
  'use strict';

  // Global Toast function
  window.vymonShowToast = function (message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  function initForm() {
    const contactForm = document.getElementById('project-contact-form');
    const chipBtns = document.querySelectorAll('.chip-btn');
    const copyEmailBtn = document.getElementById('copy-email-btn');

    // Interactive Chip Pickers
    chipBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const type = this.getAttribute('data-chip-type');
        const siblings = document.querySelectorAll(`[data-chip-type="${type}"]`);
        siblings.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
      });
    });

    // Copy Email Action
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const email = 'hello@vymon.studio';
        navigator.clipboard.writeText(email).then(() => {
          window.vymonShowToast('Copied hello@vymon.studio to clipboard');
        }).catch(() => {
          window.location.href = `mailto:${email}`;
        });
      });
    }

    // Form Submission Handling
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const brandInput = document.getElementById('form-brand');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !brandInput.value.trim()) {
          window.vymonShowToast('Please fill in your name, brand, and email.');
          return;
        }

        // Get selected chips
        const selectedProject = document.querySelector('[data-chip-type="project"].selected')?.getAttribute('data-value') || 'CGI Ad Campaign';
        const selectedBudget = document.querySelector('[data-chip-type="budget"].selected')?.getAttribute('data-value') || '₹25k - ₹50k';

        // Submit state
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          Transmitting Project Brief...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          contactForm.reset();

          // Reset chips to default
          chipBtns.forEach(btn => btn.classList.remove('selected'));
          document.querySelector('[data-chip-type="project"]')?.classList.add('selected');
          document.querySelector('[data-chip-type="budget"]')?.classList.add('selected');

          window.vymonShowToast('Project brief received! We will reply within 1–2 business days.');
        }, 1200);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
