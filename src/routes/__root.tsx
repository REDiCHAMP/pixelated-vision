import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuroraBackground } from "@/components/portfolio/AuroraBackground";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { RouteTransition } from "@/components/portfolio/RouteTransition";

function NotFoundComponent() {
  return (
    <div className="noise-grain relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-[2px] rounded-full bg-indigo-glow/70"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
              opacity: 0.2 + ((i % 5) * 0.15),
            }}
          />
        ))}
      </div>

      <div className="relative max-w-lg text-center">
        <div className="mx-auto mb-10 size-40 animate-[blob-drift_18s_ease-in-out_infinite] rounded-[38%] border border-primary/40 bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--indigo-glow)_45%,transparent),transparent_70%)]" />
        <h1 className="font-display text-7xl font-semibold tracking-tight md:text-8xl">
          <span className="text-gradient">404</span>
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Lost in space</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted out of orbit. Press{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">~</kbd> anywhere on
          the site to open the terminal — or head back to solid ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="glow-ring inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase"
          >
            Go home
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-surface-elevated"
          >
            View resume
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackground />
      <Spotlight />
      <RouteTransition />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
