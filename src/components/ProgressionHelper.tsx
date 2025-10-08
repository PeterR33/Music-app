// ===========================
// File: src/components/ProgressionHelper.tsx
// ===========================
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSongsStore } from "@/store/useSongs";

const PRESETS: Record<string, string[][]> = {
  Verse: [
    ["I", "V", "vi", "IV"],
    ["ii", "V", "I"],
    ["I", "IV", "ii", "V"],
  ],
  Chorus: [
    ["I", "vi", "IV", "V"],
    ["I", "V", "I"],
    ["IV", "V", "I"],
  ],
  Bridge: [
    ["bVI", "bVII", "I"],
    ["ii", "V", "vi"],
    ["iii", "vi", "ii", "V"],
  ],
};

export function ProgressionHelper() {
  const { selectedSong, insertProgression } = useSongsStore();
  if (!selectedSong) return null;
  const role =
    selectedSong.sections.find((s) => s.id === selectedSong.selectedSectionId)
      ?.name ?? "Verse";
  const sets = PRESETS[role] ?? PRESETS["Verse"];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Progression Helper</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        {sets.map((seq, i) => (
          <Button
            key={i}
            variant="secondary"
            onClick={() => insertProgression(seq)}
          >
            {seq.join(" – ")}
          </Button>
        ))}
        <p className="text-xs text-muted-foreground">
          Adds chords to the current section using your songs key context.
        </p>
      </CardContent>
    </Card>
  );
}
