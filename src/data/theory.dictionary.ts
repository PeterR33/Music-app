// ===========================
// File: src/data/theory.dictionary.ts
// (Small starter data for C and G major; extend as needed)
// ===========================
export type DiatonicEntry = {
  romanNumeral: string;
  symbol: string; // e.g., C, Dm, G7
  tones: string[];
  function: "Tonic" | "Subdominant" | "Dominant";
};

export const THEORY_V1 = {
  diatonic: {
    C: {
      major: {
        triads: [
          {
            romanNumeral: "I",
            symbol: "C",
            tones: ["C", "E", "G"],
            function: "Tonic",
          },
          {
            romanNumeral: "ii",
            symbol: "Dm",
            tones: ["D", "F", "A"],
            function: "Subdominant",
          },
          {
            romanNumeral: "iii",
            symbol: "Em",
            tones: ["E", "G", "B"],
            function: "Tonic",
          },
          {
            romanNumeral: "IV",
            symbol: "F",
            tones: ["F", "A", "C"],
            function: "Subdominant",
          },
          {
            romanNumeral: "V",
            symbol: "G",
            tones: ["G", "B", "D"],
            function: "Dominant",
          },
          {
            romanNumeral: "vi",
            symbol: "Am",
            tones: ["A", "C", "E"],
            function: "Tonic",
          },
          {
            romanNumeral: "vii°",
            symbol: "B°",
            tones: ["B", "D", "F"],
            function: "Dominant",
          },
        ],
      },
      minor: {
        triads: [
          {
            romanNumeral: "i",
            symbol: "Cm",
            tones: ["C", "Eb", "G"],
            function: "Tonic",
          },
          {
            romanNumeral: "ii°",
            symbol: "D°",
            tones: ["D", "F", "Ab"],
            function: "Subdominant",
          },
          {
            romanNumeral: "III",
            symbol: "Eb",
            tones: ["Eb", "G", "Bb"],
            function: "Tonic",
          },
          {
            romanNumeral: "iv",
            symbol: "Fm",
            tones: ["F", "Ab", "C"],
            function: "Subdominant",
          },
          {
            romanNumeral: "V",
            symbol: "G",
            tones: ["G", "B", "D"],
            function: "Dominant",
          },
          {
            romanNumeral: "VI",
            symbol: "Ab",
            tones: ["Ab", "C", "Eb"],
            function: "Tonic",
          },
          {
            romanNumeral: "vii°",
            symbol: "B°",
            tones: ["B", "D", "F"],
            function: "Dominant",
          },
        ],
      },
    },
    G: {
      major: {
        triads: [
          {
            romanNumeral: "I",
            symbol: "G",
            tones: ["G", "B", "D"],
            function: "Tonic",
          },
          {
            romanNumeral: "ii",
            symbol: "Am",
            tones: ["A", "C", "E"],
            function: "Subdominant",
          },
          {
            romanNumeral: "iii",
            symbol: "Bm",
            tones: ["B", "D", "F#"],
            function: "Tonic",
          },
          {
            romanNumeral: "IV",
            symbol: "C",
            tones: ["C", "E", "G"],
            function: "Subdominant",
          },
          {
            romanNumeral: "V",
            symbol: "D",
            tones: ["D", "F#", "A"],
            function: "Dominant",
          },
          {
            romanNumeral: "vi",
            symbol: "Em",
            tones: ["E", "G", "B"],
            function: "Tonic",
          },
          {
            romanNumeral: "vii°",
            symbol: "F#°",
            tones: ["F#", "A", "C"],
            function: "Dominant",
          },
        ],
      },
      minor: {
        triads: [
          {
            romanNumeral: "i",
            symbol: "Gm",
            tones: ["G", "Bb", "D"],
            function: "Tonic",
          },
          {
            romanNumeral: "ii°",
            symbol: "A°",
            tones: ["A", "C", "Eb"],
            function: "Subdominant",
          },
          {
            romanNumeral: "III",
            symbol: "Bb",
            tones: ["Bb", "D", "F"],
            function: "Tonic",
          },
          {
            romanNumeral: "iv",
            symbol: "Cm",
            tones: ["C", "Eb", "G"],
            function: "Subdominant",
          },
          {
            romanNumeral: "V",
            symbol: "D",
            tones: ["D", "F#", "A"],
            function: "Dominant",
          },
          {
            romanNumeral: "VI",
            symbol: "Eb",
            tones: ["Eb", "G", "Bb"],
            function: "Tonic",
          },
          {
            romanNumeral: "vii°",
            symbol: "F#°",
            tones: ["F#", "A", "C"],
            function: "Dominant",
          },
        ],
      },
    },
  },
} as const;
export function normalizeKey(k: string) {
  return k
    .replace("%23", "#")
    .replace("-", "")
    .toUpperCase() as keyof typeof THEORY_V1.diatonic;
}
//eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildSuggestions(key: string, scale: string) {
  // Minimal educational set – expand later
  const base = [
    {
      romanNumeral: "V/ii",
      chordSymbol: key === "C" ? "A7" : key === "G" ? "E7" : "A7",
      sourceTag: "secondary",
      resolvesTo: "ii",
      explanation:
        "Secondary dominant targeting the ii chord (dominant of the supertonic).",
      voiceLeading: "C# (LT of D) → D",
    },
    {
      romanNumeral: "bVII",
      chordSymbol: key === "C" ? "Bb" : key === "G" ? "F" : "Bb",
      sourceTag: "borrowed",
      resolvesTo: "I",
      explanation:
        "Modal interchange (Mixolydian color). Common in pop/rock before I.",
      voiceLeading: "A→G, D→C common steps",
    },
    {
      romanNumeral: "iv (borrowed)",
      chordSymbol: key === "C" ? "Fm" : key === "G" ? "Cm" : "Fm",
      sourceTag: "modalInterchange",
      resolvesTo: "I",
      explanation: "Borrowed minor subdominant for plaintive color before I.",
      voiceLeading: "Ab→G, C→B",
    },
    {
      romanNumeral: "vii°/V",
      chordSymbol: key === "C" ? "F#°" : key === "G" ? "C#°" : "F#°",
      sourceTag: "dimPassing",
      resolvesTo: "V",
      explanation: "Leading-tone diminished to V as chromatic approach.",
      voiceLeading: "F#→G (in C), C→B",
    },
    {
      romanNumeral: "♭II (Neapolitan)",
      chordSymbol: key === "C" ? "Db" : key === "G" ? "Ab" : "Db",
      sourceTag: "advanced",
      resolvesTo: "V",
      explanation:
        "Neapolitan major triad in first inversion typically moves to V.",
      voiceLeading: "Db→C, F→E",
    },
    {
      romanNumeral: "tritone sub of V",
      chordSymbol: key === "C" ? "Db7" : key === "G" ? "Ab7" : "Db7",
      sourceTag: "tritoneSub",
      resolvesTo: "I",
      explanation:
        "Dominant a tritone from V shares 3rd/7th tensions, resolves to I.",
      voiceLeading: "C♭–B, F–E smooth semitone",
    },
  ];
  return base;
}
