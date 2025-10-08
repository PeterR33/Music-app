// ===========================
// File: src/components/mode-toggle.tsx
// ===========================
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const to = theme === "dark" ? "light" : "dark";
  return (
    <Button variant="outline" size="sm" onClick={() => setTheme(to)}>
      Toggle {to}
    </Button>
  );
}
