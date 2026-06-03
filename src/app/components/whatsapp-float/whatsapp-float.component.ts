import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideMessageCircle, LucideX, LucideSend, LucideShieldCheck } from '@lucide/angular';
import { GENERAL_INFO } from '../../core/data';
import { Product } from '../../core/types';

@Component({
  selector: 'app-whatsapp-float',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideMessageCircle, LucideX, LucideSend, LucideShieldCheck],
  template: `
    <div id="whatsapp-widget" class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <!-- Micro-Chat Popover Box -->
      @if (isOpen()) {
        <div
          class="w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-150 overflow-hidden mb-4 mr-0 sm:mr-2 text-left origin-bottom-right animate-in zoom-in duration-200"
        >
          <!-- Header branding -->
          <div class="bg-gradient-to-r from-green-600 to-emerald-500 p-4 text-white relative">
            <button
              (click)="isOpen.set(false)"
              class="absolute top-3 right-3 text-white/80 hover:text-white bg-black/10 rounded-full p-1 cursor-pointer"
              aria-label="Cerrar chat"
            >
              <svg lucideX class="w-4 h-4"></svg>
            </button>
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                P
              </div>
              <div>
                <h4 class="font-bold text-sm tracking-wide">PeyBer Comercial</h4>
                <div class="flex items-center gap-1.5 text-[10px] text-emerald-100">
                  <span class="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping"></span>
                  <span>En línea • Asesoramiento inmediato</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content chat log -->
          <div class="p-4 space-y-4 max-h-[320px] overflow-y-auto bg-slate-50">
            <div class="bg-slate-100 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 leading-relaxed">
              <span class="font-semibold block text-slate-900 mb-1">PeyBer Asesoría:</span>
              ¡Hola! Bienvenido a PeyBer Uniformes. ¿Cómo podemos ayudarte hoy con el diseño de tus uniformes corporativos, industriales o médicos?
            </div>

            @if (selectedProduct()) {
              <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-[11px] text-slate-700 flex items-center gap-2">
                <span class="p-1 px-1.5 bg-blue-500 text-white font-bold rounded text-[9px] font-mono leading-none">PRENDA</span>
                <span class="line-clamp-1 font-medium">Interés: {{ selectedProduct()?.name }}</span>
              </div>
            }

            <!-- Ready templates selectors -->
            <div class="space-y-2">
              <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Presiona una de nuestras opciones de contacto rápido:
              </span>
              <div class="flex flex-col gap-1.5">
                @for (tpl of getTemplates(); track tpl.id) {
                  <button
                    (click)="handleSendText(tpl.message)"
                    class="cursor-pointer w-full text-left bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between group"
                  >
                    <span class="line-clamp-1">{{ tpl.label }}</span>
                    <svg lucideSend class="w-3.5 h-3.5 text-green-500 opacity-60 group-hover:opacity-100 transition-opacity"></svg>
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Custom text writing submission -->
          <form (ngSubmit)="handleFormSubmit()" class="p-3 border-t border-slate-100 bg-white flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              [(ngModel)]="customText"
              name="customText"
              class="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              class="cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-xl p-2 flex items-center justify-center transition-colors shadow-md active:scale-95"
            >
              <svg lucideSend class="w-4 h-4"></svg>
            </button>
          </form>

          <!-- Footer security badge -->
          <div class="bg-slate-100 px-4 py-1.5 text-center text-[9px] text-slate-400 border-t border-slate-150 flex items-center justify-center gap-1">
            <svg lucideShieldCheck class="w-3.5 h-3.5 text-green-600"></svg>
            <span>Conexión directa segura cifrada a WhatsApp Oficial</span>
          </div>
        </div>
      }

      <!-- Pulsing Floating Button Trigger -->
      <div class="relative">
        <!-- Pulsing beacon radar loop -->
        <span class="absolute inset-0 w-full h-full bg-green-500 rounded-full animate-ping opacity-60 pointer-events-none"></span>

        <button
          (click)="toggleOpen()"
          class="cursor-pointer relative z-10 w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 active:scale-90 group border border-green-400/20"
          id="whatsapp-fab-button"
          aria-label="Abrir WhatsApp PeyBer"
        >
          @if (isOpen()) {
            <svg lucideX class="w-6 h-6 rotate-90"></svg>
          } @else {
            <svg lucideMessageCircle class="w-7 h-7 fill-white/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform"></svg>
          }
        </button>

        <!-- Small badge alerting of selected item -->
        @if (!isOpen() && selectedProduct()) {
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white font-mono animate-bounce shadow">
            1
          </span>
        }
      </div>

    </div>
  `
})
export class WhatsAppFloatComponent {
  selectedProduct = input<Product | null>(null);

  isOpen = signal(false);
  customText = '';

  getTemplates() {
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
      }
    ];

    const prod = this.selectedProduct();
    if (prod) {
      templates.push({
        id: "product",
        label: `🧵 Cotizar: ${prod.name}`,
        message: `¡Hola PeyBer! 👋 Me interesa cotizar un lote del modelo: *${prod.name}* (${prod.category.toUpperCase()}). ¿Podrían darme asesoría sobre colores y precios al mayor?`
      });
    }

    return templates;
  }

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  handleSendText(messageText: string) {
    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${GENERAL_INFO.phoneFormatted}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    this.isOpen.set(false);
  }

  handleFormSubmit() {
    if (this.customText.trim()) {
      this.handleSendText(this.customText.trim());
      this.customText = "";
    }
  }
}
