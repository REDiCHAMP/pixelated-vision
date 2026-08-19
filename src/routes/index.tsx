import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Cursor } from "@/components/portfolio/Cursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
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
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Beyond />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
