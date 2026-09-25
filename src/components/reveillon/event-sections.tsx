import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { AccordionItem } from "@/components/accordion";
import { eventConfig } from "@/data/reveillon-config";

export function ReveillonHero() {
  return (
    <section className="rv-hero" id="topo">
      <div className="rv-hero-orbit" aria-hidden="true" />
      <Container className="rv-hero-grid">
        <div className="rv-hero-copy">
          <p className="rv-eyebrow">
            <span /> ZIN BAR & RESTAURANTE APRESENTA
          </p>
          <h1>
            <span className="rv-hero-title">RÉVEILLON</span>
            <span className="rv-hero-year">
              2027
              <span className="rv-year-star" aria-hidden="true">
                ✧
              </span>
            </span>
          </h1>
          <p className="rv-hero-subtitle">
            Uma noite especial
            <br />
            para começar 2027 <em>no Zin.</em>
          </p>
          <p className="rv-hero-description">
            Um novo ano. Bons encontros.
            <br />O seu lugar à mesa, em uma noite para celebrar.
          </p>
          <div className="rv-hero-actions">
            <ButtonLink href="#mesas">ESCOLHER MEU SETOR</ButtonLink>
            <a className="rv-text-link" href="#evento">
              VER DETALHES DO EVENTO <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a
            className="rv-text-link rv-consult-invitations"
            href="/reveillon/convites"
          >
            JÁ TENHO UM CÓDIGO · CONSULTAR CONVITE ↗
          </a>
          <p className="rv-preview-note">
            <span className="rv-small-dot" /> Prévia do evento · vendas ainda
            não abertas
          </p>
        </div>
        <div className="rv-hero-art">
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <div className="rv-photo-frame">
            <Image
              src="/images/real/ambiente-casa-cheia.jpg"
              alt="Bons encontros e luzes acolhedoras no Zin Bar & Restaurante"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <div className="rv-photo-shade" />
            <span className="rv-photo-label">
              O MESMO ZIN.
              <br />
              <em>Uma noite única.</em>
            </span>
          </div>
          <div className="rv-photo-detail">
            <Image
              src="/images/real/prato-steak-brasa.jpg"
              alt="Gastronomia do Zin Bar & Restaurante; foto ilustrativa, menu do evento a confirmar"
              fill
              sizes="(max-width: 767px) 130px, 190px"
            />
          </div>
          <div className="rv-date-seal">
            <Icon name="spark" />
            <span>UM NOVO CICLO</span>
            <strong>27</strong>
            <span>UM NOVO BRINDE</span>
          </div>
          <div className="rv-photo-detail-secondary">
            <Image
              src="/images/real/prato-salmao-risoto.jpg"
              alt="Um detalhe da gastronomia do Zin; fotografia ilustrativa"
              fill
              sizes="(max-width: 767px) 120px, 210px"
            />
          </div>
          <span className="rv-photo-caption">TAQUARAL · CAMPINAS</span>
        </div>
      </Container>
      <Container>
        <div className="rv-hero-bottom">
          <span>CELEBRE O QUE VEM.</span>
          <a href="#experiencia">
            A noite começa aqui <span aria-hidden="true">↓</span>
          </a>
          <span>RÉVEILLON / 2027</span>
        </div>
      </Container>
    </section>
  );
}

