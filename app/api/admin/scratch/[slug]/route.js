import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  deleteScratchEntry,
  getAuthenticatedUser,
  getScratchEntry,
  updateScratchEntry
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

export async function GET(request, { params }) {
  if (!(await isAuthorized(request))) {
    return jsonResponse({ error: "Sign in required." }, 401);
  }

  try {
    const { slug } = await params;
    const entry = await getScratchEntry(slug, { admin: true });

    if (!entry) {
      return jsonResponse({ error: "Scratch entry not found." }, 404);
    }

    return jsonResponse({ entry });
  } catch (error) {
    return jsonResponse({ error: error.message || "Could not load entry." }, 500);
  }
}

export async function PUT(request, { params }) {
  if (!(await isAuthorized(request))) {
    return jsonResponse({ error: "Sign in required." }, 401);
  }

  try {
    const { slug } = await params;
    const patch = await request.json();
    const entry = await updateScratchEntry(slug, patch);

    revalidatePath("/scratch");
    revalidatePath(`/scratch/${slug}`);

    return jsonResponse({ entry });
  } catch (error) {
    return jsonResponse({ error: error.message || "Could not update entry." }, 400);
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorized(request))) {
    return jsonResponse({ error: "Sign in required." }, 401);
  }

  try {
    const { slug } = await params;
    await deleteScratchEntry(slug);

    revalidatePath("/scratch");
    revalidatePath(`/scratch/${slug}`);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: error.message || "Could not delete entry." }, 400);
  }
}
