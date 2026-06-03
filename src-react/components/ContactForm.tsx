import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, Check, HeartHandshake, FileSpreadsheet } from "lucide-react";
import { GENERAL_INFO } from "../data";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Cotización Corporativa");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Nest + Mongo API endpoint post
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono bg-blue-500/10 px-3 py-1 rounded-full">
            Centro de Soporte
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Hablemos de tus Uniformes
          </h2>
          <p className="text-slate-600 text-base">
            Envía tus especificaciones técnicas, solicita cotizaciones por volumen o coordina una visita de nuestros asesores comerciales a tus oficinas.
          </p>
        </div>

        {/* Contact Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Card Block (Left Side) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />
            
            <div className="space-y-8 relative z-10 text-left">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Atención Corporativa</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  PeyBer Uniformes cuenta con un centro de diseño y costura capacitado para grandes producciones. Contáctanos por cualquiera de nuestras vías directas.
                </p>
              </div>

              {/* Info details */}
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Teléfono Directo</span>
                    <a href={`pt:${GENERAL_INFO.phone}`} className="text-white hover:text-blue-500 font-semibold font-mono text-sm mt-0.5 block">
                      {GENERAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Correo Electrónico</span>
                    <a href={`mailto:${GENERAL_INFO.email}`} className="text-white hover:text-blue-500 font-semibold font-mono text-sm mt-0.5 block">
                      {GENERAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Planta y Oficinas</span>
                    <p className="text-slate-300 font-medium text-xs sm:text-sm mt-0.5 leading-relaxed">
                      {GENERAL_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Horario Laboral</span>
                    <p className="text-slate-300 font-medium text-xs sm:text-sm mt-0.5">
                      {GENERAL_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality badges in side */}
            <div className="pt-8 border-t border-slate-800 text-left relative z-10 hidden lg:block">
              <span className="text-[10px] font-bold font-mono text-blue-500 uppercase tracking-widest block mb-1">
                Garantía PeyBer
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Cada pedido incluye revisión de muestras pre-producción para asegurar la conformidad de telas, tallas y bordado institucional.
              </p>
            </div>
          </div>

          {/* Elegant Interactive Contact Form (Right Side) */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-left relative shadow-sm">
            
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form-contact"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Tu Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Sofía Rodriguez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Empresa / Organización
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Clínica Lara C.A."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Correo de Contacto *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ej: srodriguez@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Teléfono Móvil
                      </label>
                      <input
                        type="tel"
                        placeholder="Ej: 0414-XXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Asunto de Consulta
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {["Cotización Grupal", "Visita de Asesor", "Dudas de Fabricación"].map((sub) => (
                        <button
                          type="button"
                          key={sub}
                          onClick={() => setSubject(sub)}
                          className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                            subject === sub
                              ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Detalles de tu Requerimiento *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Indícanos cuántas prendas necesitas, si vas a requerir bordados institucionales, colores corporativos y rangos de entrega estimados."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`cursor-pointer w-full group flex items-center justify-center gap-2 py-4 font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md active:scale-95 ${
                        isSubmitting
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Enviando mensaje..." : "Enviar Formulario"}</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="feedback-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="w-16 h-16 bg-emerald-150 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-300">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-950">¡Mensaje Recibido, muchas gracias!</h3>
                    <p className="text-slate-650 text-sm max-w-md mx-auto leading-relaxed">
                      Tus especificaciones han sido almacenadas con éxito en nuestro sistema de backend. El equipo comercial de <strong className="text-slate-900">PeyBer Uniformes</strong> se pondrá en contacto contigo telefónicamente o por correo electrónico dentro de las próximas 24 horas hábiles.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-100 rounded-xl text-left border border-slate-200 max-w-sm w-full font-mono text-[10px] text-slate-600 flex items-start gap-2.5">
                    <FileSpreadsheet className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 block">Detalle de registro:</span>
                      <span>ID-CONTACT: PEY-{(Math.random() * 10000).toFixed(0)}</span>
                      <span className="block mt-0.5">Asunto: {subject}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSuccess(false)}
                    className="cursor-pointer py-2 px-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 rounded-xl text-xs font-semibold"
                  >
                    Enviar otro Mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </section>
  );
}
