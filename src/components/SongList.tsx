// src/components/SongList.tsx
"use client";
import { useSongsStore } from "@/store/useSongs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export function SongList() {
  const {
    songs,
    selectedSongId,
    selectSong,
    createSong,
    deleteSong,
    renameSong,
  } = useSongsStore();
  const [title, setTitle] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col gap-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Songs</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Input
            placeholder="New song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              if (!title.trim()) return;
              createSong({ title });
              setTitle("");
            }}
          >
            Add
          </Button>
        </CardContent>
      </Card>

      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 pr-2">
          {songs.map((s) => (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => selectSong(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectSong(s.id);
                }
              }}
              className={`flex w-full items-center justify-between rounded-xl border p-2 text-left hover:bg-accent cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring ${
                selectedSongId === s.id ? "border-primary bg-accent" : ""
              }`}
            >
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{s.title}</span>
                <span className="text-xs text-muted-foreground">
                  {s.key} {s.scaleType} • {s.timeSignature} • {s.bpm} BPM
                </span>
              </div>
              <div className="ml-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    const name = prompt("Rename song", s.title);
                    if (name) renameSong(s.id, name);
                  }}
                >
                  Rename
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSong(s.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {songs.length === 0 && (
            <p className="px-1 text-sm text-muted-foreground">
              No songs yet. Create one above.
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
