import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Crystal() {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += delta * 0.15;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, pointer.y * 0.35, 0.05);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -pointer.x * 0.25, 0.05);
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    m.scale.setScalar(s);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 24]} />
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#1e1e5a"
          emissiveIntensity={0.6}
          roughness={0.18}
          metalness={0.85}
          distort={0.38}
          speed={1.4}
        />
      </mesh>
      <mesh scale={1.22}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5b4fc"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isSmall ? 500 : 1600;

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#818cf8" />
      <pointLight position={[-4, -2, -3]} intensity={12} color="#4f46e5" distance={14} />
      <Crystal />
      <Particles count={count} />
    </Canvas>
  );
}
