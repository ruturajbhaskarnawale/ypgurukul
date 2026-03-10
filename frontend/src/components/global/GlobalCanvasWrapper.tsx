"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const GlobalCanvasNoSSR = dynamic(
  () => import("@/components/global/GlobalCanvas").then(mod => mod.GlobalCanvas),
  { ssr: false }
);

export function GlobalCanvasWrapper() {
  const pathname = usePathname();
  
  // Normalize pathname to handle trailing slashes
  const normalizedPathname = pathname?.replace(/\/$/, "") || "/";
  
  // Disable global canvas on the home page to avoid WebGL context conflicts with Hero3D
  // Home page can be "" (after replace) or "/"
  const isHomePage = normalizedPathname === "" || normalizedPathname === "/";
  
  if (isHomePage) {
    return null;
  }
  
  return <GlobalCanvasNoSSR />;
}
