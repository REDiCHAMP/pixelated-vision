import { getMotion } from "@/lib/motion-pref";
import { cssVariableColor } from "@/lib/three-theme";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uScrollVel;
  uniform vec2  uRes;
  uniform vec3  uColorA;   // page background
  uniform vec3  uColorB;   // primary accent

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uRes.x / uRes.y;

    vec2 m = uMouse * 2.0 - 1.0;
    m.x *= uRes.x / uRes.y;
    float md = length(p - m);
    vec2 flow = (p - m) * exp(-md * 1.6) * 0.18;

    float t = uTime * 0.055;
    vec2 q = vec2(fbm(p * 0.9 + t + flow), fbm(p * 0.9 - t * 0.8 + flow));
    float n = fbm(p * 0.9 + q * 1.7 + t * 0.4 + uScroll * 1.5);

    float band = smoothstep(0.18, 0.85, n);
    vec3 col = mix(uColorA, uColorB, band * 0.55);

    // glow pulled toward the cursor
    col += uColorB * exp(-md * 2.2) * 0.22;
    // scroll-velocity brightening
    col += uColorB * clamp(uScrollVel, 0.0, 1.0) * 0.18;

    // vignette to keep edges quiet
    float vig = 1.0 - length(uv * 2.0 - 1.0) * 0.18;
    col *= clamp(vig, 0.6, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function capable(): boolean {
  if (typeof window === "undefined") return false;
  if (getMotion() === "reduced") return false;
  const small = window.matchMedia("(max-width: 768px)").matches;
  const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
  return !(small && lowCore);
}

function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uScrollVel: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uColorA: { value: cssVariableColor("--background") },
      uColorB: { value: cssVariableColor("--primary") },
    };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([-1, -1, 3, -1, -1, 3], 3),
    );
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    scene.add(new THREE.Mesh(geometry, material));

    // half-res render for a cheap fullscreen layer
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(Math.max(1, Math.round(w / 2)), Math.max(1, Math.round(h / 2)), false);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      uniforms.uRes.value.set(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // keep colors in sync with theme changes
    const mo = new MutationObserver(() => {
      const refresh = () => {
        uniforms.uColorA.value.copy(cssVariableColor("--background"));
        uniforms.uColorB.value.copy(cssVariableColor("--primary"));
      };
      window.requestAnimationFrame(refresh);
      window.setTimeout(refresh, 720);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // eased mouse + scroll velocity
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const onMove = (e: PointerEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let lastY = window.scrollY;
    let vel = 0;
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      uniforms.uScroll.value = Math.min(1, Math.max(0, window.scrollY / max));
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      vel = Math.min(1, Math.abs(dy) / 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const startTime = performance.now();
    const render = () => {
      uniforms.uTime.value = (performance.now() - startTime) / 1000;
      uniforms.uMouse.value.lerp(targetMouse, 0.06);
      uniforms.uScrollVel.value = THREE.MathUtils.lerp(uniforms.uScrollVel.value, vel, 0.08);
      vel *= 0.9;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/**
 * The signature living background: a single fullscreen WebGL aurora shader
 * (flowing FBM bands + cursor glow + scroll-velocity hue lift). On capable
 * desktops it replaces the CSS blobs; everywhere else it falls back to the
 * blob background. Mounts lazily via requestIdleCallback so first paint
 * stays fast.
 */
export function AuroraBackground() {
  const [ready, setReady] = useState(false);
  const can = capable();

  useEffect(() => {
    if (!can) return;
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    const start = () => setReady(true);
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 700);
    return () => {
      if (typeof id === "number") window.clearTimeout(id);
    };
  }, [can]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <BackgroundFallback />
      {can && ready ? <AuroraCanvas /> : null}
    </div>
  );
}

// Inline the CSS-blob fallback so this file is self-contained.
function BackgroundFallback() {
  const [hue, setHue] = useState(0);
  useEffect(() => {
    if (getMotion() === "reduced") return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        setHue(Math.round(p * 70 - 20));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="absolute inset-0 transition-[filter] duration-700" style={{ filter: `hue-rotate(${hue}deg)` }}>
      <div className="bg-blob absolute top-[-20%] left-[-10%] size-[70vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_45%,transparent),transparent_65%)] blur-3xl" />
      <div className="bg-blob bg-blob-2 absolute top-[35%] right-[-15%] size-[60vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--indigo-glow)_32%,transparent),transparent_65%)] blur-3xl" />
      <div className="bg-blob bg-blob-3 absolute bottom-[-25%] left-[20%] size-[65vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_55%,transparent),transparent_65%)] blur-3xl" />
    </div>
  );
}
