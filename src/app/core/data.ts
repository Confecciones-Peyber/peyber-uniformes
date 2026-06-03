import { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "corporate",
    name: "Línea Corporativa",
    description: "Sastrería y camisería empresarial de alta gama. Imagen impecable, comodidad superior y costuras reforzadas para el día a día administrativo.",
    iconName: "Briefcase",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "healthcare",
    name: "Línea Médica y de Salud",
    description: "Monos quirúrgicos, batas de laboratorio y scrubs con tecnología antifluido, protección antimicrobial y flexibilidad garantizada.",
    iconName: "Stethoscope",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "industrial",
    name: "Línea Industrial y Seguridad",
    description: "Overoles de alta resistencia, chalecos reflectivos, calzado y camisas de jean. Diseñados para máximo rendimiento en ambientes exigentes.",
    iconName: "ShieldAlert",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "school",
    name: "Línea Escolar",
    description: "Chemises, pantalones, faldas y monos deportivos de uso escolar. Tejidos altamente duraderos que resisten el juego y los lavados frecuentes.",
    iconName: "GraduationCap",
    heroImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sports",
    name: "Línea Deportiva",
    description: "Camisetas sublimadas, monos de entrenamiento y shorts de alto rendimiento con tecnologías dry-fit para transpirabilidad óptima.",
    iconName: "Trophy",
    heroImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80"
  }
];

