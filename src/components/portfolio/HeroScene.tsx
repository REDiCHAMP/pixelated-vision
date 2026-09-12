import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { cssVariableColor } from "@/lib/three-theme";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;
    float n = snoise(pos * 1.1 + vec3(0.0, uTime * 0.28, 0.0));
    float n2 = snoise(pos * 2.6 - vec3(uTime * 0.18));
    float disp = n * 0.34 + n2 * 0.12;
    pos += normal * disp * uAmp;
    vDisp = disp;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uGlow;
  uniform float uFade;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    float fres = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0), 2.4);
    vec3 base = mix(uColorA, uColorB, smoothstep(-0.4, 0.5, vDisp));
    vec3 color = base + uGlow * fres * 0.55;
    gl_FragColor = vec4(color, uFade);
  }
`;

function ThemeBinder() {
  const { gl, scene } = useThree();

  useEffect(() => {
    gl.setClearColor(0x000000, 0);
    const update = () => {
      const background = cssVariableColor("--background");
      const surface = cssVariableColor("--surface");
      const primary = cssVariableColor("--primary");
      const glow = cssVariableColor("--indigo-glow");
      const foreground = cssVariableColor("--foreground");

      scene.background = background;

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          const material = object.material;
          if (material instanceof THREE.ShaderMaterial) {
            material.uniforms["uColorA"]?.value.copy(surface);
            material.uniforms["uColorB"]?.value.copy(primary);
            material.uniforms["uGlow"]?.value.copy(glow);
          } else if (material instanceof THREE.MeshBasicMaterial && material.name === "theme-wire") {
            material.color.copy(glow);
          }
        }
        if (object instanceof THREE.Points && object.material instanceof THREE.PointsMaterial) {
          object.material.color.copy(
            object.material.name === "theme-particles" ? foreground : glow,
          );
        }
        if (object instanceof THREE.DirectionalLight) object.color.copy(glow);
        if (object instanceof THREE.PointLight) object.color.copy(primary);
      });
    };

    update();
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(update);
      window.setTimeout(update, 720);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [gl, scene]);

  return null;
}

// Stage 1 (scroll 0 → 0.45): noisy crystal calms into a smooth globe.
// Stage 2 (scroll 0.45 → 1): solid shell fades out, wireframe globe takes over,
// then the shell dissolves into the dispersing particle field.
function Crystal({ scroll }: { scroll: React.RefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.5 },
      uFade: { value: 1 },
      uColorA: { value: new THREE.Color("#12123a") },
      uColorB: { value: new THREE.Color("#2f2aa8") },
      uGlow: { value: new THREE.Color("#6f78f0") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = mesh.current;
    const s = scroll.current;
    uniforms.uTime.value += delta;

    // crystal → globe
    const targetAmp = THREE.MathUtils.lerp(0.55, 0.04, THREE.MathUtils.clamp(s / 0.45, 0, 1));
    uniforms.uAmp.value = THREE.MathUtils.lerp(uniforms.uAmp.value, targetAmp, 0.07);
    // globe → dispersal
    const dissolve = THREE.MathUtils.smoothstep(s, 0.5, 0.92);
    uniforms.uFade.value = THREE.MathUtils.lerp(uniforms.uFade.value, 1 - dissolve, 0.08);

    if (wireMat.current) {
      const wireIn = THREE.MathUtils.smoothstep(s, 0.18, 0.55) * (1 - dissolve);
      wireMat.current.opacity = 0.12 + wireIn * 0.5;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.1;
      wire.current.scale.setScalar(1.05 + dissolve * 0.5);
    }

    if (!m) return;
    m.rotation.y += delta * 0.14;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, pointer.y * 0.35, 0.05);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -pointer.x * 0.25, 0.05);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    m.scale.setScalar(pulse * 0.7 * (1 - s * 0.2));
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6} position={[1.9, 0.2, 0]}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 64]} />
        <shaderMaterial
          transparent
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh ref={wire} scale={1.05}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial
          ref={wireMat}
          name="theme-wire"
          color="#818cf8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count, scroll }: { count: number; scroll: React.RefObject<number> }) {
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
    const p = points.current;
    if (!p) return;
    p.rotation.y += delta * 0.03;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, scroll.current * 0.4, 0.05);
    p.scale.setScalar(THREE.MathUtils.lerp(p.scale.x, 1 + scroll.current * 0.4, 0.05));
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        name="theme-particles"
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

/** Shell of points sitting on the crystal that bursts outward as it dissolves. */
function Dispersal({ count, scroll }: { count: number; scroll: React.RefObject<number> }) {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.12;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const p = points.current;
    const s = scroll.current;
    const burst = THREE.MathUtils.smoothstep(s, 0.45, 1);
    if (mat.current) {
      mat.current.opacity = burst * (1 - burst * 0.55) * 1.6;
      mat.current.size = 0.03 + burst * 0.02;
    }
    if (!p) return;
    p.rotation.y += delta * 0.22;
    p.scale.setScalar(0.7 * (1 + burst * 2.6));
  });

  return (
    <points ref={points} position={[1.9, 0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        name="theme-dispersal"
        ref={mat}
        size={0.03}
        color="#c7d2fe"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ScrollRig({ scroll }: { scroll: React.RefObject<number> }) {
  useFrame(({ camera }) => {
    const target = 5.2 + scroll.current * 3.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, scroll.current * -1.1, 0.06);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isSmall ? 450 : 1600;
  const scroll = useRef(0);

  useEffect(() => {
    const update = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <Canvas
      dpr={isSmall ? [1, 1.25] : [1, 1.6]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: !isSmall, alpha: true, powerPreference: "high-performance" }}
    >
      <ThemeBinder />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#818cf8" />
      <pointLight position={[-4, -2, -3]} intensity={12} color="#4f46e5" distance={14} />
      <ScrollRig scroll={scroll} />
      <Crystal scroll={scroll} />
      <Particles count={count} scroll={scroll} />
      <Dispersal count={isSmall ? 300 : 900} scroll={scroll} />
    </Canvas>
  );
}
