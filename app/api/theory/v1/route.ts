// ===========================
// File: app/api/theory/v1/route.ts (GET /api/theory/v1)
// returns supported keys & scales
// ===========================
import { NextResponse } from "next/server";
import { THEORY_V1 } from "@/data/theory.dictionary";

export async function GET() {
  const keys = Object.keys(THEORY_V1.diatonic);
  const scales = ["major", "minor"]; // extend as we add modes
  return NextResponse.json({ version: "v1", keys, scales });
}
