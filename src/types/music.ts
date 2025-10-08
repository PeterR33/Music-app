// ===========================
// File: src/types/music.ts
// ===========================
export type Song = {
  id: string;
  title: string;
  description?: string;
  bpm: number;
  timeSignature: string; // e.g., "4/4"
  key: string; // e.g., "C", "G", "F#"
  scaleType: "major" | "minor"; // extend later
  sections: Section[];
  selectedSectionId?: string;
  createdAt: number;
  updatedAt: number;
};

export type Section = {
  id: string;
  songId: string;
  name: string; // Verse, Chorus, etc.
  order: number;
  chords: Chord[];
};

export type Chord = {
  id: string;
  sectionId: string;
  keyContext: string;
  romanNumeral: string;
  chordSymbol: string;
  chordSpelling: string[];
  quality?: string | undefined;
  inversion: number;
  extensions: string[];
  duration: number; // beats
  harmonicFunction?: "Tonic" | "Subdominant" | "Dominant";
  sourceTag:
    | "diatonic"
    | "secondary"
    | "borrowed"
    | "modalInterchange"
    | "dimPassing"
    | "tritoneSub"
    | "advanced"
    | "other";
};

export type Suggestion = {
  romanNumeral: string;
  chordSymbol: string;
  sourceTag: Chord["sourceTag"];
  resolvesTo?: string;
  explanation: string;
  voiceLeading?: string;
};
