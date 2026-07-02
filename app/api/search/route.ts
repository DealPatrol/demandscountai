import { NextResponse } from "next/server";
import { analyzeDemandNiche } from "@/lib/demand-scout/analysis";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { niche?: string };
    const niche = body.niche?.trim();

    if (!niche) {
      return NextResponse.json(
        { error: "A niche is required to run a demand scan." },
        { status: 400 },
      );
    }

    const result = await analyzeDemandNiche(niche);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Unable to process the demand scan request." },
      { status: 500 },
    );
  }
}
