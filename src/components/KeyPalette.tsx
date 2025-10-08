// src/components/KeyPalette.tsx
"use client";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSongsStore } from "@/store/useSongs";
import type { DiatonicEntry } from "@/data/theory.dictionary";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function KeyPalette() {
  // ✅ derive from plain state (subscribes correctly)
  const song = useSongsStore((s) =>
    s.songs.find((x) => x.id === s.selectedSongId)
  );
  const addChordFromPalette = useSongsStore((s) => s.addChordFromPalette);

  // SWR must be unconditional; pause with null key
  const key = song
    ? `/api/theory/v1/${song.key}/${song.scaleType}/diatonic`
    : null;
  const { data } = useSWR(key, fetcher);

  if (!song) return null;

  return (
    <div className="rounded-2xl p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Key Palette</h3>
          <p className="text-xs text-muted-foreground">
            {song.key} {song.scaleType}
          </p>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {data?.triads?.map((ch: DiatonicEntry) => (
          <Button
            key={ch.romanNumeral}
            variant="secondary"
            className="justify-start"
            onClick={() => addChordFromPalette(ch)}
          >
            <div className="text-left">
              <div className="font-medium leading-tight">{ch.symbol}</div>
              <div className="text-[11px] text-muted-foreground">
                {ch.romanNumeral} • {ch.function}
              </div>
            </div>
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Tip: Long-press a chord to see tones and voicing (coming soon).
      </p>
    </div>
  );
}