export const PRODUCTS: Product[] = [
  // Corporate Category
  {
    id: "corp-blazer-fem",
    name: "Blazer Ejecutivo - Dama",
    category: "corporate",
    description: "Saco ejecutivo premium de dama con forro interno satinado, entallado moderno y tela de gabardina elastizada para mayor movilidad.",
    materials: ["Gabardina Premium (65% Poliéster / 35% Viscosa)", "Spandex"],
    colors: [
      { name: "Azul Marino", hex: "#1E293B" },
      { name: "Negro Ejecutivo", hex: "#0F172A" },
      { name: "Gris Grafito", hex: "#475569" },
      { name: "Rojo Borgoña", hex: "#7F1D1D" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    basePrice: 45.0,
    features: [
      "Hilos de costura de alta resistencia",
      "Bolsillos ojales funcionales",
      "Tejido que reduce la sudoración y no se arruga fácilmente",
      "Forro interno suave y fresco"
    ]
  },
  {
    id: "corp-shirt-men",
    name: "Camisa Oxford Formal - Caballero",
    category: "corporate",
    description: "Camisa manga larga de tela Oxford importada. Cuello rígido institucional y puños ajustables. Ideal para una presencia impecable en oficinas.",
    materials: ["Tejido Oxford Imperial (70% Algodón / 30% Poliéster)"],
    colors: [
      { name: "Blanco Optico", hex: "#F8FAFC" },
      { name: "Azul Cielo", hex: "#BAE6FD" },
      { name: "Gris Claro", hex: "#CBD5E1" },
      { name: "Rosa Pastel", hex: "#FCE7F3" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    basePrice: 22.0,
    features: [
      "Fácil planchado (Easy-iron finish)",
      "Cuello reforzado para mantener rigidez",
      "Costuras de seguridad de doble aguja",
      "Opción de bolsillo con o sin tapar"
    ]
  },
  {
    id: "corp-trousers-unisex",
    name: "Pantalón de Vestir Clásico",
    category: "corporate",
    description: "Pantalón semifit con pretina expandible reforzada, bolsillos traseros con botones y pliegues marcados permanentemente.",
    materials: ["Sarga de Viscosa Antipilling"],
    colors: [
      { name: "Negro", hex: "#0F172A" },
      { name: "Azul Marino", hex: "#1E293B" },
      { name: "Gris Plomo", hex: "#334155" },
      { name: "Beige Khaki", hex: "#D97706" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    basePrice: 28.0,
    features: [
      "Entretela reforzada en pretina",
      "Cierre YKK de larga resistencia",
      "Tejido resistente a la abrasión y decoloración",
      "Bolsillo de seguridad interior"
    ]
  },

  // Healthcare Category
  {
    id: "med-scrub-unisex",
    name: "Uniforme Scrub Clínico (Conjunto)",
    category: "healthcare",
    description: "Conjunto de camisa cuello en V y pantalón jogger o recto. Equipado con múltiples bolsillos utilitarios y confeccionado en tela antifluido súper flexible.",
    materials: ["Microfibra Tecnológica Antifluido", "Clororesistente (8% Spandex / 92% Poliéster)"],
    colors: [
      { name: "Azul Quirúrgico", hex: "#0284C7" },
      { name: "Verde Médico", hex: "#059669" },
      { name: "Azul Marino", hex: "#0F172A" },
      { name: "Gris Clínico", hex: "#64748B" },
      { name: "Lila Claro", hex: "#C084FC" },
      { name: "Rosa Médico", hex: "#F472B6" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    basePrice: 35.0,
    features: [
      "Acabado hidrofóbico que repele salpicaduras de fluidos",
      "Pantalón con cintura elástica y cordón ajustable",
      "6 bolsillos prácticos para estetoscopio, móviles y bolígrafos",
      "Tela elástica de 4 vías (Four-Way Stretch)"
    ]
  },
  {
    id: "med-coat",
    name: "Bata de Laboratorio / Consulta",
    category: "healthcare",
    description: "Bata clásica unisex con abotonado frontal oculto, martingala ajustadora en espalda y aberturas laterales para acceso a bolsillos del pantalón.",
    materials: ["Gabardina Ligera Antimicrobial (65% Algodón)"],
    colors: [
      { name: "Blanco Clínico", hex: "#FFFFFF" },
      { name: "Azul Celeste", hex: "#E0F2FE" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    basePrice: 26.0,
    features: [
      "Protección antibacterial certificada",
      "Ojales reforzados e hilos Mercerizados",
      "Dos bolsillos de parche delanteros y uno de pecho",
      "Resistencia extrema a lavados calientes y cloro residual"
    ]
  },

  // Industrial Category
  {
    id: "ind-overall",
    name: "Overol / Braga Industrial de Seguridad",
    category: "industrial",
    description: "Braga completa de alto rendimiento con cierre de doble cursor de bronce, bandas reflectivas homologadas de 2 pulgadas y áreas de flexión ventiladas.",
    materials: ["Twill Súper Pesado (100% Algodón o Mezcla de Alta Durabilidad)"],
    colors: [
      { name: "Naranja Rescate", hex: "#EA580C" },
      { name: "Azul Oscuro", hex: "#1E3A8A" },
      { name: "Verde Industrial", hex: "#14532D" },
      { name: "Gris Mecánico", hex: "#475569" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    basePrice: 42.0,
    features: [
      "Bandas reflectivas de microesferas de alta reflectividad de 360°",
      "Remaches de refuerzo en puntos de tensión",
      "Cintura trasera elástica para ajuste de confort",
      "Bolsillo para reglas, herramientas y celular con cierre de seguridad"
    ]
  },
  {
    id: "ind-reflective-vest",
    name: "Chaleco Reflectivo de Tránsito",
    category: "industrial",
    description: "Chaleco de seguridad liviano con canesú y malla transpirable (mesh), bolsillos industriales para planillas y porta-credencial transparente.",
    materials: ["Malla de Poliéster Aislante", "Cintas Microprismáticas"],
    colors: [
      { name: "Amarillo Neón", hex: "#EAB308" },
      { name: "Naranja Tránsito", hex: "#F97316" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    basePrice: 12.0,
    features: [
      "Bolsillo transparente para carnet de identificación",
      "Cierre frontal de velcro de grado A",
      "Cintas reflectantes fluorescentes clase 2",
      "Argolla en D trasera para arnés de seguridad"
    ]
  },

  // School Category
  {
    id: "school-polo",
    name: "Chemise / Polo Escolar",
    category: "school",
    description: "Chemise escolar clásica de tejido Piqué. Cuello y puños tejidos en combinación, doble botón frontal reforzado. Ideal para uniformes escolares reglamentarios.",
    materials: ["Piqué Premium (60% Algodón de Fibras Largas / 40% Poliéster)"],
    colors: [
      { name: "Azul Marino", hex: "#1E3A8A" },
      { name: "Rojo Escolar", hex: "#991B1B" },
      { name: "Blanco Escolar", hex: "#F8FAFC" },
      { name: "Celeste Escolar", hex: "#93C5FD" },
      { name: "Beige Institucional", hex: "#D97706" }
    ],
    sizes: ["2", "4", "6", "8", "10", "12", "14", "16", "S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    basePrice: 14.0,
    features: [
      "Tejido antipilling (no se le forman motas)",
      "Colores sólidos de alta fijación que no sangran",
      "Cuello con entretela que previene dobleces deformes",
      "Tapeta de botones reforzada"
    ]
  },

  // Sports Category
  {
    id: "sports-jersey",
    name: "Camiseta Deportiva Sublimada",
    category: "sports",
    description: "Camiseta deportiva confeccionada en tejido Dry-Fit inteligente con canales de aireación lateral, perfecta para equipos escolares o corporativos.",
    materials: ["Poliéster Dry-Fit con Filtro UV", "Micro-mesh transpirable"],
    colors: [
      { name: "Azul Deportivo / Blanco", hex: "#1D4ED8" },
      { name: "Rojo Intenso / Negro", hex: "#B91C1C" },
      { name: "Verde Esmeralda", hex: "#047857" },
      { name: "Negro Obsidiana / Dorado", hex: "#171717" }
    ],
    sizes: ["2", "4", "6", "8", "10", "12", "14", "XS", "S", "M", "L", "XL", "XXL"],
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    basePrice: 16.0,
    features: [
      "Sublimación digital fotográfica de alta resolución",
      "Tecnología Cool-Feel absorbente de humedad",
      "Elasticidad adaptable bidireccional",
      "Costuras elásticas planas anti-roce"
    ]
  }
];

export const GENERAL_INFO = {
  phone: "04145082446",
  phoneFormatted: "+584145082446",
  email: "confeccionespeyber@gmail.com",
  instagram: "https://www.instagram.com/uniformes_peyber/",
  whatsappMessage: "¡Hola PeyBer! Me gustaría obtener más información sobre sus servicios y uniformes.",
  address: "Barquisimeto, Estado Lara, Venezuela",
  hours: "Lunes a Viernes 8:00 AM - 5:00 PM",
  companyName: "PeyBer Uniformes",
  companyDescription: "Confección y distribución de uniformes profesionales de alta resistencia y diseño moderno. Liderando el mercado de ropa de trabajo en el centroccidente del país."
};
