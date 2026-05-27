import Link from "next/link";
import Image from "next/image";
import HeaderTerminal from "@/components/HeaderTerminal";

export default function SiteHeader() {
  return (
    <header className="site-header" aria-label="primary">
      <Link className="brand-lockup" href="/">
        <Image
          src="/assets/images/main-horse.gif"
          alt=""
          width={44}
          height={44}
          unoptimized
        />
        <span>
          <strong>horsepower</strong>
          <small>horse mode / zest.art backend</small>
        </span>
      </Link>
      <HeaderTerminal />
    </header>
  );
}
