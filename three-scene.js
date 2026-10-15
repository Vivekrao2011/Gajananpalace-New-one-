/* ==========================================================================
   VYMON — Three.js Interactive 3D Background
   Floating Chrome Wireframe Geometries + Particle Starfield
   ========================================================================== */

(function () {
  'use strict';

  function initThreeHero() {
    const container = document.getElementById('hero-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222230, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(20, 25, 20);
    scene.add(keyLight);

    const limeRimLight = new THREE.PointLight(0xd4ff00, 3.5, 50);
    limeRimLight.position.set(-15, -10, 10);
    scene.add(limeRimLight);

    const fillLight = new THREE.DirectionalLight(0x445588, 1.2);
    fillLight.position.set(-20, 10, -10);
    scene.add(fillLight);

    // Floating Geometries Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Chrome / Metallic Icosahedron Wireframe + Inner Core
    const icoGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: true,
      wireframeLinewidth: 1.5,
      transparent: true,
      opacity: 0.4
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(12, 1, -2);
    group.add(icosahedron);

    // Inner glowing sphere
    const coreGeo = new THREE.SphereGeometry(2.4, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4ff00,
      emissive: 0xd4ff00,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.65
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    coreSphere.position.set(12, 1, -2);
    group.add(coreSphere);

    // 2. Floating Torus Ring
    const torusGeo = new THREE.TorusGeometry(8.5, 0.25, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.1,
      transparent: true,
      opacity: 0.35
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(12, 1, -2);
    torus.rotation.x = Math.PI / 3;
    torus.rotation.y = Math.PI / 6;
    group.add(torus);

    // 3. Small Orbiting Ring
    const ringGeo = new THREE.RingGeometry(3.6, 3.8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(12, 1, -2);
    ring.rotation.x = Math.PI / 2.2;
    group.add(ring);

    // 4. Subtle Ambient Particle Dust
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
      particleScales[i / 3] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4ff00,
      size: 0.22,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) * 0.0008;
      mouseY = (event.clientY - windowHalfY) * 0.0008;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    function onWindowResize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 1.5 + elapsedTime * 0.12;
      group.rotation.x = targetY * 1.5 + Math.sin(elapsedTime * 0.3) * 0.08;

      // Individual micro-rotations
      icosahedron.rotation.y += 0.004;
      icosahedron.rotation.x += 0.002;
      torus.rotation.z += 0.003;
      ring.rotation.z -= 0.005;

      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // Gentle floating oscillation
      group.position.y = Math.sin(elapsedTime * 0.8) * 0.6;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Initialize once DOM is ready and Three is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeHero);
  } else {
    initThreeHero();
  }
})();
