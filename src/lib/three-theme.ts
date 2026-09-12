import * as THREE from "three";

const numberFromCss = (value: string) =>
  value.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value);

/** Resolve an OKLCH-backed CSS variable into a color Three.js can consume. */
export function cssVariableColor(name: string): THREE.Color {
  const element = document.createElement("div");
  element.style.color = `var(${name})`;
  element.style.display = "none";
  document.body.appendChild(element);
  const computed = getComputedStyle(element).color;
  element.remove();

  const match = computed.match(
    /oklch\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)\s*(?:\/\s*[\w.%]+)?\s*\)/i,
  );
  if (match) {
    const lightness = numberFromCss(match[1] ?? "0");
    const chroma = numberFromCss(match[2] ?? "0");
    const hue = numberFromCss(match[3] ?? "0");
    const radians = (hue * Math.PI) / 180;
    const a = chroma * Math.cos(radians);
    const b = chroma * Math.sin(radians);
    const l = lightness + 0.3963377774 * a + 0.2158037573 * b;
    const m = lightness - 0.1055613458 * a - 0.0638541728 * b;
    const s = lightness - 0.0894841775 * a - 1.291485548 * b;
    const lc = l ** 3;
    const mc = m ** 3;
    const sc = s ** 3;
    const red = 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
    const green = -1.2684380049 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
    const blue = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;
    const gamma = (channel: number) =>
      channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
    const clamp = (channel: number) => Math.min(1, Math.max(0, gamma(channel)));

    return new THREE.Color(clamp(red), clamp(green), clamp(blue));
  }

  return new THREE.Color(computed || "rgb(10, 10, 26)");
}