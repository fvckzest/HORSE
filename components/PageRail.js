import Link from "next/link";
import HomeLink from "@/components/HomeLink";

const pageLinks = [
  { href: "/", label: "/home" },
  { href: "/about", label: "/about" },
  { href: "/scratch", label: "/scratch" },
  { href: "/music", label: "/music" },
  { href: "/links", label: "/links" }
];

export default function PageRail() {
  return (
    <nav className="page-rail" aria-label="page shortcuts">
      {pageLinks.map((link) =>
        link.href === "/" ? (
          <HomeLink key={link.href}>{link.label}</HomeLink>
        ) : (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
