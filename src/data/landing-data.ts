// Ajuste os textos, links e mídias deste arquivo para personalizar a landing.
// Os links internos abaixo funcionam como fallback até que os links reais sejam inseridos.

export type IconName =
  | "mapPin"
  | "calendar"
  | "menu"
  | "whatsapp"
  | "spark"
  | "glass"
  | "plate"
  | "family"
  | "pet"
  | "sunset"
  | "party"
  | "star"
  | "clock"
  | "quote"
  | "arrowRight"
  | "check";

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ActionVariant = "primary" | "secondary" | "ghost";

export type ActionLink = {
  label: string;
  shortLabel: string;
  href: string;
  icon: IconName;
  variant: ActionVariant;
  external?: boolean;
};

export type SchedulePeriod = {
  opens: string;
  closes: string;
};

export type ScheduleDay = {
  key: DayKey;
  label: string;
  periods: SchedulePeriod[];
};

export type GalleryLayout = "featured" | "tall" | "wide" | "square";

type ProofItem = {
  icon: IconName;
  title: string;
  description: string;
};

type IconFeatureItem = {
  icon: IconName;
  title: string;
  description: string;
};

type BusinessData = {
  name: string;
  label: string;
  brandDescriptor: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  addressLine: string;
  fullAddress: string;
  telephone: string;
  telephoneDisplay: string;
  siteUrl: string;
  foundingYear: number;
  slogan: string;
  cuisine: string[];
  geo: { latitude: number; longitude: number };
  maps: {
    directions: string;
    place: string;
    embed: string;
  };
};

const business: BusinessData = {
  name: "Zin Bar e Restaurante",
  label: "Zin Bar",
  brandDescriptor: "Bar e Restaurante",
  neighborhood: "Taquaral",
  city: "Campinas",
  state: "SP",
  postalCode: "13025-540",
  addressLine: "Rua Dr. Oswaldo Cruz, 586",
  fullAddress: "Rua Dr. Oswaldo Cruz, 586, Taquaral, Campinas - SP",
  telephone: "+55-19-99116-1095",
  telephoneDisplay: "(19) 99116-1095",
  siteUrl: "https://zinbar.com.br",
  foundingYear: 2007,
  slogan: "Bar e restaurante no Taquaral para almoço, jantar e happy hour em Campinas.",
  cuisine: ["Culinária Brasileira", "Bar", "Drinks", "Porções", "Frutos do Mar", "Grelhados"],
  geo: { latitude: -22.8952, longitude: -47.0488 },
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Rua%20Dr.%20Oswaldo%20Cruz%2C%20586%2C%20Taquaral%2C%20Campinas%20SP",
    place:
      "https://www.google.com/maps/search/?api=1&query=Rua%20Dr.%20Oswaldo%20Cruz%2C%20586%2C%20Taquaral%2C%20Campinas%20SP",
    embed:
      "https://www.google.com/maps?q=Rua%20Dr.%20Oswaldo%20Cruz%2C%20586%2C%20Taquaral%2C%20Campinas%20SP&z=15&output=embed",
  },
};

const actions = {
  directions: {
    label: "Traçar rota agora",
    shortLabel: "Rota",
    href: business.maps.directions,
    icon: "mapPin",
    variant: "primary",
    external: true,
  },
  reservation: {
    label: "Reservar agora",
    shortLabel: "Reservar",
    href: "https://zinbar.leadsfood.app/reservation",
    icon: "calendar",
    variant: "secondary",
    external: true,
  },
  menu: {
    label: "Ver cardápio",
    shortLabel: "Cardápio",
    href: "https://xmenu.com.br/pedidos/?loja=17253",
    icon: "menu",
    variant: "ghost",
    external: true,
  },
  whatsapp: {
    label: "Falar no WhatsApp",
    shortLabel: "WhatsApp",
    href: "https://wa.me/5519991161095",
    icon: "whatsapp",
    variant: "ghost",
    external: true,
  },
} satisfies Record<"directions" | "reservation" | "menu" | "whatsapp", ActionLink>;

