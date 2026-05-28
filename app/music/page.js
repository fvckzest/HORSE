import AppShell from "@/components/AppShell";
import MusicTrackList from "@/components/MusicTrackList";
import PageHeader from "@/components/PageHeader";
import { getScratchEntries, isMusicEntry } from "@/data/scratch";

export const metadata = {
  title: "music",
  description: "Uploaded horsepower audio, tapes, tracks, and signal scraps."
};

export const dynamic = "force-dynamic";

export default async function MusicPage() {
  const tracks = (await getScratchEntries()).filter(isMusicEntry);

  return (
    <AppShell>
      <PageHeader
        eyebrow="/music"
        title="music directory"
        description="Uploaded .mp3 and .wav files from the admin console."
      />
      <MusicTrackList tracks={tracks} />
    </AppShell>
  );
}
