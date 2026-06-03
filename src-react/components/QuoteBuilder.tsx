import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  Mail,
  Shirt,
  Check,
  Plus,
  Minus,
  Briefcase,
  Layers,
  Sparkles,
  Info,
  Calendar,
  DollarSign
} from "lucide-react";
import { PRODUCTS, GENERAL_INFO } from "../data";
import { Product, QuoteRequest } from "../types";

interface QuoteBuilderProps {
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

export default function QuoteBuilder({ selectedProduct, onSelectProduct }: QuoteBuilderProps) {
  // If no product is preselected, default to the first product in the list
  const activeProduct = selectedProduct || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(12); // Standard corporate MOQ is 12 units
  const [includeEmbroidery, setIncludeEmbroidery] = useState<boolean>(false);
  const [embroideryDetails, setEmbroideryDetails] = useState<string>("");
  
  // Buyer details
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [comments, setComments] = useState<string>("");

  // Submit UI states
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);

  // Initialize selected color and size when the active product changes
  useEffect(() => {
    if (activeProduct) {
      setSelectedColor(activeProduct.colors[0]?.name || "");
      setSelectedSize(activeProduct.sizes[1] || activeProduct.sizes[0] || "");
    }
  }, [activeProduct]);

  // Adjust quantity
  const handleQtyChange = (val: number) => {
    if (val >= 1) {
      setQuantity(val);
    }
  };

  // Calculations
  const embroideryPrice = includeEmbroidery ? 3.5 : 0;
  const unitBasePrice = activeProduct.basePrice + embroideryPrice;
  const rawSubtotal = unitBasePrice * quantity;

  // Bulk discounts
  let discountPercentage = 0;
  if (quantity >= 12 && quantity < 50) {
    discountPercentage = 10; // 10% discount for orders over a dozen
  } else if (quantity >= 50 && quantity < 100) {
    discountPercentage = 15; // 15% discount for half-hundred
  } else if (quantity >= 100) {
    discountPercentage = 20; // 20% discount for large runs (100+)
  }

  const discountAmount = (rawSubtotal * discountPercentage) / 100;
  const finalSubtotal = rawSubtotal - discountAmount;
  const finalUnitPrice = finalSubtotal / quantity;

