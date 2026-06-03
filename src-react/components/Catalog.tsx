import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Stethoscope,
  Shield,
  GraduationCap,
  Trophy,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data";
import { Product, Category } from "../types";

interface CatalogProps {
  onSelectProduct: (product: Product) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Catalog({ onSelectProduct, onScrollToSection }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Map category icons dynamically
  const renderCategoryIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className={className} />;
      case "Stethoscope":
        return <Stethoscope className={className} />;
      case "ShieldAlert":
        return <Shield className={className} />;
      case "GraduationCap":
        return <GraduationCap className={className} />;
      case "Trophy":
        return <Trophy className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleSelectToQuote = (product: Product) => {
    onSelectProduct(product);
    onScrollToSection("quote-section");
  };

  return (
    <section id="catalog-section" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div id="catalog-header" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            Catálogo Corporativo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Nuestras Colecciones de Uniformes
          </h2>
          <p className="text-slate-600 text-base">
            Hechos para resistir jornadas intensas. Selecciona tu sector para ver los modelos y materiales disponibles en nuestro taller textil.
          </p>
        </div>

        {/* Categories Section Grid */}
        <div id="categories" className="flex flex-wrap justify-center gap-3 mb-12">
          {/* "All" button */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`cursor-pointer px-6 py-2.5 rounded-full border text-center transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === "all"
                ? "bg-blue-600 border-blue-600 text-white shadow-md"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-semibold">Todos</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer px-6 py-2.5 rounded-full border text-center transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className={selectedCategory === cat.id ? "text-white" : "text-blue-600"}>
                {renderCategoryIcon(cat.iconName, "w-4 h-4")}
              </div>
              <span className="text-sm font-semibold line-clamp-1">
                {cat.name.replace("Línea ", "")}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Category Feature Card */}
        <AnimatePresence mode="wait">
          {selectedCategory !== "all" && (
              <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 text-slate-900 mb-12 border border-slate-200 shadow-xl flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/3 aspect-[16/10] rounded-[1.5rem] overflow-hidden relative shadow-inner">
                <img
                  src={CATEGORIES.find((c) => c.id === selectedCategory)?.heroImage}
                  alt={CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="w-full md:w-2/3 space-y-3 text-left">
                <div className="flex items-center gap-2 text-blue-600">
                  {renderCategoryIcon(CATEGORIES.find((c) => c.id === selectedCategory)?.iconName || "", "w-6 h-6")}
                  <h3 className="text-2xl font-black tracking-tight">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  </h3>
                </div>
                <p className="text-slate-600 text-base leading-relaxed">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-500 font-medium">
                  <span>🧵 Confección de alta resistencia</span>
                  <span>📍 Bordado computarizado</span>
                  <span>🛡️ Telas de alta gama</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <motion.div
          id="catalog"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left group"
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 text-xs font-bold rounded-full shadow-sm">
                      {CATEGORIES.find((c) => c.id === product.category)?.name.replace("Línea ", "")}
                    </span>
                  </div>

                  {/* Pricing estimation box inside */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                      Desde ${product.basePrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                      </h4>
                      <p className="text-slate-500 text-sm mt-1 font-medium">
                        🧵 Mat: {product.materials[0]}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Uniform features list */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {product.features.slice(0, 2).map((feat, idx) => (
                         <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                           <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                           <span className="line-clamp-1">{feat}</span>
                         </div>
                      ))}
                    </div>

                    {/* Previews of colors selectable */}
                    <div className="pt-3">
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                         Colores Disponibles
                       </p>
                       <div className="flex gap-2">
                         {product.colors.map((color, idx) => (
                           <div
                             key={idx}
                             title={color.name}
                             className="w-5 h-5 rounded-full border border-slate-200 shadow-sm"
                             style={{ backgroundColor: color.hex }}
                           />
                         ))}
                       </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => handleSelectToQuote(product)}
                      className="cursor-pointer w-full group flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-full transition-all duration-200"
                    >
                      <span>Cotizar Modelo</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
