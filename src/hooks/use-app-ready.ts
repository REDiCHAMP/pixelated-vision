import { useEffect, useState } from "react";

/**
 * True once the preloader has handed off (or immediately when it never runs,
 * e.g. reduced motion / repeat visits within the session).
 */
export function useAppReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      setReady(true);
      return;
    }
    const done = () => setReady(true);
    window.addEventListener("preloader:done", done);
    const fallback = window.setTimeout(done, 6000);
    return () => {
      window.removeEventListener("preloader:done", done);
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}
