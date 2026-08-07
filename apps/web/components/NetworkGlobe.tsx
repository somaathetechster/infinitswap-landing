'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { COUNTRIES } from '../lib/countries';

const INFINITE_BLUE = '#0827dc';
const INFINITE_MAGENTA = '#fe009c';
const SOFT_TEAL = '#8df3d3';
const SOFT_WHITE = '#f8fbff';

// Markers follow the shared 7-country footprint, alternating brand colours.
const NATIONS = COUNTRIES.map((country, index) => ({
  name: country.name,
  lat: country.lat,
  lng: country.lng,
  color: new THREE.Color(index % 2 === 0 ? INFINITE_BLUE : INFINITE_MAGENTA),
}));

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
    float fresnel = pow(0.82 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
    float bands = abs(sin(vPosition.y * 4.0 + time * 0.4));
    bands = smoothstep(0.94, 1.0, bands) * 0.12;

    vec3 finalColor = color;
    finalColor += vec3(0.02, 0.08, 0.32) * fresnel * 1.15;
    finalColor += vec3(bands);

    gl_FragColor = vec4(finalColor, 0.88);
  }
`;

const atmosphereVertexShader = `
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;

  void main() {
    float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(0.10, 0.22, 0.86, 1.0) * intensity * 0.8;
  }
`;

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export default function AdvancedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let globeGroup: THREE.Group | null = null;
    let globeMaterial: THREE.ShaderMaterial | null = null;

    const mouse = { x: 0, y: 0 };
    const currentRotation = { x: 0.22, z: 0 };
    const targetRotation = { x: 0.22, z: 0 };

    const getContainerSize = () => {
      const { width, height } = container.getBoundingClientRect();
      return {
        width: Math.max(width, 1),
        height: Math.max(height, 1),
      };
    };

    const { width, height } = getContainerSize();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(1.8, 0.4, 12);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.22;
    globeGroup.rotation.y = -0.52;
    scene.add(globeGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(6, 4, 10);
    scene.add(directionalLight);

    const globeGeometry = new THREE.SphereGeometry(3, 48, 48);
    globeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        color: { value: new THREE.Vector3(0.97, 0.985, 1.0) },
        time: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    const coreGeometry = new THREE.SphereGeometry(2.94, 40, 40);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(SOFT_WHITE),
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    const atmosphereGeometry = new THREE.SphereGeometry(3.22, 40, 40);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const orbitalGroup = new THREE.Group();
    globeGroup.add(orbitalGroup);

    const createRing = (
      radius: number,
      axis: 'x' | 'y' | 'z',
      color: string,
      opacity: number
    ) => {
      const geometry = new THREE.TorusGeometry(radius, 0.008, 10, 120);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
      });
      const ring = new THREE.Mesh(geometry, material);

      if (axis === 'x') ring.rotation.x = Math.PI / 2;
      if (axis === 'y') ring.rotation.y = Math.PI / 2;
      if (axis === 'z') ring.rotation.z = Math.PI / 2;

      orbitalGroup.add(ring);
      return ring;
    };

    const ring1 = createRing(3.78, 'x', INFINITE_BLUE, 0.18);
    const ring2 = createRing(4.1, 'y', INFINITE_MAGENTA, 0.12);

    const pinsGroup = new THREE.Group();
    globeGroup.add(pinsGroup);

    const pulseRings: THREE.Mesh[] = [];
    const pulseDots: THREE.Mesh[] = [];

    NATIONS.forEach((nation, index) => {
      const pos = latLngToVector3(nation.lat, nation.lng, 3.03);

      const dotMaterial = new THREE.MeshBasicMaterial({
        color: nation.color,
        transparent: true,
        opacity: 0.95,
      });

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 14, 14),
        dotMaterial
      );
      dot.position.copy(pos);
      pinsGroup.add(dot);
      pulseDots.push(dot);

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: nation.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.32,
      });

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.10, 0.145, 32),
        ringMaterial
      );
      ring.position.copy(pos.clone().multiplyScalar(1.002));
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      pinsGroup.add(ring);
      pulseRings.push(ring);

      const beamMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(SOFT_TEAL),
        transparent: true,
        opacity: 0.10,
      });

      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.35, 8),
        beamMaterial
      );
      beam.position.copy(pos.clone().multiplyScalar(1.06));
      beam.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        pos.clone().normalize()
      );
      pinsGroup.add(beam);

      dot.userData.phase = index * 0.8;
      ring.userData.phase = index * 0.8;
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotation.x = 0.22 + mouse.y * 0.08;
      targetRotation.z = -mouse.x * 0.08;
    };

    const onPointerLeave = () => {
      targetRotation.x = 0.22;
      targetRotation.z = 0;
    };

    const onResize = () => {
      if (!renderer || !camera) return;
      const { width: nextWidth, height: nextHeight } = getContainerSize();
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      if (!renderer || !scene || !camera || !globeGroup || !globeMaterial) return;

      const elapsed = clock.getElapsedTime();

      globeGroup.rotation.y += 0.0018;
      orbitalGroup.rotation.y += 0.0015;
      ring1.rotation.y += 0.0018;
      ring1.rotation.x += 0.0008;
      ring2.rotation.x -= 0.0014;

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.z += (targetRotation.z - currentRotation.z) * 0.06;

      globeGroup.rotation.x = currentRotation.x;
      globeGroup.rotation.z = currentRotation.z;
      atmosphere.rotation.x = currentRotation.x;
      atmosphere.rotation.y = globeGroup.rotation.y;
      atmosphere.rotation.z = currentRotation.z;

      pulseRings.forEach((ring) => {
        const phase = ring.userData.phase || 0;
        const pulse = (Math.sin(elapsed * 1.8 + phase) + 1) / 2;
        const scale = 1 + pulse * 0.85;
        ring.scale.set(scale, scale, scale);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.14 + pulse * 0.22;
      });

      pulseDots.forEach((dot) => {
        const phase = dot.userData.phase || 0;
        const pulse = (Math.sin(elapsed * 2.1 + phase) + 1) / 2;
        const mat = dot.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.72 + pulse * 0.28;
      });

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);

      if (scene) {
        scene.traverse((object) => {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }

          if (mesh.material) {
            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];

            materials.forEach((material) => material.dispose());
          }
        });
      }

      renderer?.dispose();

      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'auto' }}
    />
  );
}