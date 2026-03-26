"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function GlobalCanvasWrapper() {
  const pathname = usePathname();

  // Normalize pathname to handle trailing slashes
  const normalizedPathname = pathname?.replace(/\/$/, "") || "/";

  // Disable global canvas on the home page to avoid WebGL context conflicts with Hero3D
  const isHomePage = normalizedPathname === "" || normalizedPathname === "/";

  const [CanvasComp, setCanvasComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!isHomePage) {
      const id = requestAnimationFrame(() => {
        import("@/components/global/GlobalCanvas")
          .then((mod) => {
            if (mounted && mod?.GlobalCanvas) setCanvasComp(() => mod.GlobalCanvas);
          })
          .catch(() => {});
      });
      return () => cancelAnimationFrame(id);
    }
    return () => {
      mounted = false;
    };
  }, [isHomePage]);

  if (isHomePage) return null;
  if (!CanvasComp) return null;

  return <CanvasComp />;
}
