'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

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
    // Atmosphere / Fresnel Effect
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    
    // Grid/Tech Lines effect
    float grid = abs(sin(vPosition.y * 20.0 + time * 2.0));
    grid = smoothstep(0.95, 1.0, grid) * 0.5;
    
    vec3 finalColor = color + vec3(0.0, 0.5, 1.0) * intensity;
    finalColor += vec3(grid * 0.5);
    
    gl_FragColor = vec4(finalColor, 1.0); // Solid but glowing
  }
`;

const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9); // Slightly smaller to sit behind/around
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.03, 0.15, 0.86, 1.0) * intensity * 2.0;
  }
`;

// --- DATA ---
const NATIONS = [
  { name: "Nigeria", lat: 9.08, lng: 8.67, color: new THREE.Color('#FF006E') },
  { name: "Ghana", lat: 7.94, lng: -1.02, color: new THREE.Color('#00D9FF') },
  { name: "South Africa", lat: -30.55, lng: 22.93, color: new THREE.Color('#FFD700') },
  { name: "Kenya", lat: -1.29, lng: 36.82, color: new THREE.Color('#00FF88') }, // Replaced Tanzania with Kenya based on your previous node list
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
    // No background color set here - keeping it transparent for your CSS gradient
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12; // Initial Zoom
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Important for transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // --- GROUPING ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // --- 1. THE MAIN GLOBE (SHADER MATERIAL) ---
    const globeGeometry = new THREE.SphereGeometry(3, 64, 64);
    const globeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        color: { value: new THREE.Vector3(0.03, 0.03, 0.1) }, // Deep Dark Blue Base
        time: { value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending, // Gives it that hologram look
      depthWrite: false,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    // --- 2. INNER SOLID CORE (Occlusion) ---
    const coreGeometry = new THREE.SphereGeometry(2.95, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    // --- 3. ATMOSPHERE GLOW ---
    const atmosGeometry = new THREE.SphereGeometry(3.3, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    scene.add(atmosphere); // Add to scene, not group, so it stays stable

    // --- 4. DATA POINTS (The African Nations) ---
    const pinsGroup = new THREE.Group();
    globeGroup.add(pinsGroup);

    NATIONS.forEach((nation) => {
      const pos = calcPosFromLatLonRad(nation.lat, nation.lng, 3);
      
      // The Glowing Pin
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshBasicMaterial({ color: nation.color })
      );
      mesh.position.copy(pos);
      pinsGroup.add(mesh);

      // The Pulse Ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.15, 32),
        new THREE.MeshBasicMaterial({ color: nation.color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
      );
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0,0,0));
      pinsGroup.add(ring);

      // Animation: Pulse
      gsap.to(ring.scale, {
        x: 2, y: 2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Animation: Glow Intensity
      gsap.to(mesh.material, {
        opacity: 0.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true
      });
    });

    // --- 5. ORBITAL RINGS (Sci-Fi Aesthetics) ---
    const createRing = (radius: number, axis: 'x'|'y'|'z') => {
       const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
       const ringMat = new THREE.MeshBasicMaterial({ color: 0x334466, transparent: true, opacity: 0.3 });
       const ring = new THREE.Mesh(ringGeo, ringMat);
       if (axis === 'x') ring.rotation.x = Math.PI / 2;
       if (axis === 'y') ring.rotation.y = Math.PI / 2;
       globeGroup.add(ring);
       return ring;
    };

    const ring1 = createRing(4, 'x');
    const ring2 = createRing(4.5, 'y');

    // --- ANIMATION LOOP ---
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Shader Time Update
      globeMaterial.uniforms.time!.value += 0.01;

      // Base Rotation
      globeGroup.rotation.y += 0.002;
      
      // Ring Rotations
      ring1.rotation.y += 0.005;
      ring1.rotation.x += 0.002;
      ring2.rotation.x -= 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // --- SCROLL INTERACTION (GSAP) ---
    const handleScroll = () => {
      // Rotate globe faster when scrolling
      globeGroup.rotation.y += 0.05;
    };
    window.addEventListener('scroll', handleScroll);

    // --- MOUSE PARALLAX ---
    const onMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(globeGroup.rotation, {
        x: mouseY * 0.2, // Tilt up/down slightly
        duration: 1
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
      style={{ pointerEvents: 'none' }} // Let clicks pass through to UI content
    />
  );
}