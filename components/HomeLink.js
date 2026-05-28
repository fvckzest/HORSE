"use client";

import Link from "next/link";
import { skipHomeIntroOnce } from "@/lib/homeIntro";

export default function HomeLink({ children, onClick, ...props }) {
  function handleClick(event) {
    skipHomeIntroOnce();
    onClick?.(event);
  }

  return (
    <Link href="/" onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
