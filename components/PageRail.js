import Link from "next/link";

const pageLinks = [
  { href: "/", label: "/home" },
  { href: "/v1", label: "/v1" },
  { href: "/about", label: "/about" },
  { href: "/files", label: "/files" },
  { href: "/links", label: "/links" }
];

export default function PageRail() {
  return (
    <nav className="page-rail" aria-label="page shortcuts">
      {pageLinks.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
