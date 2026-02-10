'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';

// ==================== CONFIGURATION ====================
const INFINITE_BLUE = '#0827dc';
const INFINITE_MAGENTA = '#fe009c';
const ACCENT_CYAN = '#00d9ff';

// ==================== THE NEURAL CORE (The Brain) ====================
function NeuralCore({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animation Loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = state.mouse;

    if (meshRef.current && coreRef.current && outerRef.current) {
      // 1. MOUSE PARALLAX (The AI "Watches" You)
      // Interpolate current rotation to target rotation (mouse pos)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.5, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5, 0.1);

      // 2. SCROLL INTERACTION (The Journey)
      // Add scroll position to rotation logic
      const scrollRotation = scrollY * 0.002;
      meshRef.current.rotation.z = scrollRotation;

      // 3. HOVER STATE (Activation)
      // Spin faster when hovered
      const spinSpeed = hovered ? 2.5 : 1;
      coreRef.current.rotation.y += 0.01 * spinSpeed;
      coreRef.current.rotation.z += 0.005 * spinSpeed;
      outerRef.current.rotation.x -= 0.01 * spinSpeed;

      // 4. CLICK PULSE (Acknowledgment)
      const targetScale = clicked ? 1.2 : hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // Click Handler for "Pulse" effect
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={handleClick}
    >
      {/* INNER CORE: The Dense Logic Center */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 4]} /> {/* High poly for smooth look */}
        <meshStandardMaterial
          color={clicked ? INFINITE_MAGENTA : INFINITE_BLUE} // Flashes Magenta on click
          emissive={clicked ? INFINITE_MAGENTA : INFINITE_BLUE}
          emissiveIntensity={hovered ? 2 : 1.2}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      {/* OUTER SHELL: The Data Shield */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial
          color={hovered ? ACCENT_CYAN : INFINITE_BLUE}
          emissive={hovered ? ACCENT_CYAN : INFINITE_BLUE}
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ORBITAL RING 1: Vertical Axis */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <OrbitalRing radius={1.8} speed={1} color={INFINITE_MAGENTA} hovered={hovered} />
      </group>

      {/* ORBITAL RING 2: Horizontal Axis */}
      <group rotation={[Math.PI / 2, Math.PI / 6, 0]}>
        <OrbitalRing radius={2.2} speed={-0.8} color={ACCENT_CYAN} hovered={hovered} />
      </group>
    </group>
  );
}

// ==================== HELPER: ORBITAL RINGS ====================
function OrbitalRing({ radius, speed, color, hovered }: { radius: number, speed: number, color: string, hovered: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
        // Spin logic
        ringRef.current.rotation.z += 0.01 * speed * (hovered ? 3 : 1);
    }
  });

  return (
    <Torus ref={ringRef} args={[radius, 0.02, 16, 100]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Torus>
  );
}

// ==================== MAIN COMPONENT ====================
export default function AssistantVisual() {
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for rotation
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-[600px] cursor-pointer outline-none relative">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 2]} // Crisp rendering
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Cinematic Lighting */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color={INFINITE_BLUE} />
        <pointLight position={[-10, -10, -10]} color={INFINITE_MAGENTA} intensity={2} />
        <pointLight position={[0, 5, 0]} color={ACCENT_CYAN} intensity={1} distance={5} />

        {/* Floating Animation for the entire group */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <NeuralCore scrollY={scrollY} />
        </Float>

        {/* Background Sparkles (Data Dust) */}
        <Sparkles 
            count={100} 
            scale={8} 
            size={2} 
            speed={0.4} 
            opacity={0.5} 
            color={ACCENT_CYAN} 
        />

        {/* Shadow to ground it */}
        <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
            color={INFINITE_BLUE} 
        />
      </Canvas>
    </div>
  );
}