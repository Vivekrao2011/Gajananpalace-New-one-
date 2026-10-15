/* ==========================================================================
   VYMON — Pricing Switcher & Contact Form Synchronization
   ========================================================================== */

(function () {
  'use strict';

  function initPricing() {
    const billingToggle = document.getElementById('billing-toggle');
    const basicPrice = document.getElementById('price-basic');
    const standardPrice = document.getElementById('price-standard');
    const premiumPrice = document.getElementById('price-premium');
    const periodLabels = document.querySelectorAll('.plan-period');
    const choosePlanBtns = document.querySelectorAll('.choose-plan-btn');

    const rates = {
      monthly: {
        basic: '9,999',
        standard: '24,999',
        premium: '49,999',
        period: '/month'
      },
      quarterly: {
        basic: '8,499', // 15% off billed quarterly
        standard: '21,249',
        premium: '42,499',
        period: '/mo (billed quarterly)'
      }
    };

    if (billingToggle) {
      billingToggle.addEventListener('change', function () {
        const isQuarterly = this.checked;
        const currentRate = isQuarterly ? rates.quarterly : rates.monthly;

        if (basicPrice) basicPrice.textContent = currentRate.basic;
        if (standardPrice) standardPrice.textContent = currentRate.standard;
        if (premiumPrice) premiumPrice.textContent = currentRate.premium;

        periodLabels.forEach(label => {
          label.textContent = currentRate.period;
        });

        // Toast feedback
        if (window.vymonShowToast) {
          window.vymonShowToast(isQuarterly ? 'Quarterly billing active (15% savings applied)' : 'Monthly billing active');
        }
      });
    }

    // Connect Plan CTAs to Contact Form Pre-selection
    choosePlanBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const planName = this.getAttribute('data-plan');
        const contactSection = document.getElementById('contact');
        
        // Select project type chip in contact form
        const projectTypeChips = document.querySelectorAll('[data-chip-type="project"]');
        projectTypeChips.forEach(chip => {
          if (chip.getAttribute('data-value') === 'Monthly Subscription' || 
              (planName === 'Custom' && chip.getAttribute('data-value') === 'Custom Scope')) {
            chip.classList.add('selected');
          } else {
            chip.classList.remove('selected');
          }
        });

        // Select budget chip
        const budgetChips = document.querySelectorAll('[data-chip-type="budget"]');
        let targetBudget = '₹25k - ₹50k';
        if (planName === 'Basic') targetBudget = '₹10k - ₹25k';
        if (planName === 'Standard') targetBudget = '₹25k - ₹50k';
        if (planName === 'Premium') targetBudget = '₹50k - ₹1L';
        if (planName === 'Custom') targetBudget = '₹1L+';

        budgetChips.forEach(chip => {
          if (chip.getAttribute('data-value') === targetBudget) {
            chip.classList.add('selected');
          } else {
            chip.classList.remove('selected');
          }
        });

        // Update message field pre-fill
        const messageInput = document.getElementById('form-message');
        if (messageInput) {
          messageInput.value = `Hi VYMON team, we are interested in starting with the ${planName} Plan. Here are some details about our upcoming product visual needs: `;
          messageInput.focus();
        }

        // Scroll to contact form
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }

        if (window.vymonShowToast) {
          window.vymonShowToast(`Selected ${planName} Plan — Details applied to project form`);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricing);
  } else {
    initPricing();
  }
})();
