import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Ring({ spin }: { spin: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {/* Band */}
      <mesh castShadow>
        <torusGeometry args={[1, 0.13, 48, 160]} />
        <meshStandardMaterial color="#e8c98a" metalness={1} roughness={0.16} />
      </mesh>
      {/* Setting */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.24, 0.16, 0.2, 24]} />
        <meshStandardMaterial color="#e8c98a" metalness={1} roughness={0.2} />
      </mesh>
      {/* Gem */}
      <mesh position={[0, 1.33, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.34, 0.5, 8]} />
        <meshPhysicalMaterial
          color="#cdd6ff"
          metalness={0.1}
          roughness={0}
          transmission={0.95}
          thickness={0.9}
          ior={2.3}
          iridescence={0.7}
        />
      </mesh>
      <mesh position={[0, 1.56, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.06, 8]} />
        <meshPhysicalMaterial
          color="#eef1ff"
          roughness={0}
          transmission={0.9}
          thickness={0.4}
          ior={2.3}
        />
      </mesh>
    </group>
  );
}

export default function JewelryViewer({ spin = true }: { spin?: boolean }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.9, 4.4], fov: 40 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-3, -1, -2]} intensity={14} color="#6f78f0" distance={12} />
      <Environment preset="city" />
      <Ring spin={spin} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.6}
        maxPolarAngle={2.2}
        rotateSpeed={0.9}
      />
    </Canvas>
  );
}
