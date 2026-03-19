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
  addressLine: string;
  fullAddress: string;
  cuisine: string[];
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
  addressLine: "Rua Dr. Oswaldo Cruz, 586",
  fullAddress: "Rua Dr. Oswaldo Cruz, 586, Taquaral, Campinas - SP",
  cuisine: ["Bares", "Cervejas", "Lanches", "Porções", "Pratos"],
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
    label: "Reservar mesa",
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
    href: "#reserva",
    icon: "whatsapp",
    variant: "ghost",
    external: false,
  },
} satisfies Record<"directions" | "reservation" | "menu" | "whatsapp", ActionLink>;

export const landingData = {
  business,
  seo: {
    title:
      "Zin Bar e Restaurante no Taquaral em Campinas/SP | Almoço, jantar e happy hour",
    description:
      "Conheça o Zin Bar e Restaurante no Taquaral, Campinas: cervejas, lanches, porções e pratos em ambiente acolhedor com happy hour, almoço e jantar. Trace a rota, reserve sua mesa ou veja o cardápio.",
    keywords: [
      "restaurante no Taquaral",
      "bar e restaurante em Campinas",
      "restaurante perto de mim",
      "restaurante aberto agora",
      "bar aberto agora",
      "happy hour Campinas",
      "restaurante com espaço para família",
      "almoço e jantar Campinas",
    ],
    headings: [
      "Restaurante e bar no Taquaral para almoço, jantar e happy hour em Campinas",
      "Fácil de chegar, agradável de ficar",
      "Drinks, porções e pratos para diferentes momentos",
    ],
    localQueries: [
      "restaurante perto de mim",
      "restaurante aberto agora",
      "bar aberto agora",
      "restaurante no Taquaral",
      "bar e restaurante em Campinas",
      "happy hour Campinas",
      "restaurante com espaço para família",
    ],
  },
  actions,
  hero: {
    overline: `${business.neighborhood}, ${business.city} • almoço, jantar e happy hour`,
    title:
      "Zin Bar no Taquaral para almoço, jantar e happy hour com ambiente acolhedor em Campinas.",
    subtitle:
      "Cervejas, lanches, porções, pratos e drinks em uma casa descontraída, prática de chegar e confortável para família, amigos e encontros que pedem mais tempo à mesa.",
    proofItems: [
      {
        icon: "star",
        title: "Mais de 5 mil avaliações",
        description: "Presença local forte e uma casa já conhecida por muita gente em Campinas.",
      },
      {
        icon: "mapPin",
        title: business.addressLine,
        description: `${business.neighborhood}, ${business.city}`,
      },
      {
        icon: "family",
        title: "Kids e pet friendly",
        description: "Boa escolha para família, amigos e encontros sem complicação.",
      },
    ] satisfies ProofItem[],
    supportingLine:
      "Escolha prática para quem quer decidir rápido entre restaurante, bar aberto agora ou happy hour em Campinas sem cair em algo genérico.",
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
    title: "Uma experiência visual forte antes mesmo do primeiro pedido.",
    description: "",
    items: [
      {
        src: "/images/real/ambiente-sala.jpg",
        alt: "Ambiente interno do Zin Bar com mesas e área de convivência",
        title: "Ambiente da casa",
        caption: "Um espaço descontraído para reunir amigos, família e prolongar a noite.",
        layout: "featured" as GalleryLayout,
      },
      {
        src: "/images/real/prato-steak-chapa.jpg",
        alt: "Corte servido na chapa no Zin Bar",
        title: "Chapa quente",
        caption: "Apresentação forte e serviço que chega à mesa com presença.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-salmao-legumes.jpg",
        alt: "Prato com salmão, legumes e purê servido no Zin Bar",
        title: "Pratos bem servidos",
        caption: "Opções de almoço e jantar com leitura leve, boa montagem e sabor equilibrado.",
        layout: "wide" as GalleryLayout,
      },
      {
        src: "/images/real/prato-parmegiana.jpg",
        alt: "Prato ao molho com arroz e fritas servido no Zin Bar",
        title: "Clássicos da casa",
        caption: "Pratos que funcionam bem no almoço e continuam convidativos no jantar.",
        layout: "tall" as GalleryLayout,
      },
      {
        src: "/images/real/prato-salmao-risoto.jpg",
        alt: "Salmão com risoto servido no Zin Bar",
        title: "Boa cozinha",
        caption: "Pratos com acabamento caprichado para uma experiência mais completa à mesa.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-grelhado-arroz.jpg",
        alt: "Prato grelhado com arroz e acompanhamentos servido no Zin Bar",
        title: "Escolhas do dia",
        caption: "Uma vitrine honesta do que faz o cliente querer voltar mais de uma vez.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-strogonoff.jpg",
        alt: "Strogonoff com arroz e batata servido no Zin Bar",
        title: "Conforto à mesa",
        caption: "Pratos que equilibram sabor, boa porção e apelo visual para o almoço.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-corte-arroz.jpg",
        alt: "Corte grelhado com arroz e acompanhamentos servido no Zin Bar",
        title: "Cortes grelhados",
        caption: "Uma leitura mais robusta do cardápio para quem quer refeição completa.",
        layout: "square" as GalleryLayout,
      },
      {
        src: "/images/real/prato-peixe-legumes.jpg",
        alt: "Prato de peixe com legumes servido no Zin Bar",
        title: "Leveza e sabor",
        caption: "Boas opções para quem busca um prato equilibrado sem abrir mão de presença.",
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
    title: "Quando o ambiente acerta, o encontro rende mais.",
    description:
      "Quem escolhe o Zin Bar costuma destacar o equilíbrio entre ambiente acolhedor, conveniência no Taquaral e uma operação já conhecida por muita gente em Campinas.",
    ratingLabel: "",
    reviewsLabel: "Mais de 5 mil avaliações",
    ratingCaption:
      "Presença consolidada na busca local e recorrência de clientes que já conhecem a casa.",
    trustPoints: [
      "Mais de 5 mil avaliações",
      "Happy hour",
      "Música ao vivo",
      "Espaço confortável para família",
      "Fácil de chegar",
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
      "Se a ideia é sair sem perder tempo, aqui você consegue abrir a rota, reservar a mesa, conferir o cardápio e falar com a casa em poucos toques.",
    notes: [
      "Abra a rota e resolva o trajeto em segundos.",
      "Reserve com antecedência para almoço, jantar ou comemorações.",
      "Use o WhatsApp para confirmar detalhes e agilizar seu atendimento.",
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
          "Você pode usar o botão de reserva para agilizar o contato com a casa e garantir sua mesa para almoço, jantar ou uma ocasião especial.",
      },
      {
        question: "Onde vejo o cardápio do Zin Bar?",
        answer:
          "O botão de cardápio leva você para a área com destaques da casa e antecipa pratos, cervejas, drinks e porções para ajudar na escolha.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Pronto para decidir?",
    title:
      "Se a ideia é encontrar um restaurante no Taquaral com boa atmosfera, comida bem pensada e chegada fácil, o próximo passo é simples.",
    description:
      "Abra a rota, reserve sua mesa ou confira o cardápio e escolha o melhor momento para viver a experiência do Zin Bar.",
  },
  footer: {
    usefulLinks: [
      { label: "Localização", href: "#localizacao" },
      { label: "Diferenciais", href: "#diferenciais" },
      { label: "Cardápio", href: "#cardapio" },
      { label: "Avaliações", href: "#avaliacoes" },
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
