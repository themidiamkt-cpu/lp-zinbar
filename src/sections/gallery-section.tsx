import Image from "next/image";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { GalleryLayout } from "@/data/landing-data";
import { landingData } from "@/data/landing-data";
import { cn } from "@/utils/cn";

const { gallery } = landingData;

const layoutClassMap: Record<GalleryLayout, string> = {
  featured: "sm:col-span-2 sm:row-span-2",
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  square: "",
};

export function GallerySection() {
  return (
    <section className="py-20 sm:py-24" id="galeria">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            description={gallery.description}
          />
        </Reveal>

        <div className="mt-12 grid auto-rows-[200px] gap-3 sm:auto-rows-[220px] sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {gallery.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 60}
              className={cn(layoutClassMap[item.layout])}
            >
              <figure className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition duration-500 hover:border-champagne/25">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,6,0)_38%,rgba(7,5,6,0.78)_78%,rgba(7,5,6,0.96)_100%)]" />
                <div
                  className="pointer-events-none absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-champagne/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-lg leading-tight text-ivory">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-mist/82">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
