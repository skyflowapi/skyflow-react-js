"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Dynamically import SkyflowProvider (Client-Only)
const SkyflowProvider = dynamic(() => import("./SkyflowProvider"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <SkyflowProvider>{children}</SkyflowProvider>;
}
