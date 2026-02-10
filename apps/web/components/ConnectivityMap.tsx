'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Text, CatmullRomLine, PerspectiveCamera, useCursor, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
const BRAND_BLUE = "#0827dc";
const BRAND_MAGENTA = "#fe009c";
const BRAND_CYAN = "#00f0ff";

// Spatial Coordinates (Abstract Map of Africa/Global connections)
// X = East/West, Y = North/South (on flat plane)
const NODES = [
  { id: "NG", label: "Nigeria", x: -1.5, y: 1, z: 0, region: "West Africa" },
  { id: "TZ", label: "Tanzania", x: 2.5, y: 0.5, z: 0, region: "East Africa" },
  { id: "SA", label: "South Africa", x: 1.5, y: -3, z: 0, region: "South Africa" },
  { id: "GH", label: "Ghana", x: -2.8, y: 1.5, z: 0, region: "West Africa" },
  { id: "LHR", label: "London (Bridge)", x: -0.5, y: 5.5, z: -1, region: "Liquidity Provider" }, // Contextual anchor
];

// Connections definitions (Index of NODES)
const CONNECTIONS = [
  [0, 4], // Lagos -> London
  [0, 3], // Lagos -> Accra
  [0, 2], // Lagos -> Joburg
  [2, 1], // Joburg -> Nairobi
  [1, 4], // Nairobi -> London
];

// --- COMPONENTS ---

const MapPlane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <meshStandardMaterial 
        color="#020410" 
        wireframe 
        transparent 
        opacity={0.08} 
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

const NodePoint = ({ node, isSelected, onClick }: { node: any, isSelected: boolean, onClick: (vec: THREE.Vector3) => void }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); // Changes cursor on hover

  const scale = hovered || isSelected ? 1.5 : 1;
  const color = hovered ? BRAND_MAGENTA : isSelected ? BRAND_CYAN : BRAND_BLUE;

  return (
    <group position={[node.x, node.y, node.z]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh 
          onClick={(e) => { e.stopPropagation(); onClick(new THREE.Vector3(node.x, node.y, node.z)); }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 4 : 2} 
            toneMapped={false} 
          />
        </mesh>
        
        {/* Glow Halo */}
        <mesh scale={[2, 2, 2]}>
          <ringGeometry args={[0.12, 0.15, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Futuristic Label */}
      <Html distanceFactor={10} position={[0.3, 0.3, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`transition-all duration-300 ${hovered || isSelected ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-2'}`}>
          <div className="flex flex-col items-start">
            <span className="font-display font-bold text-lg text-white uppercase leading-none" style={{ textShadow: `0 0 10px ${color}` }}>
              {node.id}
            </span>
            <span className="font-mono text-[8px] bg-black/80 px-1 py-0.5 border border-white/20 text-white/70 uppercase">
              {node.label}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};

const DataStream = ({ start, end }: { start: number[], end: number[] }) => {
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    
    // Create a curved path (Arc)
    const mid = startVec.clone().lerp(endVec, 0.5);
    mid.z += 1.5; // Lift the curve up in Z space (3D arc)
    
    return [startVec, mid, endVec];
  }, [start, end]);

  // Animate the dash offset
  const materialRef = useRef<any>(null);
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.dashOffset -= 0.01; // Moving data effect
    }
  });

  return (
    <CatmullRomLine
      points={points}
      color={BRAND_BLUE}
      lineWidth={1}
      dashed
      dashScale={2}
      dashSize={2} // Short dashes
      gapSize={1} 
      onUpdate={(line: any) => {
         // @ts-ignore
         materialRef.current = line.material;
      }}
    />
  );
};

const CameraController = ({ targetPosition }: { targetPosition: THREE.Vector3 | null }) => {
  const { camera, mouse } = useThree();
  const initialPos = new THREE.Vector3(0, 0, 8); // Top-down-ish view
  
  useFrame(() => {
    // 1. Mouse Parallax (Subtle movement based on mouse position)
    const parallaxX = mouse.x * 0.5;
    const parallaxY = mouse.y * 0.5;

    let targetCamPos = initialPos.clone();
    let lookAtTarget = new THREE.Vector3(0, 0, 0);

    if (targetPosition) {
        // Zoomed in state
        targetCamPos = new THREE.Vector3(targetPosition.x, targetPosition.y - 1, targetPosition.z + 4);
        lookAtTarget = targetPosition;
    }

    // Apply smooth interpolation (Lerp)
    camera.position.lerp(
      new THREE.Vector3(targetCamPos.x + parallaxX, targetCamPos.y + parallaxY, targetCamPos.z),
      0.05
    );
    
    // Smooth LookAt
    const currentLookAt = new THREE.Vector3(0,0,0); // Need to store current lookAt if we want smooth rotation, simplified here
    camera.lookAt(lookAtTarget);
  });

  return null;
};

// --- MAIN EXPORT ---

export default function ConnectivityMap() {
  const [selectedNodePos, setSelectedNodePos] = useState<THREE.Vector3 | null>(null);

  // Scroll Interaction
  useEffect(() => {
    const handleScroll = () => {
       // Reset selection on scroll to "zoom out"
       if(window.scrollY > 100) setSelectedNodePos(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="h-[120vh] relative bg-[#020410] overflow-hidden border-t border-white/5">
      
      {/* 3D SCENE */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color={BRAND_BLUE} />
          <pointLight position={[-10, -5, 5]} intensity={2} color={BRAND_MAGENTA} />
          
          <CameraController targetPosition={selectedNodePos} />

          <group rotation={[0.2, 0, 0]}> {/* Tilt the whole map for better 3D view */}
            <MapPlane />

            {/* Render Nodes */}
            {NODES.map((node, i) => (
              <NodePoint 
                key={node.id} 
                node={node} 
                isSelected={selectedNodePos?.x === node.x && selectedNodePos?.y === node.y}
                onClick={(vec) => setSelectedNodePos(vec)} 
              />
            ))}

            {/* Render Connections */}
            {CONNECTIONS.map(([startIdx, endIdx], i) => {
              // FIX: Safety check. If for some reason data is missing, don't render this line.
              if (startIdx === undefined || endIdx === undefined) return null;

              const startNode = NODES[startIdx];
              const endNode = NODES[endIdx];

              // Double check nodes exist
              if (!startNode || !endNode) return null;

              return (
                <DataStream 
                  key={i} 
                  start={[startNode.x, startNode.y, startNode.z]} 
                  end={[endNode.x, endNode.y, endNode.z]} 
                />
              );
            })}
          </group>

          {/* Fog for depth fading */}
          <fog attach="fog" args={['#020410', 5, 20]} />
        </Canvas>
      </div>

      {/* OVERLAY CONTENT */}
      <div className="relative z-10 pointer-events-none h-full flex flex-col justify-center items-center text-center px-4">
        <h2 className="font-display text-5xl md:text-8xl uppercase leading-[0.85] text-white mix-blend-screen opacity-90">
          Neural <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-infinite-blue to-infinite-magenta italic">
            Architecture.
          </span>
        </h2>
        <p className="font-mono text-xs md:text-sm text-white/50 mt-8 max-w-md uppercase tracking-widest bg-black/50 backdrop-blur-md p-4 border border-white/10">
          [Interactive Mode] <br/>
          Click on nodes to inspect local liquidity pools. <br/>
          Move cursor to initiate parallax drift.
        </p>
      </div>
      
    </section>
  );
}