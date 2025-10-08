// ===========================
// File: src/components/TheoryPanel.tsx
// ===========================
"use client";
import { useSongsStore } from "@/store/useSongs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TheoryPanel() {
  const song = useSongsStore((s) => s.selectedSong);
  if (!song) return null;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Theory Hints</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 text-sm text-muted-foreground">
          <li>
            Dominant (V, V/ii, V/vi) tends to resolve down a fifth (→ I, ii,
            vi).
          </li>
          <li>Borrowed ♭VI and ♭VII create lift into I (rock/pop cadence).</li>
          <li>
            Diminished leading-tone chords intensify motion to target chords.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
