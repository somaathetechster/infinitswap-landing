'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// --- WHATSAPP-INSPIRED BRAND COLORS ---
const WA_GREEN_DARK = '#075e54'; // WhatsApp Header Green
const WA_GREEN_LIGHT = '#25d366'; // WhatsApp Logo/Online Green
const WA_TEAL = '#128c7e'; // WhatsApp Secondary Teal
const INFINITE_BLUE = '#0827dc'; // Your brand blue (used as a subtle accent)

// --- SHADER DEFINITIONS ---

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 color;
  uniform float time;
  
  void main() {
    // Soft Frosted Glass / Fresnel Effect
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
    
    // Subtle flowing lines instead of harsh grids
    float flow = abs(sin(vPosition.y * 5.0 + time * 0.5));
    flow = smoothstep(0.98, 1.0, flow) * 0.2;
    
    // Mix the base color with the glowing edges
    vec3 finalColor = color + vec3(0.04, 0.36, 0.32) * intensity * 1.5; // Teal edge glow
    finalColor += vec3(flow);
    
    gl_FragColor = vec4(finalColor, 0.85); // High opacity for a solid, premium feel
  }
`;

const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.95);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
    // Soft, clean teal/white glow
    gl_FragColor = vec4(0.07, 0.54, 0.49, 1.0) * intensity * 1.2; 
  }
`;

// --- DATA ---
const NATIONS = [
  { name: "Nigeria", lat: 9.08, lng: 8.67, color: new THREE.Color(WA_GREEN_LIGHT) },
  { name: "Ghana", lat: 7.94, lng: -1.02, color: new THREE.Color(WA_GREEN_LIGHT) },
  { name: "South Africa", lat: -30.55, lng: 22.93, color: new THREE.Color(WA_GREEN_LIGHT) },
  { name: "Kenya", lat: -1.29, lng: 36.82, color: new THREE.Color(WA_GREEN_LIGHT) },
];

// Helper: Convert Lat/Lng to Vector3 on Sphere
function calcPosFromLatLonRad(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function AdvancedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Adjusted camera position to slightly offset the globe, framing the text better
    camera.position.set(2, 0, 14); 
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // --- GROUPING ---
    const globeGroup = new THREE.Group();
    // Tilt the globe to feature Africa prominently
    globeGroup.rotation.x = 0.2; 
    globeGroup.rotation.y = -0.5;
    scene.add(globeGroup);

    // --- 1. THE MAIN GLOBE (SHADER MATERIAL) ---
    const globeGeometry = new THREE.SphereGeometry(3, 64, 64);
    const globeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        // Base color: A very light, frosted mint/teal
        color: { value: new THREE.Vector3(0.95, 0.98, 0.97) }, 
        time: { value: 0 }
      },
      transparent: true,
      blending: THREE.NormalBlending, 
      depthWrite: false,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    // --- 2. INNER SOLID CORE (Occlusion) ---
    const coreGeometry = new THREE.SphereGeometry(2.95, 64, 64);
    // A clean, solid white core to give the glass material something to bounce off
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    // --- 3. ATMOSPHERE GLOW ---
    const atmosGeometry = new THREE.SphereGeometry(3.2, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.5
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    scene.add(atmosphere);

    // --- 4. DATA POINTS (The African Nations) ---
    const pinsGroup = new THREE.Group();
    globeGroup.add(pinsGroup);

    NATIONS.forEach((nation) => {
      const pos = calcPosFromLatLonRad(nation.lat, nation.lng, 3);
      
      // The "Online" Dot
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color: nation.color })
      );
      mesh.position.copy(pos);
      pinsGroup.add(mesh);

      // The Pulse Ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.08, 0.12, 32),
        new THREE.MeshBasicMaterial({ color: nation.color, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })
      );
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0,0,0));
      pinsGroup.add(ring);

      // Animation: Pulse like a WhatsApp typing indicator/notification
      gsap.to(ring.scale, {
        x: 2.5, y: 2.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      
      gsap.to(mesh.material, {
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true
      });
    });

    // --- 5. ORBITAL RINGS (Sleek Data Paths) ---
    const createRing = (radius: number, axis: 'x'|'y'|'z', opacity: number) => {
       const ringGeo = new THREE.TorusGeometry(radius, 0.005, 16, 100); // Extremely thin
       // Using the brand blue here as a subtle contrast to the green
       const ringMat = new THREE.MeshBasicMaterial({ color: INFINITE_BLUE, transparent: true, opacity: opacity });
       const ring = new THREE.Mesh(ringGeo, ringMat);
       if (axis === 'x') ring.rotation.x = Math.PI / 2;
       if (axis === 'y') ring.rotation.y = Math.PI / 2;
       globeGroup.add(ring);
       return ring;
    };

    const ring1 = createRing(3.8, 'x', 0.15);
    const ring2 = createRing(4.2, 'y', 0.1);

    // --- ANIMATION LOOP ---
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Shader Time Update
      globeMaterial.uniforms.time!.value += 0.01;

      // Base Rotation - Slow and majestic
      globeGroup.rotation.y += 0.001;
      
      // Ring Rotations
      ring1.rotation.y += 0.002;
      ring1.rotation.x += 0.001;
      ring2.rotation.x -= 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // --- SCROLL INTERACTION (GSAP) ---
    const handleScroll = () => {
      globeGroup.rotation.y += 0.02; // A gentler spin on scroll
    };
    window.addEventListener('scroll', handleScroll);

    // --- MOUSE PARALLAX ---
    const onMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(globeGroup.rotation, {
        x: (mouseY * 0.1) + 0.2, // Keep the Africa tilt while reacting
        z: -(mouseX * 0.1),
        duration: 1.5,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}