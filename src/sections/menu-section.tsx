import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { actions, menu } = landingData;

export function FeaturedMenuSection() {
  return (
    <section className="py-20 sm:py-24" id="cardapio">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow={menu.eyebrow}
              title={menu.title}
              description={menu.description}
            />
          </Reveal>

          <Reveal delay={100}>
            <ButtonLink
              href={actions.menu.href}
              icon={actions.menu.icon}
              variant="secondary"
              external={actions.menu.external}
            >
              {actions.menu.label}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {menu.categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 70}>
              <div className="premium-panel h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne/82">
                  Destaque
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ivory">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist/76">{category.summary}</p>
                <ul className="mt-5 space-y-3 text-sm text-mist/84">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne/16 bg-champagne/10 text-champagne">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {menu.footerNote ? (
          <Reveal delay={140}>
            <p className="mt-6 text-sm text-mist/66">{menu.footerNote}</p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
