// src/components/Editor.tsx
"use client";
import { SectionStrip } from "@/components/SectionStrip";
import { ChordLane } from "@/components/ChordLane";
import { KeyPalette } from "@/components/KeyPalette";
import { SuggestionGrid } from "@/components/SuggestionGrid";
import { TheoryPanel } from "@/components/TheoryPanel";
import { ProgressionHelper } from "@/components/ProgressionHelper";
import { SongList } from "@/components/SongList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useSongsStore } from "@/store/useSongs";

export function Editor() {
  const selectedSongId = useSongsStore((s) => s.selectedSongId);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_1fr_380px]">
      {/* Left */}
      <aside className="rounded-2xl border p-3 lg:sticky lg:top-[86px] lg:h-[calc(100dvh-170px)]">
        <SongList />
      </aside>

      {/* Center */}
      <section className="min-h-[60dvh] rounded-2xl border p-3">
        {selectedSongId ? (
          <div className="flex flex-col gap-3">
            <SectionStrip />
            <Separator />
            <ChordLane />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Create or select a song to start composing.
          </p>
        )}
      </section>

      {/* Right: Tabs with scrollable content */}
      <aside className="rounded-2xl border p-0 lg:sticky lg:top-[86px] lg:h-[calc(100dvh-170px)]">
        <Tabs defaultValue="palette" className="flex h-full flex-col">
          <TabsList className="flex w-full flex-wrap gap-1 px-2 py-2">
            <TabsTrigger value="palette">Palette</TabsTrigger>
            <TabsTrigger value="suggest">Suggest</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="prog">Progressions</TabsTrigger>
          </TabsList>
          <div className="min-h-0 flex-1">
            <TabsContent value="palette" className="h-full p-0">
              <div className="h-full overflow-auto p-3">
                <KeyPalette />
              </div>
            </TabsContent>
            <TabsContent value="suggest" className="h-full p-0">
              <div className="h-full overflow-auto p-3">
                <SuggestionGrid />
              </div>
            </TabsContent>
            <TabsContent value="theory" className="h-full p-0">
              <div className="h-full overflow-auto p-3">
                <TheoryPanel />
              </div>
            </TabsContent>
            <TabsContent value="prog" className="h-full p-0">
              <div className="h-full overflow-auto p-3">
                <ProgressionHelper />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </aside>
    </div>
  );
}
