import Link from "next/link";
import HomeLink from "@/components/HomeLink";
import ScratchFloatReel from "@/components/ScratchFloatReel";
import SiteHeader from "@/components/SiteHeader";
import { getScratchEntries, isMusicEntry } from "@/data/scratch";

export const metadata = {
  title: "scratch",
  description:
    "A playground archive for sketches, fragments, experiments, notes, and unfinished horsepower artifacts."
};

export const dynamic = "force-dynamic";

export default async function ScratchPage() {
  const scratchEntries = (await getScratchEntries()).filter(
    (entry) => !isMusicEntry(entry)
  );

  return (
    <main className="scratch-float-shell" aria-label="playground archive">
      <div className="scratch-float-frame">
        <SiteHeader />
      </div>
      <nav className="scratch-float-nav" aria-label="scratch navigation">
        <HomeLink>horsepower</HomeLink>
        <span>playground archive</span>
        <Link href="/about" aria-label="about horsepower">
          i
        </Link>
      </nav>

      <ScratchFloatReel entries={scratchEntries} />
    </main>
  );
}
