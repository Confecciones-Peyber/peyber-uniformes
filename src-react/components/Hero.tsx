import React from "react";
import { motion } from "motion/react";
import { ArrowDown, CheckCircle, Shirt, PhoneCall, Sparkles } from "lucide-react";
import { GENERAL_INFO } from "../data";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.2 }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50 text-slate-900"
    >
      {/* Background visual art */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-50 z-0" />
      
      {/* Absolute grid decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-50 z-0" />

      {/* Glow shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left column: Text Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dynamic badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>FABRICACIÓN DIRECTA DE ALTA CALIDAD</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]"
          >
            Viste la <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">excelencia</span> de tu equipo
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-lg sm:text-xl font-medium max-w-xl leading-relaxed"
          >
            Diseño, corte y confección de uniforme corporativos, médicos, industriales y escolares. Fortalecemos la identidad de tu empresa con textiles resistentes y acabados perfectos.
          </motion.p>

          {/* Core high-quality highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 text-slate-700 font-medium text-sm w-full"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Confección sobre medida y estándar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Tecnología textil antifluidos y de alta fricción</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Bordados computarizados de alta densidad</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Capacidad de producción al mayor y detal</span>
            </div>
          </motion.div>

          {/* Interactive Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => onScrollToSection("catalog")}
              className="cursor-pointer group flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
            >
              <span>Explorar Catálogo</span>
              <Shirt className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            </button>

            <button
              onClick={() => onScrollToSection("quote-section")}
              className="cursor-pointer flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-100 text-slate-800 font-semibold rounded-full hover:bg-slate-200 transition-all duration-200 active:scale-95"
            >
              <span>Pedir una Cotización</span>
            </button>
          </motion.div>

          {/* Fast WhatsApp Callout */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 pt-4 border-t border-slate-200 w-full"
          >
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span className="text-sm text-slate-500 font-medium">
              Contacto Directo WhatsApp:{" "}
              <a
                href={`https://wa.me/${GENERAL_INFO.phoneFormatted}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-bold"
              >
                {GENERAL_INFO.phone}
              </a>
            </span>
          </motion.div>
        </motion.div>

        {/* Right column: Graphic showcase */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] bg-white rounded-[2rem] p-4 border border-slate-200 shadow-2xl overflow-hidden group">
            {/* Inner background patterns */}
            <div className="absolute inset-0 bg-slate-50" />

            {/* Simulated premium photo showcase */}
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-slate-200 flex flex-col justify-between shadow-inner">
              {/* Image with no-referrer policy */}
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                alt="Uniforme Ejecutivo PeyBer"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/10 mix-blend-multiply" />

              {/* Tag overlay */}
              <div className="p-4 relative z-10 flex justify-between items-start">
                <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-xs font-bold text-slate-900">
                  Modelo 2026
                </div>
                <div className="px-3 py-1 bg-blue-600 rounded-full shadow-sm text-xs font-bold text-white">
                  Premium Fit
                </div>
              </div>

              {/* Bottom Card text */}
              <div className="p-6 relative z-10 bg-white/95 backdrop-blur-md border-t border-slate-200">
                <p className="text-blue-600 text-xs font-bold uppercase mb-1">
                  PeyBer Sastrería Empresarial
                </p>
                <h3 className="text-slate-900 text-xl font-black tracking-tight">
                  Saco Ejecutivo & Camisa Oxford
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Materiales importados con costura invisible e hilos reforzados. Fabricados a tu medida.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-blue-600 font-bold hover:text-blue-700 cursor-pointer" onClick={() => onScrollToSection("quote-section")}>
                  <span>Cotizar este modelo</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow decorator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <motion.button
          onClick={() => onScrollToSection("categories")}
          className="p-3 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-900 hover:shadow-md cursor-pointer shadow-sm animate-bounce"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
