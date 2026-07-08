import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On-demand revalidation. A spoke repo calls this after it deploys (e.g. from a
 * GitHub Action) so a new/updated project appears on the hub immediately instead
 * of waiting for the hourly ISR window.
 *
 *   curl -X POST "https://<hub>/api/revalidate" \
 *        -H "x-revalidate-secret: $REVALIDATE_SECRET"
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided =
    req.headers.get("x-revalidate-secret") ??
    req.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true, revalidated: "/", now: Date.now() });
}
