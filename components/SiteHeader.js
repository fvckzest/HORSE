import Image from "next/image";
import HeaderTerminal from "@/components/HeaderTerminal";
import HomeLink from "@/components/HomeLink";

export default function SiteHeader() {
  return (
    <header className="site-header" aria-label="primary">
      <HomeLink className="brand-lockup">
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
      </HomeLink>
      <HeaderTerminal />
    </header>
  );
}
