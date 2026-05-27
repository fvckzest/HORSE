import Image from "next/image";

export default function HorseHero() {
  return (
    <section className="horse-hero" aria-label="zest horse">
      <div className="horse-hero-pair" aria-hidden="true">
        <Image
          src="/assets/images/main-horse.gif"
          alt=""
          width={320}
          height={320}
          priority
          unoptimized
        />
      </div>
    </section>
  );
}
