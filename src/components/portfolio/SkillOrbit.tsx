import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skillGroups } from "@/data/portfolio";

const labels = [...new Set(skillGroups.flatMap((g) => g.items.map((item) => item as string)))];

function Sphere({ onHover }: { onHover: (v: string | null) => void }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const points = useMemo(() => {
    const n = labels.length;
    const r = 3.1;
    return labels.map((label, i) => {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return {
        label,
        pos: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
        ),
      };
    });
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const speed = hovered ? 0.03 : 0.14;
    g.rotation.y += delta * speed;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.4, 0.05);
  });

  return (
    <group ref={group}>
      {points.map(({ label, pos }) => (
        <Billboard key={label} position={pos}>
          <Text
            fontSize={0.24}
            color={hovered === label ? "#c7d2fe" : hovered ? "#4c4a7a" : "#9aa4e8"}
            anchorX="center"
            anchorY="middle"
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(label);
              onHover(label);
            }}
            onPointerOut={() => {
              setHovered(null);
              onHover(null);
            }}
          >
            {label}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

export default function SkillOrbit({ onHover }: { onHover: (v: string | null) => void }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10.5], fov: 45 }} gl={{ alpha: true }}>
      <Sphere onHover={onHover} />
    </Canvas>
  );
}
