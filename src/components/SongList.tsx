// src/components/SongList.tsx
"use client";
import { useSongsStore } from "@/store/useSongs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay, // 👈 add
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import type { Song } from "@/types/music";

type SongForm = Pick<
  Song,
  "title" | "key" | "scaleType" | "timeSignature" | "bpm"
>;

export function SongList() {
  const { songs, selectedSongId, selectSong, createSong, deleteSong } =
    useSongsStore();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<SongForm>({
    title: "",
    key: "C",
    scaleType: "major",
    timeSignature: "4/4",
    bpm: 100,
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const openCreate = () => {
    setEditingId(undefined);
    setForm({
      title: "",
      key: "C",
      scaleType: "major",
      timeSignature: "4/4",
      bpm: 100,
    });
    setOpen(true);
  };

  const openEdit = (songId: string) => {
    const s = songs.find((x) => x.id === songId);
    if (!s) return;
    setEditingId(songId);
    setForm({
      title: s.title,
      key: s.key,
      scaleType: s.scaleType,
      timeSignature: s.timeSignature,
      bpm: s.bpm,
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      useSongsStore.setState((state) => ({
        songs: state.songs.map((s) =>
          s.id === editingId ? { ...s, ...form, updatedAt: Date.now() } : s
        ),
      }));
    } else {
      createSong(form);
    }
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Songs</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Button className="w-full" onClick={openCreate}>
            Add song
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
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-2 text-left hover:bg-accent ${
                selectedSongId === s.id ? "border-primary bg-accent" : ""
              }`}
            >
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{s.title}</span>
                <span className="text-xs text-muted-foreground">
                  {s.key} {s.scaleType} • {s.timeSignature} • {s.bpm} BPM
                </span>
              </div>
              <div className="ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(s.id);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
          {songs.length === 0 && (
            <p className="px-1 text-sm text-muted-foreground">
              No songs yet. Add one above.
            </p>
          )}
        </div>
      </ScrollArea>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Lighter overlay */}
        <DialogOverlay className="bg-black/40 dark:bg-black/40" />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Song" : "Add Song"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="My Song"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Key</label>
                <select
                  className="rounded-md border bg-background p-2"
                  value={form.key}
                  onChange={(e) => setForm({ ...form, key: e.target.value })}
                >
                  {[
                    "C",
                    "G",
                    "D",
                    "A",
                    "E",
                    "B",
                    "F#",
                    "F",
                    "Bb",
                    "Eb",
                    "Ab",
                    "Db",
                    "Gb",
                  ].map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium">Scale</label>
                <select
                  className="rounded-md border bg-background p-2"
                  value={form.scaleType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      scaleType: e.target.value as SongForm["scaleType"],
                    })
                  }
                >
                  <option value="major">major</option>
                  <option value="minor">minor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Time Signature</label>
                <Input
                  value={form.timeSignature}
                  onChange={(e) =>
                    setForm({ ...form, timeSignature: e.target.value })
                  }
                  placeholder="4/4"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium">BPM</label>
                <Input
                  type="number"
                  value={form.bpm}
                  onChange={(e) =>
                    setForm({ ...form, bpm: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2">
            {editingId && (
              <Button
                variant="destructive"
                onClick={() => {
                  deleteSong(editingId);
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            )}
            <Button onClick={save}>
              {editingId ? "Save changes" : "Create song"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
