"use client";

import * as React from "react";

/** Media-query reduced motion preference (complements Framer MotionConfig). */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefers(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefers;
}
