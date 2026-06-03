import React from "react";
import { Shirt, Phone, Mail, MapPin, Clock, ShieldAlert, Award } from "lucide-react";
import { GENERAL_INFO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        
        {/* Brand details Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm shadow-blue-500/20">
              <Shirt className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="text-left font-sans">
              <span className="font-extrabold text-lg tracking-tight text-white block">
                PeyBer
              </span>
              <span className="text-[8px] font-semibold text-blue-400 tracking-widest uppercase block -mt-1">
                Uniformes
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm text-left">
            {GENERAL_INFO.companyDescription} Liderando el mercado de ropa de trabajo en el centroccidente del país.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Award className="w-4 h-4 text-blue-500" />
            <span>Telas certificadas con garantía anti-pilling</span>
          </div>
        </div>

        {/* Quick Nav links */}
        <div className="md:col-span-3 text-left space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Explorar Catálogo
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("catalog")} className="hover:text-blue-400 cursor-pointer transition-colors">
                Línea Administrativa / Sastrería
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("catalog")} className="hover:text-blue-400 cursor-pointer transition-colors">
                Línea Hospitalaria / Scrubs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("catalog")} className="hover:text-blue-400 cursor-pointer transition-colors">
                Línea Industrial y de Seguridad
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("catalog")} className="hover:text-blue-400 cursor-pointer transition-colors">
                Línea Escolar y Polos
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("catalog")} className="hover:text-blue-400 cursor-pointer transition-colors">
                Línea Deportiva Sublimada
              </button>
            </li>
          </ul>
        </div>

        {/* Direct Contact column */}
        <div className="md:col-span-4 text-left space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Atención al Cliente
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>
                Teléfono:{" "}
                <a href={`pt:${GENERAL_INFO.phone}`} className="hover:text-white font-mono font-medium">
                  {GENERAL_INFO.phone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>
                Correo:{" "}
                <a href={`mailto:${GENERAL_INFO.email}`} className="hover:text-white font-mono">
                  {GENERAL_INFO.email}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{GENERAL_INFO.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>{GENERAL_INFO.hours}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copy info bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          © {year} <strong>{GENERAL_INFO.companyName}</strong>. Todos los derechos reservados. Barquisimeto, Venezuela.
        </div>
        <div className="flex gap-4">
          <button onClick={() => onNavigate("hero")} className="hover:text-slate-300 cursor-pointer">
            Volver Arriba ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
