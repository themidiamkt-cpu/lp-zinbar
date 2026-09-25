import { landingData } from "@/data/landing-data";

// Fonte visual: /mapa.jpeg. Valores e disponibilidade são exclusivamente demonstrativos.
// Coordenadas no espaço original da planta (1070 × 1470); não renumerar ambiguidades.
export const eventConfig = {
  name: "Réveillon 2027",
  venue: "Zin Bar & Restaurante",
  date: "Data a confirmar",
  time: "Horário a confirmar",
  address: landingData.business.fullAddress,
  pricePerPerson: 250,
  priceLabel: "Valor ilustrativo",
  info: [
    ["Data", "A confirmar", "A chegada de 2027"],
    ["Horário", "A confirmar", "Abertura e encerramento em breve"],
    ["Endereço", landingData.business.addressLine, "Taquaral · Campinas, SP"],
    ["Atrações", "Programação em breve", "Artistas e horários a confirmar"],
    ["Buffet", "Menu em definição", "Opções e itens inclusos a confirmar"],
    ["Bebidas", "Carta em definição", "Pacotes e itens inclusos a confirmar"],
    ["Estacionamento", "A confirmar", "Condições para a noite do evento"],
    [
      "Área kids",
      "Espaço indicado no mapa",
      "Funcionamento no evento a confirmar",
    ],
    [
      "Crianças",
      "Política em definição",
      "Faixas etárias e valores a confirmar",
    ],
    [
      "Regras e cancelamento",
      "Condições em definição",
      "Serão publicadas antes das vendas",
    ],
  ],
  faq: [
    {
      question: "Como escolho minha mesa?",
      answer:
        "Explore o mapa, filtre por setor e toque em uma mesa disponível. Você poderá ver os lugares e simular sua seleção. Esta prévia não realiza reservas.",
    },
    {
      question: "Posso comprar mais de um lugar?",
      answer:
        "Nesta demonstração, você pode selecionar vários lugares, respeitando a capacidade de cada mesa, e adicionar mesas diferentes ao carrinho. As condições oficiais serão confirmadas.",
    },
    {
      question: "Posso comprar a mesa inteira?",
      answer:
        "Você pode simular a seleção de todos os lugares disponíveis de uma mesa. A política de venda por mesa será divulgada antes da abertura das vendas.",
    },
    {
      question: "Como recebo meu convite?",
      answer:
        "O formato e o canal de envio serão informados em breve. Nesta prévia, o checkout e a confirmação são apenas demonstrativos; nenhum convite é emitido.",
    },
    {
      question: "O convite terá QR Code?",
      answer:
        "A experiência prevista inclui um convite com QR Code. Nesta etapa visual, não há geração de código nem validação de entrada.",
    },
    {
      question: "Crianças precisam de ingresso?",
      answer:
        "A política para crianças, as faixas etárias e os respectivos valores ainda estão em definição.",
    },
  ],
} as const;