export const landingData = {
  business,
  seo: {
    title:
      "Zin Bar e Restaurante | Taquaral, Campinas — Almoço, Jantar e Happy Hour desde 2007",
    description:
      "Zin Bar e Restaurante no Taquaral, Campinas (SP). Há 19 anos servindo almoço, jantar e happy hour com drinks, porções e pratos. Reserva gratuita, estacionamento, kids e pet friendly. Avaliação 4.8 no Google com mais de 1.000 avaliações.",
    keywords: [
      // Localização principal
      "restaurante no Taquaral Campinas",
      "bar e restaurante Taquaral",
      "Zin Bar Campinas",
      "Zin Bar Taquaral",
      // Intenção de visita
      "restaurante perto de mim Campinas",
      "restaurante aberto agora Campinas",
      "bar aberto agora Campinas",
      "onde comer no Taquaral",
      "onde comer em Campinas",
      // Ocasião
      "happy hour Campinas",
      "happy hour Taquaral",
      "restaurante para aniversário Campinas",
      "restaurante para família Campinas",
      "restaurante para encontro Campinas",
      // Refeição
      "almoço no Taquaral",
      "jantar no Taquaral",
      "almoço e jantar Campinas",
      // Diferenciais
      "restaurante pet friendly Campinas",
      "restaurante kids friendly Campinas",
      "restaurante com estacionamento Campinas",
      "restaurante com reserva online Campinas",
      // Bairros próximos
      "restaurante perto do Cambuí",
      "restaurante perto do Guanabara",
      "restaurante perto do Bosque",
    ],
    headings: [
      "Zin Bar e Restaurante no Taquaral, Campinas — almoço, jantar e happy hour",
      "Fácil de chegar, agradável de ficar",
      "Drinks, porções e pratos para cada momento",
      "Por que o Zin Bar é o restaurante certo no Taquaral?",
    ],
    localQueries: [
      "restaurante perto de mim",
      "restaurante aberto agora",
      "bar aberto agora Campinas",
      "restaurante no Taquaral Campinas",
      "bar e restaurante em Campinas",
      "happy hour Campinas",
      "onde comer no Taquaral",
      "restaurante com família Campinas",
      "Zin Bar reserva",
      "Zin Bar horários",
    ],
  },
  actions,
  hero: {
    overline: `${business.neighborhood}, ${business.city} • almoço, jantar e happy hour`,
    title:
      "Zin Bar no Taquaral para almoço, jantar, happy hour e encontros que pedem uma casa cheia de clima certo.",
    subtitle:
      "Cervejas, drinks, porções e pratos em um ambiente acolhedor, com reserva gratuita, estacionamento com comodidade e uma presença local forte para decidir sem dúvida.",
    proofItems: [
      {
        icon: "star",
        title: "+4.8 no Google",
        description: "Com mais de 1.000 avaliações, reforçando a força local da casa.",
      },
      {
        icon: "calendar",
        title: "Reserva gratuita",
        description: "Você garante a mesa sem custo e resolve rápido antes de sair.",
      },
      {
        icon: "mapPin",
        title: "Estacionamento com comodidade",
        description: "Mais praticidade para chegar, estacionar e aproveitar com calma.",
      },
    ] satisfies ProofItem[],
    supportingLine:
      "Boa escolha para almoço, jantar, happy hour, aniversário e encontros com amigos sem sair da página com dúvidas.",
  },
  highlights: {
    eyebrow: "Destaques da casa",
    title: "Três motivos para o Zin Bar ser o seu próximo destino.",
    description:
      "Quem conhece o Zin sempre encontra um motivo para voltar. Seja para comemorar, relaxar depois do trabalho ou curtir a programação da semana, o Zin sempre entrega a experiência certa.",
    items: [
      {
        title: "Aniversariante ganha bolo",
        description:
          "Mesa reservada, decoração permitida e bolo cortesia para grupos elegíveis.",
        icon: "party",
      },
      {
        title: "Drinks em dobro e clima para ficar",
        description:
          "Drinks, cervejas e porções em um ambiente perfeito para desacelerar e aproveitar.",
        icon: "glass",
      },
      {
        title: "Música e experiências durante a semana",
        description:
          "Música ao vivo, eventos e novidades para você escolher quando viver sua próxima experiência no Zin.",
        icon: "calendar",
      },
    ] satisfies IconFeatureItem[],
  },
  location: {
    eyebrow: "Localização",
    title: "Fácil de encontrar. Melhor ainda de viver.",
    description:
      "Na Rua Dr. Oswaldo Cruz, 586, o Zin Bar fica no Taquaral com acesso prático para quem quer resolver o trajeto em poucos toques e escolher um endereço forte em Campinas.",
    supportPoints: [
      "Trajeto rápido para quem sai da região do Taquaral, Cambuí, Guanabara e entorno.",
      "Endereço conveniente para almoço durante a semana e jantar com mais calma.",
      "Ideal para abrir o Google Maps, chegar sem complicação e decidir rápido.",
    ],
    mapCaption: "Abra no Google Maps e comece a rota agora.",
  },
  differentials: {
    eyebrow: "Diferenciais",
    title: "Tudo o que pesa na decisão, concentrado em um único endereço.",
    description:
      "Cada detalhe ajuda na decisão de quem procura um restaurante no Taquaral com ambiente acolhedor, happy hour forte e opções para voltar em diferentes ocasiões.",
    items: [
      {
        title: "Almoço e jantar",
        description:
          "A casa funciona bem tanto para compromissos rápidos no meio do dia quanto para encontros com mais tempo à noite.",
        icon: "plate",
      },
      {
        title: "Happy hour com clima certo",
        description:
          "Cervejas, drinks e porções em um ambiente convidativo para desacelerar depois do trabalho ou encontrar os amigos.",
        icon: "glass",
      },
      {
        title: "Ambiente acolhedor",
        description:
          "Ambiente descontraído e acolhedor, com visual forte e sensação de casa bem recebida.",
        icon: "spark",
      },
      {
        title: "Bom para família e amigos",
        description:
          "Espaço pensado para diferentes composições de mesa, do almoço em família ao encontro do fim do dia.",
        icon: "family",
      },
      {
        title: "Tradição com leitura atual",
        description:
          "Há 19 anos, a casa equilibra tradição, atendimento recorrente e uma presença local consolidada.",
        icon: "star",
      },
      {
        title: "Kids friendly e pet friendly",
        description:
          "Uma opção prática para quem quer incluir crianças e pets sem abrir mão de uma boa experiência.",
        icon: "pet",
      },
    ] satisfies IconFeatureItem[],
  },
  gallery: {
    eyebrow: "Ambiente e pratos",
    title: "Veja como é o Zin Bar antes de chegar.",
    description: "",
    items: [
      {
        src: "/images/real/ambiente-casa-cheia.jpg",
        alt: "Ambiente do Zin Bar com a casa movimentada e clientes reunidos",
        title: "A casa que fica boa à noite",
        caption: "Ambiente animado, mesa boa e aquela energia de quem não quer ir embora cedo.",
        layout: "featured" as GalleryLayout,
      },
      {
        src: "/images/real/prato-steak-brasa.jpg",
        alt: "Corte servido na chapa no Zin Bar",
        title: "Na chapa, do jeito certo",
        caption: "Carne bem selada, ponto certeiro e aquele cheiro que já convence antes de provar.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-salmao-legumes.jpg",
        alt: "Prato com salmão, legumes e purê servido no Zin Bar",
        title: "Peixe fresco, prato completo",
        caption: "Salmão com legumes e purê — leve, saboroso e bonito de chegar à mesa.",
        layout: "wide" as GalleryLayout,
      },
      {
        src: "/images/real/prato-parmegiana.jpg",
        alt: "Prato ao molho com arroz e fritas servido no Zin Bar",
        title: "O prato que sempre agrada",
        caption: "Clássico da cozinha brasileira feito com capricho. Perfeito para o almoço ou jantar.",
        layout: "tall" as GalleryLayout,
      },
      {
        src: "/images/real/prato-salmao-risoto.jpg",
        alt: "Salmão com risoto servido no Zin Bar",
        title: "Risoto cremoso com salmão",
        caption: "Para quem quer uma refeição caprichada sem precisar de ocasião especial.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-grelhado-arroz.jpg",
        alt: "Prato grelhado com arroz e acompanhamentos servido no Zin Bar",
        title: "Grelhado que enche o prato",
        caption: "Porção generosa, tempero no ponto e combinação que funciona toda vez.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-strogonoff.jpg",
        alt: "Strogonoff com arroz e batata servido no Zin Bar",
        title: "Strogonoff que lembra de casa",
        caption: "Cremoso, bem temperado e com aquela porção que satisfaz de verdade.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-corte-arroz.jpg",
        alt: "Corte grelhado com arroz e acompanhamentos servido no Zin Bar",
        title: "Para quem veio com fome",
        caption: "Corte grelhado com acompanhamentos fardos. Refeição completa, sem enrolação.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-peixe-legumes.jpg",
        alt: "Prato de peixe com legumes servido no Zin Bar",
        title: "Leve e saboroso",
        caption: "Peixe no ponto com legumes frescos. Boa pedida para quem quer comer bem sem exagerar.",
        layout: "wide" as GalleryLayout,
      },
    ],
  },
  idealFor: {
    eyebrow: "Ideal para",
    title: "Momentos diferentes, mesma sensação de escolha acertada.",
    description:
      "O Zin Bar atende bem quem quer almoçar com calma, jantar sem pressa, reunir amigos para drinks ou celebrar algo especial sem complicar a logística.",
    items: [
      {
        title: "Almoço em família",
        description:
          "Conforto, praticidade e ambiente acolhedor para reunir gerações em torno da mesa.",
        icon: "family",
      },
      {
        title: "Jantar com mais calma",
        description:
          "Boa luz, atmosfera agradável e ritmo ideal para conversas longas.",
        icon: "spark",
      },
      {
        title: "Happy hour em Campinas",
        description:
          "Cervejas, drinks, porções e um endereço que funciona bem para estender o fim de tarde.",
        icon: "sunset",
      },
      {
        title: "Encontro com amigos",
        description:
          "Uma casa que favorece mesa boa, clima leve e vontade de repetir.",
        icon: "glass",
      },
      {
        title: "Comemorações",
        description:
          "Boa escolha para pequenos encontros e datas que pedem ambiente marcante.",
        icon: "party",
      },
    ] satisfies IconFeatureItem[],
  },
  menu: {
    eyebrow: "Cardápio em destaque",
    title: "Drinks, porções e pratos que ajudam a escolher sem rodeios.",
    description: "",
    categories: [
      {
        title: "Drinks autorais e clássicos",
        summary: "Boas escolhas para o happy hour ou para abrir a noite.",
        items: [
          "Negroni da casa",
          "Gin tônica citrus",
          "Clericot da casa",
        ],
      },
      {
        title: "Porções para dividir",
        summary: "Entradas e acompanhamentos que funcionam bem em grupo.",
        items: [
          "Croquete de costela",
          "Fritas trufadas",
          "Dadinho de tapioca",
        ],
      },
      {
        title: "Pratos principais",
        summary: "Opções consistentes para almoço e jantar.",
        items: [
          "Filé com risoto de parmesão",
          "Peixe grelhado com legumes",
          "Massa cremosa com cogumelos",
        ],
      },
      {
        title: "Encerramento na medida",
        summary: "Sobremesas e finalizações que completam a experiência.",
        items: [
          "Torta cremosa da casa",
          "Mousse intensa de chocolate",
          "Café para fechar o ritmo",
        ],
      },
    ],
    footerNote: "",
  },
  // Atualize nota, volume de avaliações e depoimentos com dados reais antes de publicar.
  socialProof: {
    eyebrow: "Prova social",
    title: "Autoridade local para decidir com mais segurança.",
    description:
      "A combinação entre ambiente, atendimento e presença no Taquaral ajuda o Zin Bar a se manter como uma escolha recorrente para almoço, jantar, happy hour e encontros especiais.",
    ratingLabel: "+4.8",
    reviewsLabel: "no Google com mais de 1.000 avaliações",
    ratingCaption:
      "Uma prova social forte para quem chegou por busca local e quer decidir rápido sem sensação de risco.",
    trustPoints: [
      "+4.8 no Google",
      "Mais de 1.000 avaliações",
      "Happy hour com promo",
      "Aniversariante ganha bolo",
      "Música ao vivo",
      "Família e amigos",
    ],
    testimonials: [
      {
        quote:
          "Ambiente gostoso, boa localização e um happy hour que funciona muito bem para repetir sem pensar muito.",
        author: "Marina, região do Taquaral",
      },
      {
        quote:
          "Boa opção em Campinas para almoço em família, com ambiente confortável, serviço leve e opções variadas.",
        author: "Rafael, Campinas",
      },
      {
        quote:
          "Clima agradável, localização prática e uma casa que atende bem desde um lanche até um encontro mais demorado.",
        author: "Cláudia, Cambuí",
      },
    ],
  },
  reservation: {
    eyebrow: "Reserva e contato",
    title: "Reserve e resolva em poucos toques.",
    description:
      "Se a ideia é sair sem perder tempo, aqui você consegue reservar, abrir a rota, conferir o cardápio e resolver dúvidas rápidas antes de chegar.",
    notes: [
      "A reserva é gratuita.",
      "Há estacionamento com comodidade para você.",
      "Boa escolha para aniversários, encontros e mesas planejadas com antecedência.",
    ],
  },
  hoursSection: {
    eyebrow: "Horários",
    title: "Horários claros para decidir rápido.",
    description:
      "Veja os turnos de almoço e jantar e confirme se a casa está aberta agora antes de sair.",
    happyHourLabel: "",
  },
  schedule: {
    timezone: "America/Sao_Paulo",
    week: [
      {
        key: "monday",
        label: "Segunda",
        periods: [
          { opens: "11:30", closes: "15:00" },
          { opens: "17:30", closes: "22:30" },
        ],
      },
      {
        key: "tuesday",
        label: "Terça",
        periods: [
          { opens: "11:30", closes: "15:00" },
          { opens: "17:30", closes: "22:30" },
        ],
      },
      {
        key: "wednesday",
        label: "Quarta",
        periods: [
          { opens: "11:30", closes: "15:00" },
          { opens: "17:30", closes: "22:30" },
        ],
      },
      {
        key: "thursday",
        label: "Quinta",
        periods: [
          { opens: "11:30", closes: "15:00" },
          { opens: "17:30", closes: "23:00" },
        ],
      },
      {
        key: "friday",
        label: "Sexta",
        periods: [
          { opens: "11:30", closes: "15:00" },
          { opens: "17:30", closes: "23:30" },
        ],
      },
      {
        key: "saturday",
        label: "Sábado",
        periods: [
          { opens: "12:00", closes: "16:00" },
          { opens: "18:00", closes: "23:30" },
        ],
      },
      {
        key: "sunday",
        label: "Domingo",
        periods: [{ opens: "12:00", closes: "16:00" }],
      },
    ] satisfies ScheduleDay[],
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Informações rápidas para quem já quer decidir.",
    description:
      "As respostas abaixo reúnem o que mais costuma pesar na decisão de quem procura restaurante, bar ou happy hour no Taquaral.",
    items: [
      {
        question: "Onde fica o Zin Bar e Restaurante em Campinas?",
        answer:
          "O Zin Bar e Restaurante fica na Rua Dr. Oswaldo Cruz, 586, no Taquaral, em Campinas. Você pode abrir a rota direto pelo Google Maps e chegar com praticidade.",
      },
      {
        question: "O Zin Bar serve almoço e jantar?",
        answer:
          "Sim. O Zin Bar atende almoço e jantar, com horários claros para facilitar a decisão de quem quer sair agora ou planejar a próxima refeição.",
      },
      {
        question: "Tem happy hour no Zin Bar?",
        answer:
          "Tem. O happy hour é um dos destaques da casa, com cervejas, drinks, porções e um ambiente agradável para encontros no fim da tarde e começo da noite.",
      },
      {
        question: "O restaurante é bom para família?",
        answer:
          "Sim. O Zin Bar foi pensado para oferecer uma experiência acolhedora para família e amigos, com clima confortável para diferentes composições de mesa.",
      },
      {
        question: "O Zin Bar é kids friendly e pet friendly?",
        answer:
          "Sim. O Zin Bar recebe bem tanto famílias com crianças quanto quem gosta de sair com o pet, sem abrir mão de conforto e boa experiência.",
      },
      {
        question: "Como faço para reservar mesa?",
        answer:
          "Você pode usar o botão de reserva para agilizar o contato com a casa e garantir sua mesa para almoço, jantar, happy hour ou uma ocasião especial.",
      },
      {
        question: "Precisa pagar para reservar?",
        answer: "Não. A reserva no Zin Bar é gratuita.",
      },
      {
        question: "Tem estacionamento?",
        answer: "Sim. O Zin Bar conta com estacionamento para trazer mais comodidade para você.",
      },
      {
        question: "Posso comemorar aniversário?",
        answer:
          "Sim. O Zin Bar recebe comemorações e o aniversariante conta com benefícios especiais, incluindo bolo.",
      },
      {
        question: "Onde vejo o cardápio do Zin Bar?",
        answer:
          "O botão de cardápio leva direto para o cardápio online do Zin Bar, onde você pode conferir as opções atualizadas da casa.",
      },
      {
        question: "Qual o telefone do Zin Bar e Restaurante?",
        answer:
          "Você pode entrar em contato com o Zin Bar pelo WhatsApp (19) 99116-1095 ou pelo botão de contato na página para tirar dúvidas rapidamente.",
      },
      {
        question: "O Zin Bar tem música ao vivo?",
        answer:
          "Sim. O Zin Bar tem programação de música ao vivo em datas específicas da semana. Acompanhe a agenda da casa para saber os dias e artistas confirmados.",
      },
      {
        question: "O Zin Bar fica em qual bairro de Campinas?",
        answer:
          "O Zin Bar e Restaurante fica no bairro Taquaral, em Campinas (SP), na Rua Dr. Oswaldo Cruz, 586. É de fácil acesso para quem vem do Cambuí, Guanabara, Bosque e regiões próximas.",
      },
      {
        question: "Há quanto tempo o Zin Bar existe?",
        answer:
          "O Zin Bar e Restaurante foi fundado em 2007 e está há mais de 19 anos presente no Taquaral, em Campinas, consolidando uma trajetória de tradição, bom atendimento e presença local forte.",
      },
      {
        question: "Qual a nota do Zin Bar no Google?",
        answer:
          "O Zin Bar e Restaurante tem avaliação de mais de 4.8 estrelas no Google, com mais de 1.000 avaliações de clientes — um dos indicadores de qualidade mais fortes para restaurantes em Campinas.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Pronto para decidir?",
    title:
      "Se a ideia é encontrar um restaurante no Taquaral com boa atmosfera, comida bem pensada e chegada fácil, o próximo passo é simples.",
    description:
      "Reserve agora, abra a rota ou confira o cardápio e escolha o melhor momento para viver a experiência do Zin Bar.",
  },
  footer: {
    usefulLinks: [
      { label: "Localização", href: "#localizacao" },
      { label: "Diferenciais", href: "#diferenciais" },
      { label: "Avaliações", href: "#avaliacoes" },
      { label: "Horários", href: "#horarios" },
      { label: "FAQ", href: "#faq" },
    ],
    socialLinks: [
      {
        label: "Site oficial",
        href: "https://zinbar.com.br",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/zinbarcampinas_/",
        external: true,
      },
      {
        label: "Google Maps",
        href: business.maps.place,
        external: true,
      },
    ],
    copyright:
      "Horários, cardápio e canais de contato podem ser atualizados conforme a operação da casa.",
  },
};

export type LandingData = typeof landingData;
export type WeeklySchedule = typeof landingData.schedule.week;
