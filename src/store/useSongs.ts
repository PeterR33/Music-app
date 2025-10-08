// ===========================
// File: src/store/useSongs.ts (Zustand store with localStorage persistence)
// ===========================
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { Song, Section, Chord, Suggestion } from "@/types/music";
import type { DiatonicEntry } from "@/data/theory.dictionary";

export type SongsState = {
  songs: Song[];
  selectedSongId?: string;
  selectedSectionId?: string;
  selectedSong?: Song;
  selectedSection?: Section;
  bootstrap: () => void;
  selectSong: (id: string) => void;
  createSong: (opts: { title: string }) => void;
  renameSong: (id: string, title: string) => void;
  deleteSong: (id: string) => void;
  addSection: (opts: { name: string }) => void;
  selectSectionId: (id: string) => void;
  addChordFromPalette: (chordLike: DiatonicEntry) => void;
  addChordFromSuggestion: (s: Suggestion) => void;
  insertProgression: (romanSeq: string[]) => void;
  removeChord: (id: string) => void;
  duplicateChord: (id: string) => void;
  updateChordDuration: (id: string, beats: number) => void;
};
export const useSongsStore = create<SongsState>()(
  persist(
    (set, get) => ({
      songs: [],
      bootstrap: () => {
        const s = get().songs;
        if (s.length === 0) {
          // seed a song to demo
          const songId = nanoid();
          const sectionId = nanoid();
          const seed: Song = {
            id: songId,
            title: "My First Song",
            description: "",
            bpm: 96,
            timeSignature: "4/4",
            key: "C",
            scaleType: "major",
            sections: [
              { id: sectionId, songId, name: "Verse", order: 1, chords: [] },
            ],
            selectedSectionId: sectionId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          set({
            songs: [seed],
            selectedSongId: songId,
            selectedSectionId: sectionId,
          });
        }
      },
      selectedSongId: undefined,
      selectedSectionId: undefined,
      get selectedSong() {
        const { songs, selectedSongId } = get();
        return songs.find((s) => s.id === selectedSongId);
      },
      get selectedSection() {
        const song = get().selectedSong;
        const sid = song?.selectedSectionId ?? get().selectedSectionId;
        return song?.sections.find((x) => x.id === sid);
      },
      selectSong: (id) =>
        set({
          selectedSongId: id,
          selectedSectionId: get().songs.find((s) => s.id === id)
            ?.selectedSectionId,
        }),
      createSong: ({ title }) =>
        set((state) => {
          const id = nanoid();
          const secId = nanoid();
          const song: Song = {
            id,
            title,
            description: "",
            bpm: 100,
            timeSignature: "4/4",
            key: "C",
            scaleType: "major",
            sections: [
              { id: secId, songId: id, name: "Verse", order: 1, chords: [] },
            ],
            selectedSectionId: secId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          return {
            songs: [song, ...state.songs],
            selectedSongId: id,
            selectedSectionId: secId,
          };
        }),
      renameSong: (id, title) =>
        set((state) => ({
          songs: state.songs.map((s) =>
            s.id === id ? { ...s, title, updatedAt: Date.now() } : s
          ),
        })),
      deleteSong: (id) =>
        set((state) => {
          const left = state.songs.filter((s) => s.id !== id);
          const newSel = left[0]?.id;
          return {
            songs: left,
            selectedSongId: newSel,
            selectedSectionId: left[0]?.selectedSectionId,
          };
        }),

      addSection: ({ name }) =>
        set((state) => {
          const s = state.songs.map((song) => {
            if (song.id !== state.selectedSongId) return song;
            const sec = {
              id: nanoid(),
              songId: song.id,
              name,
              order: song.sections.length + 1,
              chords: [],
            } as Section;
            const updated = {
              ...song,
              sections: [...song.sections, sec],
              selectedSectionId: sec.id,
              updatedAt: Date.now(),
            };
            return updated;
          });
          return {
            songs: s,
            selectedSectionId: get().selectedSong?.selectedSectionId,
          };
        }),
      selectSectionId: (id) =>
        set((state) => ({
          songs: state.songs.map((song) =>
            song.id === state.selectedSongId
              ? { ...song, selectedSectionId: id }
              : song
          ),
          selectedSectionId: id,
        })),
      addChordFromPalette: (ch) =>
        set((state) => {
          const song = state.songs.find((x) => x.id === state.selectedSongId);
          if (!song || !song.selectedSectionId) return state;

          const sid = song.selectedSectionId;
          const updated = state.songs.map((sn) => {
            if (sn.id !== song.id) return sn;
            return {
              ...sn,
              sections: sn.sections.map((sec) => {
                if (sec.id !== sid) return sec;
                const newChord: Chord = {
                  id: nanoid(),
                  sectionId: sid,
                  keyContext: `${sn.key} ${sn.scaleType}`,
                  romanNumeral: ch.romanNumeral,
                  chordSymbol: ch.symbol,
                  chordSpelling: ch.tones,
                  quality: undefined,
                  inversion: 0,
                  extensions: [],
                  duration: 4,
                  harmonicFunction: ch.function,
                  sourceTag: "diatonic",
                };
                return { ...sec, chords: [...sec.chords, newChord] };
              }),
            };
          });
          return { songs: updated };
        }),
      addChordFromSuggestion: (sug) =>
        set((state) => {
          const song = state.songs.find((x) => x.id === state.selectedSongId);
          if (!song || !song.selectedSectionId) return state;

          const sid = song.selectedSectionId;
          const updated = state.songs.map((sn) => {
            if (sn.id !== song.id) return sn;
            return {
              ...sn,
              sections: sn.sections.map((sec) => {
                if (sec.id !== sid) return sec;
                const newChord: Chord = {
                  id: nanoid(),
                  sectionId: sid,
                  keyContext: `${sn.key} ${sn.scaleType}`,
                  romanNumeral: sug.romanNumeral,
                  chordSymbol: sug.chordSymbol,
                  chordSpelling: [],
                  quality: undefined,
                  inversion: 0,
                  extensions: [],
                  duration: 4,
                  harmonicFunction: undefined,
                  sourceTag: sug.sourceTag,
                };
                return { ...sec, chords: [...sec.chords, newChord] };
              }),
            };
          });
          return { songs: updated };
        }),

      insertProgression: (seq) =>
        set((state) => {
          const song = state.songs.find((x) => x.id === state.selectedSongId);
          if (!song || !song.selectedSectionId) return state;

          const sid = song.selectedSectionId;
          const songs = state.songs.map((sn) => {
            if (sn.id !== song.id) return sn;
            const mapped: Chord[] = seq.map((rn) => ({
              id: nanoid(),
              sectionId: sid,
              keyContext: `${sn.key} ${sn.scaleType}`,
              romanNumeral: rn,
              chordSymbol: rn, // TODO: resolve to symbol via dictionary lookup
              chordSpelling: [],
              duration: 4,
              inversion: 0,
              extensions: [],
              sourceTag: rn.match(/^b|#|\/$/) ? "borrowed" : "diatonic",
            }));
            return {
              ...sn,
              sections: sn.sections.map((sec) =>
                sec.id === sid
                  ? { ...sec, chords: [...sec.chords, ...mapped] }
                  : sec
              ),
            };
          });
          return { songs };
        }),
      removeChord: (id) =>
        set((state) => {
          const song = get().selectedSong;
          if (!song) return state;
          return {
            songs: state.songs.map((sn) =>
              sn.id === song.id
                ? {
                    ...sn,
                    sections: sn.sections.map((sec) => ({
                      ...sec,
                      chords: sec.chords.filter((c) => c.id !== id),
                    })),
                  }
                : sn
            ),
          };
        }),
      duplicateChord: (id) =>
        set((state) => {
          const song = get().selectedSong;
          if (!song) return state;
          return {
            songs: state.songs.map((sn) =>
              sn.id === song.id
                ? {
                    ...sn,
                    sections: sn.sections.map((sec) => ({
                      ...sec,
                      chords: sec.chords.flatMap((c) =>
                        c.id === id ? [c, { ...c, id: nanoid() }] : [c]
                      ),
                    })),
                  }
                : sn
            ),
          };
        }),
      updateChordDuration: (id, beats) =>
        set((state) => {
          const song = get().selectedSong;
          if (!song) return state;
          return {
            songs: state.songs.map((sn) =>
              sn.id === song.id
                ? {
                    ...sn,
                    sections: sn.sections.map((sec) => ({
                      ...sec,
                      chords: sec.chords.map((c) =>
                        c.id === id ? { ...c, duration: beats } : c
                      ),
                    })),
                  }
                : sn
            ),
          };
        }),
    }),
    { name: "songbuilder-store" }
  )
);
