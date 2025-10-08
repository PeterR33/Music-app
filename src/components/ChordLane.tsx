// src/components/ChordLane.tsx
"use client";
import { useSongsStore } from "@/store/useSongs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ChordLane() {
  const section = useSongsStore((s) => {
    const song = s.songs.find((x) => x.id === s.selectedSongId);
    if (!song) return undefined;
    return song.sections.find((sec) => sec.id === song.selectedSectionId);
  });

  const removeChord = useSongsStore((s) => s.removeChord);
  const duplicateChord = useSongsStore((s) => s.duplicateChord);
  const updateChordDuration = useSongsStore((s) => s.updateChordDuration);

  if (!section)
    return (
      <p className="text-sm text-muted-foreground">
        Add a section, then add chords from the right panel.
      </p>
    );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {section.chords.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 rounded-xl border px-3 py-2"
          >
            <div
              className={`size-2 rounded-full ${
                c.sourceTag !== "diatonic"
                  ? "bg-amber-500"
                  : "bg-muted-foreground"
              }`}
            />
            <div className="min-w-[64px]">
              <div className="font-semibold leading-tight">{c.chordSymbol}</div>
              <div className="text-xs text-muted-foreground">
                {c.romanNumeral}
              </div>
            </div>
            {c.harmonicFunction && (
              <Badge variant="outline" className="uppercase">
                {c.harmonicFunction[0]}
              </Badge>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <span>{c.duration} beats</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  updateChordDuration(c.id, Math.max(1, c.duration - 1))
                }
              >
                −
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  updateChordDuration(c.id, Math.min(16, c.duration + 1))
                }
              >
                +
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => duplicateChord(c.id)}
              >
                Duplicate
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeChord(c.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {section.chords.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No chords yet. Use the Palette or Suggestions to add some.
          </p>
        )}
      </div>
    </div>
  );
}
