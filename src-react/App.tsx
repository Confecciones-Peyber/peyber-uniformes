import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import QuoteBuilder from "./components/QuoteBuilder";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { Product } from "./types";
import { PRODUCTS } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fallback to select first product so QuoteBuilder is initialized
  useEffect(() => {
    if (PRODUCTS.length > 0 && !selectedProduct) {
      setSelectedProduct(PRODUCTS[0]);
    }
  }, [selectedProduct]);

  // Handle smooth scroll when navigating
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Find offset to account for sticky header height
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Intersection observer to automatically highlight active section in Navbar on scroll
  useEffect(() => {
    const sections = ["hero", "categories", "catalog", "quote-section", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for sticky navigation

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-blue-200 selection:text-slate-900">
      {/* Prime Navigation Header bar */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Hero Presentation */}
      <Hero onScrollToSection={scrollToSection} />

      {/* Main product catalog */}
      <Catalog
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onScrollToSection={scrollToSection}
      />

      {/* Custom Quote Builder */}
      <div id="quote-section">
        <QuoteBuilder
          selectedProduct={selectedProduct}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />
      </div>

      {/* Contact information form */}
      <ContactForm />

      {/* Professional Footer block */}
      <Footer onNavigate={scrollToSection} />

      {/* Pulsing floating WhatsApp interaction bubble (direct user request aspect) */}
      <WhatsAppFloat selectedProduct={selectedProduct} />
    </div>
  );
}
