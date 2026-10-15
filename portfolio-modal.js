/* ==========================================================================
   VYMON — Portfolio Modal & Clay-to-CGI Comparison Controller
   ========================================================================== */

(function () {
  'use strict';

  const projectsData = {
    beauty: {
      id: 'beauty',
      category: 'Beauty',
      title: 'AURA Radiance Serum',
      result: '+340% ROAS on TikTok Ads',
      headline: 'Zero-Gravity Fluid Dynamics for Luxury Beauty',
      image: 'assets/images/portfolio-beauty.jpg',
      challenge: 'The brand needed an ethereal, scroll-stopping visual identity for a global product launch that highlighted suspended gold micro-droplets without messy physical macro camera rigs.',
      solution: 'VYMON engineered custom FLIP fluid simulations in Houdini, coupling iridescent refraction shaders with Octane dispersion optics to generate hyper-tactile, luminous product films.',
      deliverables: ['3x 15s Cinematic Vertical Ads', '5x 4K Master Stills', 'Social Hook Variations', 'Retail Display Cutdowns'],
      software: ['Houdini FLIP', 'Cinema 4D', 'Octane Render', 'ACEScg Workflow'],
      turnaround: '12 Business Days',
      format: '4K ProRes / 9:16 & 1:1'
    },
    fashion: {
      id: 'fashion',
      category: 'Fashion',
      title: 'CYBER-VOLT Strata Sneaker',
      result: 'Sold out in 4 minutes',
      headline: 'Deconstructed Mechanical Motion for Next-Gen Footwear',
      image: 'assets/images/portfolio-fashion.jpg',
      challenge: 'Launch a revolutionary dual-density carbon fiber sneaker with high-energy visuals that communicate technical craftsmanship and urban agility.',
      solution: 'We built a fully rigged 3D CAD sneaker model with exploded-view kinematics, particulate motion blur, and neon acid-lime edge lighting designed to arrest viewer thumbs in the first 1.2 seconds.',
      deliverables: ['1x 30s Brand Anthem Film', '6x Social Cutdowns', '3D Interactive Viewer Asset'],
      software: ['Unreal Engine 5', 'Cinema 4D', 'Marvelous Designer', 'Nuke'],
      turnaround: '14 Business Days',
      format: '4K UHD / 16:9, 9:16, 4:5'
    },
    tech: {
      id: 'tech',
      category: 'Tech',
      title: 'ASTRA NEBULA Titanium Pro',
      result: '18.4M Organic Views',
      headline: 'Acoustic Soundwave Visuals in Zero-Gravity',
      image: 'assets/images/portfolio-tech.jpg',
      challenge: 'Visualize invisible spatial audio and active noise cancellation in a sleek, obsidian titanium audiophile headset.',
      solution: 'Combined photorealistic anisotropic brushed metal shaders with glowing laser-wave particle fields that pulsate to custom sound design.',
      deliverables: ['2x 20s Feature Launch Films', '8x Ultra-Res Render Stills', 'Amazon A+ Enhanced Visuals'],
      software: ['Cinema 4D', 'Redshift', 'Houdini Particles', 'Ableton Sound FX'],
      turnaround: '10 Business Days',
      format: '4K Master / 16:9 & 9:16'
    },
    beverage: {
      id: 'beverage',
      category: 'Beverage',
      title: 'BOTANICAL BLISS Sparkling Herb',
      result: '8.2x Higher CTR vs Live Action',
      headline: 'Ultra-Crisp Condensation & Botanical Explosions',
      image: 'assets/images/portfolio-beverage.jpg',
      challenge: 'Create thirst-inducing condensation droplets and botanical flavor splashes impossible to film consistently on traditional sets.',
      solution: 'Simulated 14,000 procedural surface droplets and turbulent liquid velocity fields with real-time Octane caustics for an invigorating, icy aesthetic.',
      deliverables: ['4x 10s Social Ad Hooks', 'E-Commerce Hero Assets', 'Billboard Print 8K Render'],
      software: ['Houdini Splash Solver', 'Cinema 4D', 'Octane Studio', 'DaVinci Resolve'],
      turnaround: '9 Business Days',
      format: '4K Ultra / 9:16 & 4:5'
    },
    skincare: {
      id: 'skincare',
      category: 'Skincare',
      title: 'LUMEN Peptide Radiance Cream',
      result: '+185% D2C Conversion Lift',
      headline: 'Velvety Textures Wrapped in Ethereal Silk',
      image: 'assets/images/portfolio-skincare.jpg',
      challenge: 'Communicate the featherlight, nourishing texture of a high-end peptide cream for a luxury skincare rebrand.',
      solution: 'Used Vellum cloth dynamics to simulate weightless silk ribbons interacting seamlessly with frosted ceramic and satin gold packaging.',
      deliverables: ['2x 15s Product Spotlight Ads', '6x Packaging Stills', 'Email Campaign GIF Masters'],
      software: ['Vellum Cloth', 'Cinema 4D', 'Arnold Render', 'Photoshop Master'],
      turnaround: '11 Business Days',
      format: '4K UHD / 1:1 & 9:16'
    },
    luxury: {
      id: 'luxury',
      category: 'Luxury',
      title: 'CHRONO Atelier Masterpiece',
      result: 'Global Launch Campaign Leader',
      headline: 'Micro-Mechanical Tourbillon Precision Render',
      image: 'assets/images/hero-visual.jpg',
      challenge: 'Showcase intricate multi-axis skeleton tourbillon horology with microscopic surface reflections and jewel refractions.',
      solution: 'Engineered sub-millimeter specular lighting rigs and cinematic camera orbits that accentuate every hand-beveled platinum gear and sapphire prism.',
      deliverables: ['1x 45s Flagship Brand Film', '10x Macro Detail Stills', 'Trade Show Loop in 60fps'],
      software: ['Cinema 4D Studio', 'Octane Specular', 'After Effects', 'Soundtrack Mastering'],
      turnaround: '16 Business Days',
      format: '4K 60fps / 16:9 & 9:16'
    }
  };

  function initPortfolioModal() {
    const modalBackdrop = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.portfolio-card');

    if (!modalBackdrop) return;

    // Open Modal
    function openModal(projectId) {
      const data = projectsData[projectId] || projectsData['beauty'];
      
      document.getElementById('modal-category-tag').textContent = data.category;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-metric-badge').textContent = data.result;
      document.getElementById('modal-headline').textContent = data.headline;
      document.getElementById('modal-challenge').textContent = data.challenge;
      document.getElementById('modal-solution').textContent = data.solution;
      document.getElementById('modal-turnaround').textContent = data.turnaround;
      document.getElementById('modal-formats').textContent = data.format;

      // Deliverables list
      const delivContainer = document.getElementById('modal-deliverables');
      if (delivContainer) {
        delivContainer.innerHTML = data.deliverables.map(item => `<li>${item}</li>`).join('');
      }

      // Tech Stack
      const techContainer = document.getElementById('modal-tech-stack');
      if (techContainer) {
        techContainer.innerHTML = data.software.map(item => `<span class="badge">${item}</span>`).join(' ');
      }

      // Update Slider Images
      const finalImg = document.getElementById('slider-final-img');
      const clayImg = document.getElementById('slider-clay-img');
      if (finalImg && clayImg) {
        finalImg.src = data.image;
        clayImg.src = data.image;
      }

      // Reset slider to 50%
      resetSlider();

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Close Modal
    function closeModal() {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });

    projectCards.forEach(card => {
      card.addEventListener('click', function () {
        const projectId = this.getAttribute('data-project');
        openModal(projectId);
      });
    });

    // See All Work button trigger
    const seeAllBtn = document.getElementById('see-all-work-btn');
    if (seeAllBtn) {
      seeAllBtn.addEventListener('click', function () {
        openModal('beauty');
      });
    }

    // Interactive Comparison Slider Dragging
    const sliderContainer = document.getElementById('comparison-slider');
    const cropLayer = document.getElementById('slider-crop-layer');
    const handle = document.getElementById('slider-handle');

    let isDragging = false;

    function resetSlider() {
      if (cropLayer && handle) {
        cropLayer.style.width = '50%';
        handle.style.left = '50%';
      }
    }

    function setSliderPosition(x) {
      if (!sliderContainer || !cropLayer || !handle) return;
      const rect = sliderContainer.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      const percentage = (pos * 100).toFixed(1) + '%';
      cropLayer.style.width = percentage;
      handle.style.left = percentage;
    }

    if (sliderContainer) {
      sliderContainer.addEventListener('mousedown', function (e) {
        isDragging = true;
        setSliderPosition(e.clientX);
      });

      window.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        setSliderPosition(e.clientX);
      });

      window.addEventListener('mouseup', function () {
        isDragging = false;
      });

      // Touch events for mobile
      sliderContainer.addEventListener('touchstart', function (e) {
        isDragging = true;
        setSliderPosition(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        setSliderPosition(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchend', function () {
        isDragging = false;
      });
    }

    // Portfolio Filtering logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory.includes(filterValue)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioModal);
  } else {
    initPortfolioModal();
  }
})();
