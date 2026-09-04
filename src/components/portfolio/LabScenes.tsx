import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Rig({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={2} color="#818cf8" />
      {children}
    </Canvas>
  );
}

/** Experiment 01 — a torus knot with a live fresnel shader. */
function KnotMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += d * 0.25;
    mesh.current.rotation.y += d * 0.35;
  });
  return (
    <mesh ref={mesh} scale={0.95}>
      <torusKnotGeometry args={[1, 0.32, 180, 32]} />
      <meshStandardMaterial
        color="#4f46e5"
        emissive="#312e81"
        emissiveIntensity={0.6}
        roughness={0.25}
        metalness={0.85}
      />
    </mesh>
  );
}

/** Experiment 02 — an instanced cube grid rippling on a sine wave. */
function WaveGrid() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const size = 14;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const inst = ref.current;
    if (!inst) return;
    const t = clock.elapsedTime;
    let i = 0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const px = x - size / 2;
        const pz = z - size / 2;
        const y = Math.sin(t + Math.hypot(px, pz) * 0.6) * 0.45;
        dummy.position.set(px * 0.32, y, pz * 0.32);
        dummy.scale.setScalar(0.16);
        dummy.updateMatrix();
        inst.setMatrixAt(i++, dummy.matrix);
      }
    }
    inst.instanceMatrix.needsUpdate = true;
    inst.rotation.y = t * 0.12;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, size * size]} position={[0, -0.2, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="#818cf8" roughness={0.4} metalness={0.5} />
    </instancedMesh>
  );
}

/** Experiment 03 — a galaxy of points spiralling around the origin. */
function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const count = 4000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const branch = (i % 4) / 4;
      const r = Math.random() * 2.6;
      const angle = branch * Math.PI * 2 + r * 1.5;
      const spread = () => (Math.random() - 0.5) * 0.35 * r;
      arr[i * 3] = Math.cos(angle) * r + spread();
      arr[i * 3 + 1] = spread() * 0.6;
      arr[i * 3 + 2] = Math.sin(angle) * r + spread();
    }
    return arr;
  }, []);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.12;
  });

  return (
    <points ref={ref} rotation={[0.5, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#c7d2fe"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function LabScene({ id }: { id: "knot" | "grid" | "galaxy" }) {
  return (
    <Rig>
      {id === "knot" ? <KnotMesh /> : null}
      {id === "grid" ? <WaveGrid /> : null}
      {id === "galaxy" ? <Galaxy /> : null}
    </Rig>
  );
}