export function EventHighlights() {
  return (
    <section className="rv-highlights" aria-label="Destaques do evento">
      <Container className="rv-highlight-grid">
        {[
          {
            icon: "calendar" as const,
            label: "A DATA",
            title: "Réveillon 2027",
            detail: eventConfig.date,
          },
          {
            icon: "clock" as const,
            label: "A NOITE",
            title: "No seu melhor tempo",
            detail: "Horário a confirmar",
          },
          {
            icon: "mapPin" as const,
            label: "O ENCONTRO",
            title: "Taquaral, Campinas",
            detail: "Zin Bar & Restaurante",
          },
          {
            icon: "glass" as const,
            label: "A EXPERIÊNCIA",
            title: "Um brinde ao novo",
            detail: "Programação em breve",
          },
        ].map((item) => (
          <div className="rv-highlight" key={item.label}>
            <Icon name={item.icon} />
            <div>
              <span className="rv-overline">{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["01", "Escolha seu setor", "Explore os ambientes e encontre o seu lugar."],
    [
      "02",
      "Selecione seus lugares",
      "Uma companhia especial ou a turma inteira.",
    ],
    ["03", "Faça o pagamento", "Confira o resumo da sua seleção."],
    [
      "04",
      "Receba seu convite com QR Code",
      "Tudo pronto para viver uma noite especial.",
    ],
  ];
  return (
    <section id="experiencia" className="rv-section">
      <Container>
        <div className="rv-section-heading">
          <div>
            <p className="rv-eyebrow">DO PRIMEIRO CLIQUE AO PRIMEIRO BRINDE</p>
            <h2 className="rv-title">
              Sua noite, <em>do seu jeito.</em>
            </h2>
          </div>
          <p>
            Escolha onde a sua virada vai acontecer.
            <br />O resto é motivo para celebrar.
          </p>
        </div>
        <div className="rv-steps">
          {steps.map(([n, title, body]) => (
            <article key={n}>
              <span className="rv-step-number">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <p className="rv-fine-print">
          Experiência ilustrativa. Pagamento e emissão de convites não estão
          ativos nesta prévia.
        </p>
      </Container>
    </section>
  );
}

export function EventInfo() {
  return (
    <>
      <section className="rv-campaign-photo" aria-label="A atmosfera do Zin">
        <Image
          src="/images/real/ambiente-casa-cheia.jpg"
          alt="A atmosfera acolhedora do Zin Bar & Restaurante"
          fill
          sizes="100vw"
        />
        <div className="rv-campaign-photo-shade" />
        <Container className="rv-campaign-photo-copy">
          <p className="rv-eyebrow">BONS ENCONTROS. NOVAS MEMÓRIAS.</p>
          <h2>
            Uma noite
            <br />
            para <em>lembrar.</em>
          </h2>
          <span aria-hidden="true">✧</span>
          <p>Zin Bar & Restaurante · Réveillon 2027</p>
        </Container>
      </section>
      <section id="evento" className="rv-section rv-event-info">
        <Container>
          <div className="rv-section-heading">
            <div>
              <p className="rv-eyebrow">CADA DETALHE DA SUA NOITE</p>
              <h2 className="rv-title">
                Para você <em>se programar.</em>
              </h2>
            </div>
            <p>
              Estamos preparando uma virada especial.
              <br />
              Os detalhes serão confirmados em breve.
            </p>
          </div>
          <div className="rv-event-editorial">
            <article>
              <Icon name="calendar" />
              <p className="rv-overline">DATA & HORÁRIO</p>
              <h3>
                O começo
                <br />
                <em>de um novo ano.</em>
              </h3>
              <p>{eventConfig.date}</p>
              <p>{eventConfig.time}</p>
            </article>
            <article>
              <Icon name="mapPin" />
              <p className="rv-overline">LOCAL</p>
              <h3>
                O seu encontro.
                <br />
                <em>No Zin.</em>
              </h3>
              <p>{eventConfig.info[2][1]}</p>
              <p>{eventConfig.info[2][2]}</p>
            </article>
            <article>
              <Icon name="glass" />
              <p className="rv-overline">O QUE ESPERAR</p>
              <h3>
                Bons momentos.
                <br />
                <em>Novas memórias.</em>
              </h3>
              <p>{eventConfig.info[3][1]}</p>
              <p>{eventConfig.info[3][2]}</p>
            </article>
          </div>
          <div className="rv-info-grid">
            {eventConfig.info.slice(4).map(([label, title, detail]) => (
              <article key={label}>
                <p className="rv-overline">{label}</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function ReveillonFAQ() {
  return (
    <section id="faq" className="rv-section">
      <Container className="rv-faq-layout">
        <div>
          <p className="rv-eyebrow">ANTES DO BRINDE</p>
          <h2 className="rv-title">
            Boas perguntas.
            <br />
            <em>Uma noite tranquila.</em>
          </h2>
          <p className="rv-muted">
            Tudo o que você precisa saber
            <br />
            para escolher seu lugar.
          </p>
          <Icon name="glass" className="rv-faq-icon" />
        </div>
        <div className="rv-faq-items">
          {eventConfig.faq.map((item) => (
            <AccordionItem key={item.question} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ReveillonCTA() {
  return (
    <section className="rv-section rv-final-section">
      <Container>
        <div className="rv-final-cta">
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-bubble" aria-hidden="true" />
          <span className="rv-cta-star" aria-hidden="true">
            ✧
          </span>
          <p className="rv-eyebrow">A VIRADA MERECE UM LUGAR ESPECIAL</p>
          <h2 className="rv-title">
            Seu Réveillon
            <br />
            <em>começa aqui.</em>
          </h2>
          <p>
            Escolha seu setor e prepare-se para viver
            <br />
            uma noite especial no Zin.
          </p>
          <ButtonLink href="#mesas">ESCOLHER MEU SETOR</ButtonLink>
          <span className="rv-cta-year" aria-hidden="true">
            2027
          </span>
        </div>
      </Container>
    </section>
  );
}
