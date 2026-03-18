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

        <div className="mt-10 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 60}
              className={cn(layoutClassMap[item.layout])}
            >
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,6,0.04),rgba(7,5,6,0.8)_72%,rgba(7,5,6,0.95)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-lg font-semibold text-ivory">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-mist/78">{item.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
