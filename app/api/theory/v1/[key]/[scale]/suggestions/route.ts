// ===========================
// File: app/api/theory/v1/[key]/[scale]/suggestions/route.ts
// ===========================
import { NextResponse } from "next/server";
import {
  THEORY_V1,
  normalizeKey,
  buildSuggestions,
} from "@/data/theory.dictionary";

type KeyName = keyof typeof THEORY_V1.diatonic;
type ScaleName = "major" | "minor";

export async function GET(
  _req: Request,
  { params }: { params: { key: string; scale: string } }
) {
  const keyParam = normalizeKey(params.key);
  if (!(keyParam in THEORY_V1.diatonic)) {
    return NextResponse.json({ error: "Unsupported key" }, { status: 404 });
  }
  const key = keyParam as KeyName;

  const scaleParam = params.scale.toLowerCase();
  if (scaleParam !== "major" && scaleParam !== "minor") {
    return NextResponse.json({ error: "Unsupported scale" }, { status: 404 });
  }
  const scale = scaleParam as ScaleName;

  // Optionally ensure diatonic exists for the key/scale before building suggestions
  const dia = THEORY_V1.diatonic[key][scale];
  if (!dia)
    return NextResponse.json(
      { error: "Unsupported key/scale" },
      { status: 404 }
    );

  return NextResponse.json(buildSuggestions(key, scale));
}
