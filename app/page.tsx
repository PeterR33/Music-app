// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Editor } from "@/components/Editor";
import { useSongsStore } from "@/store/useSongs";

export default function HomePage() {
  const bootstrap = useSongsStore((s) => s.bootstrap);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    bootstrap();
    setMounted(true);
  }, [bootstrap]);

  if (!mounted) return null; // ✅ prevent SSR markup mismatch

  return (
    <AppLayout>
      <Editor />
    </AppLayout>
  );
}
