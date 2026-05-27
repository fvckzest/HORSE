import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://zest.horse"),
  title: {
    default: "horsepower | horse mode",
    template: "%s | horsepower"
  },
  description:
    "The hidden backend-feeling terminal playground attached to the zest.art universe.",
  openGraph: {
    title: "horsepower | horse mode",
    description:
      "A terminal-shaped playground for fragments, files, transmissions, and things that do not belong on the front page.",
    url: "https://zest.horse",
    siteName: "horsepower",
    images: [
      {
        url: "/assets/images/main-horse.gif",
        width: 320,
        height: 320,
        alt: "horsepower horse mode"
      }
    ],
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
