// Tiny opt-in WebAudio sound design engine. No assets, all synthesized.

const STORAGE_KEY = "portfolio:sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = true;
const listeners = new Set<(m: boolean) => void>();

export function initSound() {
  if (typeof window === "undefined") return;
  muted = window.localStorage.getItem(STORAGE_KEY) !== "on";
  emit();
}

function emit() {
  for (const l of listeners) l(muted);
}

export function subscribeSound(fn: (m: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next ? "off" : "on");
  }
  if (!next) void ensureCtx();
  emit();
}

async function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

type ToneOptions = {
  freq: number;
  to?: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
};

function tone({ freq, to, duration = 0.12, type = "sine", gain = 1 }: ToneOptions) {
  if (muted || !ctx || !master) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, now + duration);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gain, now + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(g).connect(master);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function play(fn: () => void) {
  if (muted) return;
  void ensureCtx().then((c) => {
    if (c) fn();
  });
}

export const sfx = {
  tick: () => play(() => tone({ freq: 1180, duration: 0.05, type: "triangle", gain: 0.25 })),
  click: () => play(() => tone({ freq: 520, to: 880, duration: 0.1, type: "square", gain: 0.22 })),
  whoosh: () =>
    play(() => {
      tone({ freq: 220, to: 1400, duration: 0.42, type: "sawtooth", gain: 0.14 });
      tone({ freq: 90, to: 240, duration: 0.5, type: "sine", gain: 0.22 });
    }),
  close: () => play(() => tone({ freq: 900, to: 180, duration: 0.3, type: "sine", gain: 0.2 })),
  chime: () =>
    play(() => {
      tone({ freq: 523.25, duration: 0.5, type: "sine", gain: 0.28 });
      tone({ freq: 783.99, duration: 0.7, type: "sine", gain: 0.2 });
    }),
};