  // Format the WhatsApp message text
  const getWhatsAppMessage = () => {
    const text = `¡Hola Equipo PeyBer! 👋 Me interesa cotizar el siguiente uniforme:

👔 *Artículo:* ${activeProduct.name}
📍 *Categoría:* ${activeProduct.category.toUpperCase()}
🎨 *Color Elegido:* ${selectedColor}
📏 *Talla:* ${selectedSize}
🔢 *Cantidad:* ${quantity} unidades
🧵 *¿Incluye Bordado?:* ${includeEmbroidery ? `Sí (${embroideryDetails || "Logotipo de empresa"})` : "No"}

👤 *Datos de Contacto:*
- Nombre: ${customerName || "[Especificar]"}
- Teléfono: ${customerPhone || "[Especificar]"}
- Correo: ${customerEmail || "[Especificar]"}
${comments ? `\n📝 *Comentarios adicionales:* ${comments}` : ""}

_Enviado desde el Cotizador Digital de PeyBer Uniformes_`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/${GENERAL_INFO.phoneFormatted}?text=${getWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailSending(true);

    // Simulate sending email to PeyBer node server
    setTimeout(() => {
      setIsEmailSending(false);
      setEmailSuccess(true);
      
      // Reset after brief timeout
      setTimeout(() => {
        setEmailSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="quote-section" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      {/* Decorative Blur and grid lines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100 px-4 py-1.5 rounded-full">
            Presupuesto Inmediato
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Cotizador Digital de Uniformes
          </h2>
          <p className="text-slate-600 text-lg">
            Personaliza tus prendas, calcula descuentos corporativos y envía la solicitud por correo o directamente por WhatsApp.
          </p>
        </div>

        {/* Builder Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Uniform Showcase & Selector */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
                1. Selección de Modelo
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Selecciona la prenda a cotizar:
                </label>
                <select
                  value={activeProduct.id}
                  onChange={(e) => {
                    const prod = PRODUCTS.find((p) => p.id === e.target.value);
                    if (prod) onSelectProduct(prod);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer font-medium"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Ref: ${p.basePrice.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Product preview card layout */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-[4/3] bg-slate-100 shadow-inner">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Active category label overlay */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold rounded-full text-blue-700 shadow-sm">
                  {activeProduct.category}
                </div>
              </div>

              {/* Brief highlights summary */}
              <div className="space-y-2 text-left pt-2">
                <h4 className="text-base font-bold text-slate-900">{activeProduct.name}</h4>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {activeProduct.description}
                </p>
                <div className="text-xs font-medium text-blue-600 pt-1 flex flex-wrap gap-2">
                  <span>💪 Costura reforzada</span>
                  <span>⚡ Calidad PeyBer</span>
                </div>
              </div>
            </div>

            {/* Discount info table */}
            <div className="bg-blue-50/50 rounded-3xl border border-blue-100 p-6 space-y-4 text-left shadow-sm">
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <h4 className="text-sm font-bold tracking-wide uppercase">
                  Escala de Descuentos
                </h4>
              </div>
              <p className="text-sm text-slate-600">
                Incentivamos tus proyectos corporativos y compras por volumen con precios especiales en toda nuestra sastrería corporativa:
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-bold tracking-wider">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="block text-slate-500 uppercase">12 - 49 uds</span>
                  <span className="block text-blue-600 text-lg mt-1 font-black">10% OFF</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="block text-slate-500 uppercase">50 - 99 uds</span>
                  <span className="block text-blue-600 text-lg mt-1 font-black">15% OFF</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="block text-slate-500 uppercase">100+ uds</span>
                  <span className="block text-blue-600 text-lg mt-1 font-black">20% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Wizard Form */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-200 p-8 sm:p-10 shadow-2xl relative text-left">
            <h3 className="text-xl font-black border-b border-slate-100 pb-4 mb-8 text-slate-900 flex items-center gap-2">
              <Shirt className="w-6 h-6 text-blue-600" />
              <span>2. Especificación y Datos de Compra</span>
            </h3>

            <form className="space-y-8">
              {/* Row 1: Colors selection & Sizes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Custom Color selection radios */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Color de Confección:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {activeProduct.colors.map((color) => (
                      <button
                        type="button"
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                          selectedColor === color.name
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex-shrink-0 ${selectedColor === color.name ? 'border-white/40' : 'border-slate-200'}`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="line-clamp-1">{color.name}</span>
                        {selectedColor === color.name && (
                          <Check className="w-4 h-4 text-white ml-auto flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size picker chips */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Tallas Disponibles:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProduct.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-2xl font-bold text-sm border flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                          selectedSize === size
                            ? "bg-blue-600 border-blue-600 text-white shadow-md"
                            : "bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <span className="block text-[11px] text-slate-500 leading-relaxed font-medium">
                    * Puedes enviarnos el listado detallado de tallas de tu personal al correo o WhatsApp.
                  </span>
                </div>
              </div>

              {/* Row 2: Quantity counter & Custom Logo details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Quantity adjuster */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Cantidad Requerida (MOQ: 12):
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(quantity - 1)}
                      className="cursor-pointer w-11 h-11 bg-slate-900 border border-slate-850 hover:border-slate-700 hover:text-white rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQtyChange(parseInt(e.target.value) || 12)}
                      className="w-20 h-11 bg-slate-900 border border-slate-800 rounded-xl text-center font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleQtyChange(quantity + 1)}
                      className="cursor-pointer w-11 h-11 bg-slate-900 border border-slate-850 hover:border-slate-700 hover:text-white rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-400 font-medium">Unidades</span>
                  </div>
                  {quantity < 12 && (
                    <div className="flex items-start gap-1 text-[10px] text-blue-500 leading-relaxed font-mono">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>El pedido mínimo comercial sugerido es de 12 unidades por prenda.</span>
                    </div>
                  )}
                </div>

                {/* Embroidery custom details */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Servicio de Bordado Computarizado:
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeEmbroidery}
                        onChange={(e) => setIncludeEmbroidery(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-350 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-white" />
                    </label>
                    <span className="text-xs font-semibold text-slate-300">
                      {includeEmbroidery ? "✓ Agregar Bordado (+$3.50/ud estimación)" : "No incluir bordados"}
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {includeEmbroidery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2 mt-2"
                      >
                        <input
                          type="text"
                          placeholder="Ej: Logo corporativo en pecho izquierdo parte frontal"
                          value={embroideryDetails}
                          onChange={(e) => setEmbroideryDetails(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-300"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Row 3: Buyer info section */}
              <div className="space-y-4 pt-4 border-t border-slate-900/60">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Ingresa tus Datos para Enviar el Presupuesto:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Tu Nombre:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Carlos Mendoza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Teléfono Móvil:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 0414-XXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Correo Corporativo:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ej: compras@empresa.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Comentarios Adicionales o Cantidades por Talla:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Escribe si necesitas modificaciones especiales, combinaciones de colores o condiciones de entrega."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Budget Display Table */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
                    Presupuesto Referencial Estimado
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>
                      Unitario base:{" "}
                      <strong className="text-slate-300">${activeProduct.basePrice.toFixed(2)}</strong>
                    </span>
                    {includeEmbroidery && (
                      <span>
                        Bordado: <strong className="text-slate-300">+$3.50</strong>
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <span className="text-emerald-500">
                        Descuento Mayorista: <strong>-{discountPercentage}%</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="md:col-span-5 text-right flex flex-col justify-end items-end">
                  <div className="text-slate-400 text-xs font-mono">Total de Prendas: {quantity}</div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-blue-500 text-3xl font-extrabold font-mono hover:scale-105 transition-transform duration-200">
                      ${finalSubtotal.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">USD c/ IVA</span>
                  </div>
                  <span className="text-[10px] text-blue-500/85 font-mono">
                    Unitario neto estimado: ${finalUnitPrice.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Actions: Send to Email Form / WhatsApp Trigger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                {/* Submit to commercial team WhatsApp button - core user feature request */}
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="cursor-pointer group flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-550 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-green-500/10 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                  <span>Mandar por WhatsApp</span>
                </button>

                {/* Email submission layout with simulated API */}
                <button
                  type="submit"
                  disabled={isEmailSending}
                  onClick={handleEmailSubmit}
                  className={`cursor-pointer group flex items-center justify-center gap-2 py-4 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 ${
                    isEmailSending
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span>{isEmailSending ? "Enviando Solicitud..." : "Enviar por Correo"}</span>
                </button>
              </div>
            </form>

            {/* Email Success Feedback Overlay Modal */}
            <AnimatePresence>
              {emailSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-slate-950/98 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 z-20 border border-emerald-500/30"
                >
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    ¡Solicitud de Cotización Enviada!
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                    Hemos recibido los datos de diseño de tu uniforme para{" "}
                    <strong className="text-white">{activeProduct.name}</strong>. Nuestro equipo de ventas en PeyBer verificará las existencias de tela y se pondrá en contacto contigo a la brevedad al correo <strong className="text-white">{customerEmail || "[Tu correo]"}</strong>.
                  </p>
                  <button
                    onClick={() => setEmailSuccess(false)}
                    className="py-2.5 px-6 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Entendido / Seguir Diseñando
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
