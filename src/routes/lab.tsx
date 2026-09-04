import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import { Background } from "@/components/portfolio/Background";
import { Reveal } from "@/components/portfolio/Reveal";

const LabScene = lazy(() => import("@/components/portfolio/LabScenes"));

const title = "The Lab — WebGL experiments by Zoyan Ahmed";
const description =
  "A playground of small real-time WebGL experiments: shader geometry, instanced wave grids and a procedural point galaxy, built with React Three Fiber.";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LabPage,
});

const experiments = [
  {
    id: "knot" as const,
    index: "01",
    name: "Metal Knot",
    note: "A torus knot with a metallic PBR material and indigo rim lighting.",
  },
  {
    id: "grid" as const,
    index: "02",
    name: "Wave Grid",
    note: "196 instanced cubes displaced by a radial sine wave — one draw call.",
  },
  {
    id: "galaxy" as const,
    index: "03",
    name: "Point Galaxy",
    note: "4,000 procedurally placed points spiralling into four branches.",
  },
];

function LabPage() {
  const [active, setActive] = useState<(typeof experiments)[number]>(experiments[0]!);

  return (
    <>
      <Background />
      <main className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Link
          to="/"
          data-cursor-label="Back"
          className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          ← Back to portfolio
        </Link>

        <Reveal className="mt-10 max-w-2xl">
          <h1 className="text-5xl font-semibold text-balance md:text-7xl">The Lab.</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Small real-time experiments I build while learning graphics programming. Everything here
            runs live in your browser on React Three Fiber.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[18rem_1fr]">
          <ul className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
            {experiments.map((e) => (
              <li key={e.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setActive(e)}
                  data-cursor-label="Run"
                  className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                    active.id === e.id
                      ? "border-primary/60 bg-surface-elevated"
                      : "border-border hover:bg-surface"
                  }`}
                >
                  <span className="font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                    Experiment {e.index}
                  </span>
                  <span className="mt-2 block text-lg font-medium">{e.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{e.note}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="glow-ring h-[26rem] overflow-hidden rounded-3xl border border-border bg-surface/60 md:h-[34rem]">
            <ClientOnly fallback={null}>
              <Suspense fallback={null}>
                <LabScene key={active.id} id={active.id} />
              </Suspense>
            </ClientOnly>
          </div>
        </div>
      </main>
    </>
  );
}
