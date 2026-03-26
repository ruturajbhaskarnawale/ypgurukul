"use client";

import dynamic from "next/dynamic";

const GlobalCanvasInner = dynamic(
  () => import("./GlobalCanvasInner").then((mod) => mod.GlobalCanvasInner),
  { ssr: false }
);

export function GlobalCanvas() {
  return <GlobalCanvasInner />;
}
