// src/components/SectionStrip.tsx
"use client";
import { useSongsStore } from "@/store/useSongs";
import { Button } from "@/components/ui/button";

export function SectionStrip() {
  // ✅ compute selected song & section id from state
  const song = useSongsStore((s) =>
    s.songs.find((x) => x.id === s.selectedSongId)
  );
  const selectedSectionId = song?.selectedSectionId;
  const addSection = useSongsStore((s) => s.addSection);
  const selectSectionId = useSongsStore((s) => s.selectSectionId);

  if (!song) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {song.sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => selectSectionId(sec.id)}
          className={`rounded-xl border px-3 py-2 text-sm hover:bg-accent ${
            selectedSectionId === sec.id ? "border-primary bg-accent" : ""
          }`}
        >
          <span className="font-medium">{sec.name}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            #{sec.order}
          </span>
        </button>
      ))}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          const name = prompt("Section name", "Verse");
          if (name) addSection({ name });
        }}
      >
        + Section
      </Button>
    </div>
  );
}
