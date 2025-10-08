// ===========================
// ===========================
"use client";
import { SongList } from "@/components/SongList";
import { SectionStrip } from "@/components/SectionStrip";
import { ChordLane } from "@/components/ChordLane";
import { KeyPalette } from "@/components/KeyPalette";
import { SuggestionGrid } from "@/components/SuggestionGrid";
import { TheoryPanel } from "@/components/TheoryPanel";
import { ProgressionHelper } from "@/components/ProgressionHelper";
import { useSongsStore } from "@/store/useSongs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function Editor() {
  const selectedSongId = useSongsStore((s) => s.selectedSongId);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_1fr_380px]">
      {/* Left */}
      <aside className="rounded-2xl border p-3 lg:h-[calc(100dvh-170px)] lg:sticky lg:top-[86px]">
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

      {/* Right: always Tabs, responsive */}
      <aside className="rounded-2xl border p-0 lg:h-[calc(100dvh-170px)] lg:sticky lg:top-[86px]">
        <Tabs defaultValue="palette" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start gap-1 px-2 py-2">
            <TabsTrigger value="palette">Palette</TabsTrigger>
            <TabsTrigger value="suggest">Suggest</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="prog">Progressions</TabsTrigger>
          </TabsList>

          <TabsContent value="palette" className="p-3">
            <KeyPalette />
          </TabsContent>
          <TabsContent value="suggest" className="p-3">
            <SuggestionGrid />
          </TabsContent>
          <TabsContent value="theory" className="p-3">
            <TheoryPanel />
          </TabsContent>
          <TabsContent value="prog" className="p-3">
            <ProgressionHelper />
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
