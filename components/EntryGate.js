"use client";

import Image from "next/image";
import { useState } from "react";
import { shouldSkipHomeIntro } from "@/lib/homeIntro";

export default function EntryGate({ children }) {
  const [entered, setEntered] = useState(() => shouldSkipHomeIntro());

  if (entered) {
    return children;
  }

  return (
    <main className="entry-gate" aria-label="enter horsepower">
      <div className="entry-gate-inner">
        <p className="entry-gate-title">zest.horse</p>
        <div className="entry-horses" aria-label="horsepower">
          <Image
            src="/assets/images/main-horse.gif"
            alt=""
            width={320}
            height={320}
            priority
            unoptimized
          />
          <Image
            className="entry-horse-flipped"
            src="/assets/images/main-horse.gif"
            alt=""
            width={320}
            height={320}
            priority
            unoptimized
          />
        </div>
        <button type="button" onClick={() => setEntered(true)}>
          enter
        </button>
      </div>
    </main>
  );
}
