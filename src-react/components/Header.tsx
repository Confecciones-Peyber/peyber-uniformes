import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shirt, Menu, X, Phone, Mail, Award, MessageCircle } from "lucide-react";
import { GENERAL_INFO } from "../data";

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "hero", label: "Inicio" },
    { id: "categories", label: "Categorías" },
    { id: "catalog", label: "Catálogo" },
    { id: "quote-section", label: "Cotizador" },
    { id: "contact", label: "Contacto" }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-white/60 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      {/* Top micro-bar for contact */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 pb-2 text-xs border-b border-slate-200 text-slate-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              {GENERAL_INFO.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              {GENERAL_INFO.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Uniformes Profesionales Certificados</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => handleItemClick("hero")}
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white rounded-lg p-1 group"
          id="logo-brand"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition-colors duration-200">
            <Shirt className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 block">
              PeyBer
            </span>
            <span className="text-[9px] font-semibold text-blue-600 tracking-widest uppercase block -mt-1">
              Uniformes
            </span>
          </div>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors relative py-2 cursor-pointer ${
                activeSection === item.id
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleItemClick("quote-section")}
            className="cursor-pointer flex items-center gap-1.5 px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-full transition-colors duration-200"
          >
            <span>Cotizar Ahora</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-lg"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <button
                onClick={() => handleItemClick("quote-section")}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              >
                Crear Cotización
              </button>
              <a
                href={`https://wa.me/${GENERAL_INFO.phoneFormatted}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-full"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>Asesor Comercial</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