export type SectorId =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N";
export type TableStatus = "available" | "reserved" | "sold" | "unavailable";
export type VenueTable = {
  id: string;
  number: string;
  sector: SectorId | null;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: "square" | "rectangle" | "round";
  capacity: number | null;
  status: TableStatus;
  needsReview?: boolean;
  reviewNote?: string;
};
export type VenueSector = {
  id: SectorId;
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const sectorConfig: VenueSector[] = [
  {
    id: "A",
    name: "Varanda",
    color: "#a97779",
    x: 15,
    y: 35,
    width: 260,
    height: 305,
  },
  {
    id: "B",
    name: "Varanda",
    color: "#708c93",
    x: 280,
    y: 35,
    width: 230,
    height: 305,
  },
  {
    id: "C",
    name: "Varanda",
    color: "#899773",
    x: 517,
    y: 35,
    width: 245,
    height: 305,
  },
  {
    id: "D",
    name: "Próximo à área kids",
    color: "#bd9474",
    x: 769,
    y: 35,
    width: 183,
    height: 305,
  },
  {
    id: "E",
    name: "Salão · entrada",
    color: "#b1a179",
    x: 94,
    y: 350,
    width: 204,
    height: 221,
  },
  {
    id: "F",
    name: "Salão · entrada",
    color: "#a48a9e",
    x: 305,
    y: 350,
    width: 276,
    height: 204,
  },
  {
    id: "G",
    name: "Salão · entrada",
    color: "#ac788a",
    x: 588,
    y: 350,
    width: 290,
    height: 194,
  },
  {
    id: "H",
    name: "Próximo ao bilhar",
    color: "#899773",
    x: 18,
    y: 806,
    width: 290,
    height: 200,
  },
  {
    id: "I",
    name: "Área bilhar",
    color: "#708c93",
    x: 317,
    y: 806,
    width: 312,
    height: 200,
  },
  {
    id: "J",
    name: "Salão superior",
    color: "#b1a179",
    x: 638,
    y: 806,
    width: 414,
    height: 200,
  },
  {
    id: "K",
    name: "Mezanino · escada",
    color: "#ac788a",
    x: 33,
    y: 1018,
    width: 249,
    height: 305,
  },
  {
    id: "L",
    name: "Mezanino · pista",
    color: "#bd9474",
    x: 292,
    y: 1018,
    width: 375,
    height: 305,
  },
  {
    id: "M",
    name: "Mezanino · bar",
    color: "#739b96",
    x: 675,
    y: 1018,
    width: 266,
    height: 153,
  },
  {
    id: "N",
    name: "Mezanino · músico",
    color: "#a48a9e",
    x: 675,
    y: 1180,
    width: 266,
    height: 215,
  },
];

function table(
  number: number,
  sector: SectorId | null,
  x: number,
  y: number,
  capacity: number | null = 4,
  width = 42,
  height = 42,
  shape: VenueTable["shape"] = "square",
  extra: Partial<VenueTable> = {},
): VenueTable {
  return {
    id: `${sector ?? "hall"}-${number}`,
    number: String(number),
    sector,
    x,
    y,
    width,
    height,
    shape,
    capacity,
    status: "available",
    ...extra,
  };
}

export const tableConfig: VenueTable[] = [
  table(14, "A", 58, 101),
  table(15, "A", 144, 101, 4, 42, 62, "rectangle"),
  table(20, "A", 233, 101),
  table(13, "A", 58, 192),
  table(16, "A", 144, 192, 4, 42, 50, "rectangle"),
  table(19, "A", 233, 192, 4, 42, 42, "square", { status: "reserved" }),
  table(12, "A", 58, 287),
  table(17, "A", 144, 287),
  table(18, "A", 233, 287),
  table(21, "B", 325, 101, 4, 42, 62, "rectangle"),
  table(26, "B", 411, 101),
  table(22, "B", 325, 192, 2, 42, 48, "rectangle"),
  table(25, "B", 409, 192, 2, 42, 48, "rectangle"),
  table(23, "B", 325, 287),
  table(24, "B", 409, 282, 4, 42, 66, "rectangle"),
  table(27, "B", 481, 140, null, 36, 156, "rectangle", {
    needsReview: true,
    status: "unavailable",
    reviewNote:
      "Quantidade de cadeiras pouco legível na referência. Capacidade a confirmar.",
  }),
  table(31, "C", 558, 101),
  table(32, "C", 646, 101),
  table(30, "C", 558, 194),
  table(33, "C", 646, 194),
  table(29, "C", 558, 300),
  table(34, "C", 646, 300, 4, 42, 42, "square", {
    id: "C-34-square",
    needsReview: true,
    status: "unavailable",
    reviewNote:
      "A referência repete o número 34. Confirmar o número desta mesa quadrada; a mesa 28 não aparece na planta.",
  }),
  table(34, "C", 722, 192, 14, 40, 262, "rectangle", {
    id: "C-34-long",
    needsReview: true,
    status: "unavailable",
    reviewNote:
      "Número 34 duplicado no setor C. Confirmar identificação e os 14 lugares aparentes da mesa longa.",
  }),
  table(35, "D", 817, 107, 6, 42, 78, "rectangle"),
  table(38, "D", 897, 101),
  table(36, "D", 815, 281),
  table(37, "D", 903, 273, 6, 42, 78, "rectangle"),
  table(2, "E", 146, 403),
  table(3, "E", 241, 403, 4, 42, 56, "rectangle"),
  table(1, "E", 146, 504),
  table(4, "E", 241, 494, 4, 42, 76, "rectangle"),
  table(5, "F", 348, 402),
  table(7, "F", 440, 416, 4, 42, 72, "rectangle"),
  table(8, "F", 534, 414, 4, 42, 76, "rectangle"),
  table(6, "F", 348, 500),
  table(9, "G", 642, 404),
  table(10, "G", 742, 402, 7, 66, 44, "rectangle"),
  table(11, "G", 835, 404, 4, 42, 42, "square", { status: "sold" }),
  table(100, null, 186, 661, 4, 42, 42, "round", {
    needsReview: true,
    status: "unavailable",
    reviewNote:
      "Mesa 100 aparece junto ao bar, fora dos setores. Confirmar setor e participação no evento.",
  }),
  table(56, "H", 76, 876, 5, 42, 70, "rectangle"),
  table(57, "H", 244, 855),
  table(55, "H", 76, 962),
  table(58, "H", 244, 952, 5, 42, 70, "rectangle"),
  ...[
    [61, 408, 850],
    [62, 536, 850],
    [59, 408, 978],
    [60, 536, 978],
  ].map(([n, x, y]) =>
    table(n, "I", x, y, null, 42, 42, "round", {
      needsReview: true,
      status: "unavailable",
      reviewNote:
        "A planta não desenha cadeiras para as mesas 59–62 da área bilhar. Capacidade a confirmar.",
    }),
  ),
  table(63, "J", 690, 872, 5, 42, 68, "rectangle"),
  table(66, "J", 787, 872, 5, 42, 68, "rectangle"),
  table(67, "J", 894, 872, 5, 42, 68, "rectangle"),
  table(70, "J", 1004, 872, 5, 42, 68, "rectangle"),
  table(64, "J", 690, 960),
  table(65, "J", 787, 960),
  table(68, "J", 894, 960),
  table(69, "J", 1004, 960),
  table(53, "K", 79, 1125, 7, 42, 130, "rectangle"),
  table(52, "K", 215, 1099, 5, 42, 70, "rectangle"),
  table(51, "K", 224, 1217),
  table(54, "K", 86, 1278),
  table(50, "K", 197, 1278),
  table(46, "L", 362, 1067),
  table(44, "L", 587, 1064, 5, 42, 58, "rectangle"),
  table(47, "L", 350, 1139),
  table(45, "L", 587, 1138, 3, 42, 46, "rectangle"),
  table(48, "L", 350, 1213),
  table(49, "L", 351, 1279, 6, 68, 40, "rectangle"),
  table(43, "M", 724, 1096, 6, 42, 122, "rectangle"),
  table(42, "M", 872, 1133, 3, 58, 44, "rectangle"),
  table(41, "N", 814, 1254, 6, 74, 40, "rectangle"),
  table(39, "N", 729, 1340),
  table(40, "N", 880, 1340),
];

export const statusLabels = {
  available: "Disponível",
  selected: "Sua seleção",
  reserved: "Reservada",
  sold: "Vendida",
  unavailable: "Indisponível",
};
export const formatMoney = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export type CartItem = { tableId: string; quantity: number };
export function getCartTotal(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + item.quantity * eventConfig.pricePerPerson,
    0,
  );
}
export function validCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value
    .filter((item): item is CartItem => {
      if (
        !item ||
        typeof item.tableId !== "string" ||
        !Number.isInteger(item.quantity)
      )
        return false;
      const target = tableConfig.find((entry) => entry.id === item.tableId);
      if (
        !target ||
        target.status !== "available" ||
        !target.capacity ||
        item.quantity < 1 ||
        item.quantity > target.capacity ||
        seen.has(item.tableId)
      )
        return false;
      seen.add(item.tableId);
      return true;
    })
    .map(({ tableId, quantity }) => ({ tableId, quantity }));
}
