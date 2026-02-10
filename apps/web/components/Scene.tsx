'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';

// ==================== CONFIGURATION ====================
// UPDATED: The "Pink" is gone. We strictly use Infinite Blue & Cyan.
const INFINITE_BLUE = '#0827dc'; // RGB(8, 39, 220)
const ACCENT_CYAN = '#00d9ff';   // Secondary electric blue for contrast

// ==================== INFINITY SYMBOL GEOMETRY ====================
function createInfinityGeometry(scale = 1) {
  const curve = new THREE.LineCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  );

  // Parametric Lemniscate
  const points: THREE.Vector3[] = [];
  for (let t = 0; t < Math.PI * 2; t += 0.01) {
    const a = 3 * scale;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    const x = (a * Math.cos(t)) / denom;
    const y = (a * Math.sin(t) * Math.cos(t)) / denom;
    const z = Math.sin(t * 2) * 0.5 * scale;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve2 = new THREE.CatmullRomCurve3(points);
  curve2.closed = true;

  const geometry = new THREE.TubeGeometry(curve2, 256, 0.35, 12, true);
  return geometry;
}

// ==================== GLOWING INFINITY SYMBOL ====================
function InfinitySymbol() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scrollRotationRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleWheel = (e: WheelEvent) => {
      scrollRotationRef.current += e.deltaY * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current && materialRef.current && glowMeshRef.current) {
      // Rotation & Parallax
      meshRef.current.rotation.x = scrollRotationRef.current + Math.sin(t * 0.3) * 0.2;
      meshRef.current.rotation.y = scrollRotationRef.current * 1.5 + t * 0.2;
      meshRef.current.rotation.z = Math.cos(t * 0.25) * 0.15;

      glowMeshRef.current.rotation.copy(meshRef.current.rotation);

      const parallaxX = mousePositionRef.current.x * 0.5;
      const parallaxY = mousePositionRef.current.y * 0.5;

      meshRef.current.position.x += (parallaxX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (parallaxY - meshRef.current.position.y) * 0.05;

      glowMeshRef.current.position.copy(meshRef.current.position);

      // Pulse: Now glowing with INFINITE_BLUE intensity
      const pulse = Math.sin(t * 2.5) * 0.4 + 1.2;
      const hoverIntensity = hovered ? 2 : 0;
      materialRef.current.emissiveIntensity = pulse + hoverIntensity;

      // Scale
      const targetScale = hovered ? 1.15 : 1;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      meshRef.current.scale.set(newScale, newScale, newScale);
      glowMeshRef.current.scale.copy(meshRef.current.scale);
    }
  });

  const geometry = useMemo(() => createInfinityGeometry(1), []);

  return (
    <group>
      {/* MAIN SYMBOL: Blue Body + Blue Glow */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <meshStandardMaterial
          ref={materialRef}
          color={INFINITE_BLUE}
          emissive={INFINITE_BLUE} // Replaced Pink with Infinite Blue
          emissiveIntensity={1.5}
          metalness={0.8}          // Increased metalness for better reflection
          roughness={0.1}
          envMapIntensity={1}
          toneMapped={false}
          wireframe={false}
        />
      </mesh>

      {/* GLOW LAYER: Uses Cyan for subtle edge contrast */}
      <mesh ref={glowMeshRef} geometry={geometry}>
        <meshStandardMaterial
          color={ACCENT_CYAN}
          emissive={INFINITE_BLUE} // Replaced Pink with Infinite Blue
          emissiveIntensity={1}
          metalness={0.6}
          roughness={0.4}
          transparent={true}
          opacity={0.2}
          wireframe={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ROTATING RINGS */}
      <group>
        {[0, 1, 2].map((i) => (
          <Torus
            key={i}
            args={[5.5 + i * 0.8, 0.08, 16, 100]}
            rotation={[Math.PI / 2.5, i * Math.PI / 3, 0]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? INFINITE_BLUE : ACCENT_CYAN}
              emissive={INFINITE_BLUE} // Replaced Pink with Infinite Blue
              emissiveIntensity={1.5}
              transparent={true}
              opacity={0.5}
              wireframe={true}
            />
          </Torus>
        ))}
      </group>
    </group>
  );
}

// ==================== PARTICLE FIELD ====================
function ParticleField() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < p.length; i += 3) {
      p[i] = (Math.random() - 0.5) * 40;
      p[i + 1] = (Math.random() - 0.5) * 40;
      p[i + 2] = (Math.random() - 0.5) * 30;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current && ref.current.geometry) {
      ref.current.rotation.x += 0.0001;
      ref.current.rotation.y += 0.0002;
      ref.current.rotation.z += 0.00015;

      const positionAttribute = ref.current.geometry.getAttribute('position') as THREE.BufferAttribute;

      if (positionAttribute) {
        const positions = positionAttribute.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const currentZ = positions[i + 2]!;
          positions[i + 2] = currentZ + Math.sin(state.clock.getElapsedTime() + i) * 0.001;
        }
        positionAttribute.needsUpdate = true;
      }
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={INFINITE_BLUE}
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6} // Increased opacity for richer blue
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ==================== LIGHTING ====================
function Lights() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Replaced ALL Magentas with INFINITE_BLUE */}
      <pointLight position={[8, 5, 8]} intensity={4} color={INFINITE_BLUE} distance={30} decay={2} />
      <pointLight position={[-8, -5, -8]} intensity={4} color={INFINITE_BLUE} distance={30} decay={2} />
      
      {/* Accent Lights kept as Cyan for depth */}
      <pointLight position={[0, 8, -5]} intensity={2} color={ACCENT_CYAN} distance={25} decay={2} />
      
      {/* Rim Lights - Blue Domination */}
      <pointLight position={[0, -10, 0]} intensity={3} color={INFINITE_BLUE} distance={20} decay={2} />
      <pointLight position={[10, 0, 0]} intensity={2} color={ACCENT_CYAN} distance={20} decay={2} />
    </group>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-transparent pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <Lights />
        <ambientLight intensity={0.4} />
        <InfinitySymbol />
        <ParticleField />
      </Canvas>
    </div>
  );
}