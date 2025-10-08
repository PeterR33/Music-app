"use client";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-primary/15" />
            <span className="text-base font-semibold sm:text-lg">
              SongBuilder
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>
      <Separator />
      <main className="mx-auto w-full max-w-7xl flex-1 px-2 py-3 sm:px-4 sm:py-4">
        {children}
      </main>
      <footer className="mt-auto border-t px-3 py-4 text-xs opacity-80 sm:text-sm">
        <div className="mx-auto max-w-7xl flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} SongBuilder</span>
          <span className="text-muted-foreground">
            Key-aware chords • Theory hints • JSON import/export
          </span>
        </div>
      </footer>
    </div>
  );
}
