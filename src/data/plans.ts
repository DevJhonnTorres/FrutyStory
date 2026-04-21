export type Plan = {
  id: "basico" | "pro" | "premium";
  name: string;
  tagline: string;
  price: number; // COP
  priceLabel: string;
  episodes: string;
  highlight?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "paquete01",
    name: "Paquete 01",
    tagline: "Integración básica",
    price: 1500,
    priceLabel: "$1,500 USD",
    episodes: "2 capítulos",
    features: [
      "Creación de personaje dentro la historia",
      "Número de capítulos: 2",
      "Historias: 2",
      "Duración mínima por capítulo: 15 seg",
      "Episodio Especial (miércoles 11am COL): No",
      "Fruty UGC: No",
      "Historia destacada: No",
      "Enlace directo en historias (24 horas): Sí",
      "Colaboración: No",
      "Mención - etiqueta: No",
      "Link en la publicación: Sí",
      "Informe de resultados: 1",
    ],
  },
  {
    id: "paquete02",
    name: "Paquete 02",
    tagline: "Integración intermedia",
    price: 2500,
    priceLabel: "$2,500 USD",
    episodes: "5 capítulos",
    features: [
      "Creación de personaje dentro la historia",
      "Número de capítulos: 5",
      "Historias: 4",
      "Duración mínima por capítulo: 30 seg",
      "Episodio Especial (miércoles 11am COL): No",
      "Fruty UGC: No",
      "Historia destacada: No",
      "Enlace directo en historias (24 horas): Sí",
      "Colaboración: No",
      "Mención - etiqueta: No",
      "Link en la publicación: Sí",
      "Informe de resultados: 1",
    ],
  },
  {
    id: "paquete03",
    name: "Paquete 03",
    tagline: "Integración completa",
    price: 3500,
    priceLabel: "$3,500 USD",
    episodes: "8 capítulos",
    highlight: true,
    features: [
      "Creación de personaje dentro la historia",
      "Número de capítulos: 8",
      "Historias: 6",
      "Duración mínima por capítulo: 50 seg",
      "Episodio Especial (miércoles 11am COL): Sí",
      "Fruty UGC: Sí",
      "Historia destacada: Sí",
      "Enlace directo en historias (24 horas): Sí",
      "Colaboración: Sí",
      "Mención - etiqueta: Sí",
      "Link en la publicación: Sí",
      "Informe de resultados: 1",
    ],
  },
];

export const formatCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
