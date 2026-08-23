import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Cursor } from "@/components/portfolio/Cursor";
import { Preloader } from "@/components/portfolio/Preloader";
import { Background } from "@/components/portfolio/Background";
import { ScrollRail } from "@/components/portfolio/ScrollRail";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Marquee } from "@/components/portfolio/Marquee";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Journey } from "@/components/portfolio/Journey";
import { Beyond } from "@/components/portfolio/Beyond";
import { Contact } from "@/components/portfolio/Contact";

const title = "Zoyan Ahmed — Full Stack & 3D Web Developer";
const description =
  "Portfolio of Zoyan Ahmed, a Software Engineering student and full stack developer from Karachi building immersive 3D, animated web experiences with React, Three.js and the MERN stack.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Background />
      <ScrollRail />
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Skills />
        <Projects />
        <Journey />
        <Beyond />
        <Contact />
      </main>
    </>
  );
}
