import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  createScratchEntry,
  getAuthenticatedUser,
  getScratchEntries,
  normalizeDate
} from "@/lib/scratchStore";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return NextResponse.json(body, { status });
}

async function isAuthorized(request) {
  const authorization = request.headers.get("authorization") || "";
  const accessToken = authorization.replace(/^Bearer\s+/i, "").trim();
  return Boolean(await getAuthenticatedUser(accessToken));
}

export async function GET(request) {
  if (!(await isAuthorized(request))) {
    return jsonResponse({ error: "Sign in required." }, 401);
  }

  try {
    return jsonResponse({ entries: await getScratchEntries({ admin: true }) });
  } catch (error) {
    return jsonResponse({ error: error.message || "Could not load entries." }, 500);
  }
}

export async function POST(request) {
  if (!(await isAuthorized(request))) {
    return jsonResponse({ error: "Sign in required." }, 401);
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") || "").trim();
    const artist = String(formData.get("artist") || "").trim();
    const date = normalizeDate(String(formData.get("date") || ""));

    if (!file || typeof file === "string") {
      return jsonResponse({ error: "Drop a scratch or music file first." }, 400);
    }

    if (!title) {
      return jsonResponse({ error: "Title is required." }, 400);
    }

    const entry = await createScratchEntry({ file, title, artist, date });

    revalidatePath("/scratch");
    revalidatePath("/music");
    revalidatePath(`/scratch/${entry.slug}`);

    return jsonResponse({ entry }, 201);
  } catch (error) {
    return jsonResponse({ error: error.message || "Could not add entry." }, 400);
  }
}
