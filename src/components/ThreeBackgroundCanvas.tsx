import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const ThreeBackgroundCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isClinical } = useTheme();
  const themeRef = useRef<boolean>(isClinical);

  useEffect(() => {
    themeRef.current = isClinical;
  }, [isClinical]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle nodes representing chemical interactions / pharmaceutical lattice
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      velocities.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.08,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      color: themeRef.current ? 0x7c3aed : 0xc084fc,
      size: 3.5,
      transparent: true,
      opacity: themeRef.current ? 0.40 : 0.45,
      blending: themeRef.current ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Line segments for chemical bond lattice
    const maxBonds = 120;
    const linePositions = new Float32Array(maxBonds * 6);
    const lineColors = new Float32Array(maxBonds * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: themeRef.current ? 0.30 : 0.22,
      blending: themeRef.current ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.04;
      targetY = (e.clientY - height / 2) * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Keep track of theme transitions smoothly
    let currentThemeClinical = themeRef.current;

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Check for theme switch dynamically
      if (currentThemeClinical !== themeRef.current) {
        currentThemeClinical = themeRef.current;
        if (currentThemeClinical) {
          pMaterial.color.setHex(0x7c3aed);
          pMaterial.blending = THREE.NormalBlending;
          pMaterial.opacity = 0.40;
          lineMaterial.blending = THREE.NormalBlending;
          lineMaterial.opacity = 0.30;
        } else {
          pMaterial.color.setHex(0xc084fc);
          pMaterial.blending = THREE.AdditiveBlending;
          pMaterial.opacity = 0.45;
          lineMaterial.blending = THREE.AdditiveBlending;
          lineMaterial.opacity = 0.22;
        }
        pMaterial.needsUpdate = true;
        lineMaterial.needsUpdate = true;
      }

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.03;
      mouseY += (targetY - mouseY) * 0.03;
      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(scene.position);

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce back within bounds
        if (posArray[i * 3] < -200 || posArray[i * 3] > 200) velocities[i].x = -velocities[i].x;
        if (posArray[i * 3 + 1] < -200 || posArray[i * 3 + 1] > 200) velocities[i].y = -velocities[i].y;
        if (posArray[i * 3 + 2] < -100 || posArray[i * 3 + 2] > 100) velocities[i].z = -velocities[i].z;
      }
      posAttr.needsUpdate = true;

      // Update lines between close particles
      let bondIdx = 0;
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (bondIdx >= maxBonds) break;

          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 4800) {
            linePosArray[bondIdx * 6] = posArray[i * 3];
            linePosArray[bondIdx * 6 + 1] = posArray[i * 3 + 1];
            linePosArray[bondIdx * 6 + 2] = posArray[i * 3 + 2];

            linePosArray[bondIdx * 6 + 3] = posArray[j * 3];
            linePosArray[bondIdx * 6 + 4] = posArray[j * 3 + 1];
            linePosArray[bondIdx * 6 + 5] = posArray[j * 3 + 2];

            const alpha = 1.0 - Math.sqrt(distSq) / 70;
            if (currentThemeClinical) {
              // Clinical clean purple/indigo
              lineColArray[bondIdx * 6] = 0.49 * alpha;
              lineColArray[bondIdx * 6 + 1] = 0.23 * alpha;
              lineColArray[bondIdx * 6 + 2] = 0.93 * alpha;

              lineColArray[bondIdx * 6 + 3] = 0.49 * alpha;
              lineColArray[bondIdx * 6 + 4] = 0.23 * alpha;
              lineColArray[bondIdx * 6 + 5] = 0.93 * alpha;
            } else {
              // Lavender / Violet gradient colors
              lineColArray[bondIdx * 6] = 0.65 * alpha;     // R
              lineColArray[bondIdx * 6 + 1] = 0.40 * alpha; // G
              lineColArray[bondIdx * 6 + 2] = 0.98 * alpha; // B

              lineColArray[bondIdx * 6 + 3] = 0.65 * alpha;
              lineColArray[bondIdx * 6 + 4] = 0.40 * alpha;
              lineColArray[bondIdx * 6 + 5] = 0.98 * alpha;
            }

            bondIdx++;
          }
        }
      }

      // Zero out unused lines
      for (let k = bondIdx; k < maxBonds; k++) {
        linePosArray[k * 6] = 0;
        linePosArray[k * 6 + 1] = 0;
        linePosArray[k * 6 + 2] = 0;
        linePosArray[k * 6 + 3] = 0;
        linePosArray[k * 6 + 4] = 0;
        linePosArray[k * 6 + 5] = 0;
      }

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};
