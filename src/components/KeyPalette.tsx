"use client";
import useSWR from "swr";
import { Separator } from "@/components/ui/separator";
import { useSongsStore } from "@/store/useSongs";
import type { DiatonicEntry } from "@/data/theory.dictionary";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function KeyPalette() {
  const song = useSongsStore((s) =>
    s.songs.find((x) => x.id === s.selectedSongId)
  );
  const addChordFromPalette = useSongsStore((s) => s.addChordFromPalette);

  const key = song
    ? `/api/theory/v1/${song.key}/${song.scaleType}/diatonic`
    : null;
  const { data } = useSWR(key, fetcher);

  if (!song) return null;

  return (
    <div className="rounded-2xl">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Key Palette</h3>
          <p className="text-xs text-muted-foreground">
            {song.key} {song.scaleType}
          </p>
        </div>
      </div>
      <Separator className="my-2" />

      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {data?.triads?.map((ch: DiatonicEntry) => (
          <button
            key={ch.romanNumeral}
            onClick={() => addChordFromPalette(ch)}
            className="w-full rounded-xl border p-3 text-left hover:bg-accent"
          >
            <div className="text-left">
              <div className="text-base font-medium leading-tight">
                {ch.symbol}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {ch.romanNumeral} • {ch.function}
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Tip: Long-press a chord to see tones and voicing (coming soon).
      </p>
    </div>
  );
}   
