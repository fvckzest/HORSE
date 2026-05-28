import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const fallbackDataPath = join(process.cwd(), "assets/data/scratch.json");
const scratchBucket = process.env.SUPABASE_SCRATCH_BUCKET || "scratch";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}

function getPublicKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY
  );
}

function getAdminKey() {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function createSupabaseClient({ admin = false } = {}) {
  const url = getSupabaseUrl();
  const key = admin ? getAdminKey() : getPublicKey();

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

async function readFallbackEntries() {
  try {
    return JSON.parse(await readFile(fallbackDataPath, "utf8"));
  } catch {
    return [];
  }
}

function rowToEntry(row) {
  const assetUrl = row.asset_url || row.image || "";
  const assetType = row.asset_type || "image";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    medium: row.medium,
    status: row.status,
    mood: row.mood,
    image: assetUrl,
    asset: {
      url: assetUrl,
      path: row.asset_path,
      type: assetType,
      mime: row.asset_mime,
      name: row.asset_name
    },
    excerpt: row.excerpt,
    tags: row.tags || [],
    href: row.href,
    body: row.body || []
  };
}

function entryToRow(entry) {
  const assetType = entry.asset?.type || "image";

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    medium: entry.medium,
    status: entry.status,
    mood: entry.mood,
    asset_url: entry.asset?.url || entry.image,
    asset_path: entry.asset?.path || null,
    asset_type: assetType === "audio" ? "file" : assetType,
    asset_mime: entry.asset?.mime || null,
    asset_name: entry.asset?.name || null,
    excerpt: entry.excerpt,
    tags: entry.tags || [],
    href: entry.href || null,
    body: entry.body || []
  };
}

export function isMusicEntry(entry) {
  const asset = entry.asset || {};
  const name = asset.name || asset.url || entry.image || "";

  return (
    asset.type === "audio" ||
    asset.mime?.startsWith("audio/") ||
    /\.(mp3|wav)$/i.test(name)
  );
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function normalizeDate(value) {
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (!match) {
    throw new Error("Use mm/dd/yyyy for the date.");
  }

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("That date does not exist.");
  }

  return date.toISOString().slice(0, 10);
}

export function getAssetType(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/") || /\.(mp3|wav)$/i.test(file.name)) {
    return "audio";
  }
  if (
    file.type.startsWith("text/") ||
    /\.(js|jsx|ts|tsx|css|html|json|md|txt|csv|svg)$/i.test(file.name)
  ) {
    return "code";
  }

  return "file";
}

export function assertAdminConfig() {
  if (!getSupabaseUrl() || !getAdminKey()) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.");
  }
}

export async function getAuthenticatedUser(accessToken) {
  const supabase = createSupabaseClient();

  if (!supabase || !accessToken) return null;

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) return null;
  return data.user;
}

export async function getScratchEntries({ admin = false } = {}) {
  const supabase = createSupabaseClient({ admin });

  if (!supabase) {
    return readFallbackEntries();
  }

  const { data, error } = await supabase
    .from("scratch")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(rowToEntry);
}

export async function getScratchEntry(slug, options) {
  const entries = await getScratchEntries(options);
  return entries.find((entry) => entry.slug === slug);
}

export async function createScratchEntry({ file, title, artist, date }) {
  assertAdminConfig();

  const supabase = createSupabaseClient({ admin: true });
  const entries = await getScratchEntries({ admin: true });
  const baseSlug = slugify(title) || "scratch-entry";
  const takenSlugs = new Set(entries.map((entry) => entry.slug));
  let slug = baseSlug;
  let index = 2;

  while (takenSlugs.has(slug)) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  const extension = extname(file.name) || "";
  const assetType = getAssetType(file);
  const storagePath = `${slug}/${Date.now()}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(scratchBucket)
    .upload(storagePath, bytes, {
      contentType: file.type || "application/octet-stream",
      cacheControl: "31536000",
      upsert: false
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicAsset } = supabase.storage
    .from(scratchBucket)
    .getPublicUrl(storagePath);

  const isAudio = assetType === "audio";
  const cleanArtist = isAudio ? artist?.trim() : "";
  const entry = {
    slug,
    title,
    date,
    medium: isAudio
      ? "music upload"
      : assetType === "image"
        ? "image scrap"
        : `${assetType} scrap`,
    status: "new",
    mood: cleanArtist || "fresh upload",
    image: publicAsset.publicUrl,
    asset: {
      url: publicAsset.publicUrl,
      path: storagePath,
      type: assetType,
      mime: file.type || "application/octet-stream",
      name: file.name
    },
    excerpt: cleanArtist
      ? `${title} by ${cleanArtist} added from the admin console.`
      : `${title} added from the admin console.`,
    tags: isAudio ? ["music", assetType] : ["scratch", assetType],
    body: ["Added through admin.zest.horse."]
  };

  const { data, error } = await supabase
    .from("scratch")
    .insert(entryToRow(entry))
    .select("*")
    .single();

  if (error) {
    await supabase.storage.from(scratchBucket).remove([storagePath]);
    throw new Error(error.message);
  }

  return rowToEntry(data);
}

export async function updateScratchEntry(slug, patch) {
  assertAdminConfig();

  const supabase = createSupabaseClient({ admin: true });
  const allowedFields = [
    "title",
    "date",
    "medium",
    "status",
    "mood",
    "excerpt",
    "tags",
    "href",
    "body"
  ];
  const rowPatch = Object.fromEntries(
    Object.entries(patch).filter(([key]) => allowedFields.includes(key))
  );

  const { data, error } = await supabase
    .from("scratch")
    .update(rowPatch)
    .eq("slug", slug)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return rowToEntry(data);
}

export async function deleteScratchEntry(slug) {
  assertAdminConfig();

  const supabase = createSupabaseClient({ admin: true });
  const { data: entry, error: findError } = await supabase
    .from("scratch")
    .select("asset_path")
    .eq("slug", slug)
    .single();

  if (findError) {
    throw new Error(findError.message);
  }

  const { error } = await supabase.from("scratch").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  if (entry.asset_path) {
    await supabase.storage.from(scratchBucket).remove([entry.asset_path]);
  }
}
