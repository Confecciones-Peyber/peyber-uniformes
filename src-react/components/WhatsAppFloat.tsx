import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";
import { GENERAL_INFO } from "../data";
import { Product } from "../types";

interface WhatsAppFloatProps {
  selectedProduct: Product | null;
}

export default function WhatsAppFloat({ selectedProduct }: WhatsAppFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState("");

  const templates = [
    {
      id: "general",
      label: "💬 Consulta General",
      message: "¡Hola! Estoy interesado en sus servicios y me gustaría obtener más información."
    },
    {
      id: "visit",
      label: "👔 Visita Comercial",
      message: "¡Hola! Me gustaría coordinar la visita de un asesor comercial de PeyBer a nuestras oficinas para revisar muestras de telas."
    },
    ...(selectedProduct
      ? [
          {
            id: "product",
            label: `🧵 Cotizar: ${selectedProduct.name}`,
            message: `¡Hola PeyBer! 👋 Me interesa cotizar un lote del modelo: *${selectedProduct.name}* (${selectedProduct.category.toUpperCase()}). ¿Podrían darme asesoría sobre colores y precios al mayor?`
          }
        ]
      : [])
  ];

  const handleSendText = (messageText: string) => {
    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${GENERAL_INFO.phoneFormatted}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      handleSendText(customText.trim());
      setCustomText("");
    }
  };

  return (
    <div id="whatsapp-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Micro-Chat Popover Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-150 overflow-hidden mb-4 mr-0 sm:mr-2 text-left"
          >
            {/* Header branding */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-4 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/10 rounded-full p-1"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">PeyBer Comercial</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-100">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
                    <span>En línea • Asesoramiento inmediato</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content chat log */}
            <div className="p-4 space-y-4 max-h-[320px] overflow-y-auto bg-slate-50">
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold block text-slate-900 mb-1">PeyBer Asesoría:</span>
                ¡Hola! Bienvenido a PeyBer Uniformes. ¿Cómo podemos ayudarte hoy con el diseño de tus uniformes corporativos, industriales o médicos?
              </div>

              {selectedProduct && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-[11px] text-slate-700 flex items-center gap-2">
                  <span className="p-1 px-1.5 bg-blue-500 text-white font-bold rounded text-[9px] font-mono leading-none">PRENDA</span>
                  <span className="line-clamp-1 font-medium">Interés: {selectedProduct.name}</span>
                </div>
              )}

              {/* Ready templates selectors */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Presiona una de nuestras opciones de contacto rápido:
                </span>
                <div className="flex flex-col gap-1.5">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => handleSendText(tpl.message)}
                      className="cursor-pointer w-full text-left bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between group"
                    >
                      <span className="line-clamp-1">{tpl.label}</span>
                      <Send className="w-3.5 h-3.5 text-green-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom text writing submission */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-slate-100 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="cursor-pointer bg-green-500 hover:bg-green-650 text-white rounded-xl p-2 flex items-center justify-center transition-colors shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Footer security badge */}
            <div className="bg-slate-100 px-4 py-1.5 text-center text-[9px] text-slate-400 border-t border-slate-150 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Conexión directa segura cifrada a WhatsApp Oficial</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Floating Button Trigger */}
      <div className="relative">
        {/* Pulsing beacon radar loop */}
        <span className="absolute inset-0 w-full h-full bg-green-500 rounded-full animate-ping opacity-60 pointer-events-none" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer relative z-10 w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-250 active:scale-90 group border border-green-400/20"
          id="whatsapp-fab-button"
          aria-label="Abrir WhatsApp PeyBer"
        >
          {isOpen ? (
            <X className="w-6 h-6 rotate-90" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-white/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform" />
          )}
        </button>

        {/* Small badge alerting of selected item */}
        {!isOpen && selectedProduct && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white font-mono animate-bounce shadow">
            1
          </span>
        )}
      </div>

    </div>
  );
}
