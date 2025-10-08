"use client";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSongsStore } from "@/store/useSongs";
import type { Suggestion } from "@/types/music";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function SuggestionGrid() {
  const song = useSongsStore((s) =>
    s.songs.find((x) => x.id === s.selectedSongId)
  );
  const addChordFromSuggestion = useSongsStore((s) => s.addChordFromSuggestion);

  const key = song
    ? `/api/theory/v1/${song.key}/${song.scaleType}/suggestions`
    : null;
  const { data } = useSWR(key, fetcher);

  if (!song) return null;

  return (
    <div className="rounded-2xl">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">Outside-the-Key Suggestions</h3>
        <p className="text-xs text-muted-foreground">
          Secondary dominants, borrowed chords, diminished passing, tritone subs
        </p>
      </div>

      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        {data?.map((sug: Suggestion) => (
          <Button
            key={`${sug.romanNumeral}-${sug.chordSymbol}`}
            variant="outline"
            onClick={() => addChordFromSuggestion(sug)}
            className="block h-auto w-full justify-start whitespace-normal rounded-xl border p-3 text-left hover:bg-amber-500/10"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold leading-tight">
                  {sug.chordSymbol}
                </span>
                <Badge variant="secondary" className="shrink-0 capitalize">
                  {sug.sourceTag}
                </Badge>
              </div>

              <div className="text-[12px] text-muted-foreground">
                {sug.romanNumeral}
                {sug.resolvesTo ? <> &nbsp;→&nbsp; {sug.resolvesTo}</> : null}
              </div>

              <div className="text-[12px] leading-snug text-muted-foreground">
                {sug.explanation}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
