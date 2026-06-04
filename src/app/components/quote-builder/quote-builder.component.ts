import { Component, ChangeDetectionStrategy, input, output, signal, computed, effect, untracked, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideMessageCircle, LucideMail, LucideShirt, LucideCheck, LucidePlus, LucideMinus, LucideSparkles, LucideInfo } from '@lucide/angular';
import { GENERAL_INFO } from '../../core/data';
import { Product, QuoteRequest } from '../../core/types';
import { CatalogService } from '../../core/catalog.service';

@Component({
  selector: 'app-quote-builder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideMessageCircle, LucideMail, LucideShirt, LucideCheck, LucidePlus, LucideMinus, LucideSparkles, LucideInfo],
  template: `
    <section id="quote-section" class="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <!-- Decorative Blur and grid lines -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100 px-4 py-1.5 rounded-full">
            Presupuesto Inmediato
          </span>
          <h2 class="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Cotizador Digital de Uniformes
          </h2>
          <p class="text-slate-600 text-lg">
            Personaliza tus prendas, calcula descuentos corporativos y envía la solicitud por correo o directamente por WhatsApp.
          </p>
        </div>

        @if (activeProduct()) {
          <!-- Builder Layout Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Column: Uniform Showcase & Selector -->
            <div class="lg:col-span-4 space-y-6">
              <div class="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xl">
                <h3 class="text-sm font-bold tracking-wider text-blue-600 uppercase">
                  1. Selección de Modelo
                </h3>
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Selecciona la prenda a cotizar:
                  </label>
                  <select
                    [ngModel]="activeProductId()"
                    (ngModelChange)="handleProductChange($event)"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer font-medium"
                  >
                    @for (p of products(); track p.id || p._id || '') {
                      <option [value]="p.id || p._id || ''">
                        {{ p.name }} (Ref: $\{{ p.basePrice.toFixed(2) }})
                      </option>
                    }
                  </select>
                </div>

                <!-- Product preview card layout -->
                <div class="rounded-2xl overflow-hidden border border-slate-200 relative aspect-[4/3] bg-slate-100 shadow-inner">
                  <img
                    [src]="activeProduct()!.imageUrl"
                    [alt]="activeProduct()!.name"
                    referrerPolicy="no-referrer"
                    class="w-full h-full object-cover"
                  />
                  
                  <!-- Active category label overlay -->
                  <div class="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold rounded-full text-blue-700 shadow-sm">
                    {{ getCategoryName(activeProduct()!.category) }}
                  </div>
                </div>

                <!-- Brief highlights summary -->
                <div class="space-y-2 text-left pt-2">
                  <h4 class="text-base font-bold text-slate-900">{{ activeProduct()!.name }}</h4>
                  <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {{ activeProduct()!.description }}
                  </p>
                  <div class="text-xs font-medium text-blue-600 pt-1 flex flex-wrap gap-2">
                    <span>💪 Costura reforzada</span>
                    <span>⚡ Calidad PeyBer</span>
                  </div>
                </div>
              </div>

              <!-- Discount info table -->
              <div class="bg-blue-50/50 rounded-3xl border border-blue-100 p-6 space-y-4 text-left shadow-sm">
                <div class="flex items-center gap-2 text-blue-600">
                  <svg lucideSparkles class="w-5 h-5 animate-pulse"></svg>
                  <h4 class="text-sm font-bold tracking-wide uppercase">
                    Escala de Descuentos
                  </h4>
                </div>
                <p class="text-sm text-slate-600">
                  Incentivamos tus proyectos corporativos y compras por volumen con precios especiales en toda nuestra sastrería corporativa:
                </p>
                <div class="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-bold tracking-wider">
                  <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                    <span class="block text-slate-500 uppercase">12 - 49 uds</span>
                    <span class="block text-blue-600 text-lg mt-1 font-black">10% OFF</span>
                  </div>
                  <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                    <span class="block text-slate-500 uppercase">50 - 99 uds</span>
                    <span class="block text-blue-600 text-lg mt-1 font-black">15% OFF</span>
                  </div>
                  <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                    <span class="block text-slate-500 uppercase">100+ uds</span>
                    <span class="block text-blue-600 text-lg mt-1 font-black">20% OFF</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Customization Wizard Form -->
            <div class="lg:col-span-8 bg-white rounded-[2rem] border border-slate-200 p-8 sm:p-10 shadow-2xl relative text-left">
              <h3 class="text-xl font-black border-b border-slate-100 pb-4 mb-8 text-slate-900 flex items-center gap-2">
                <svg lucideShirt class="w-6 h-6 text-blue-600"></svg>
                <span>2. Especificación y Datos de Compra</span>
              </h3>

              <form class="space-y-8" (ngSubmit)="handleEmailSubmit($event)">
                <!-- Row 1: Colors selection & Sizes -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <!-- Custom Color selection radios -->
                  <div class="space-y-4">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Color de Confección:
                    </label>
                    <div class="grid grid-cols-2 gap-3">
                      @for (color of activeProduct()!.colors; track color.name) {
                        <button
                          type="button"
                          (click)="selectedColor.set(color.name)"
                          [class]="'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold border transition-all cursor-pointer shadow-sm hover:shadow-md ' + (selectedColor() === color.name ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50')"
                        >
                          <span
                            [class]="'w-4 h-4 rounded-full border flex-shrink-0 ' + (selectedColor() === color.name ? 'border-white/40' : 'border-slate-200')"
                            [style.backgroundColor]="color.hex"
                          ></span>
                          <span class="line-clamp-1">{{ color.name }}</span>
                          @if (selectedColor() === color.name) {
                            <svg lucideCheck class="w-4 h-4 text-white ml-auto flex-shrink-0"></svg>
                          }
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Size picker chips -->
                  <div class="space-y-4">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Tallas Disponibles:
                    </label>
                    <div class="flex flex-wrap gap-2.5">
                      @for (size of activeProduct()!.sizes; track size) {
                        <button
                          type="button"
                          (click)="selectedSize.set(size)"
                          [class]="'w-12 h-12 rounded-2xl font-bold text-sm border flex items-center justify-center transition-all cursor-pointer shadow-sm ' + (selectedSize() === size ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50')"
                        >
                          {{ size }}
                        </button>
                      }
                    </div>
                    <span class="block text-[11px] text-slate-500 leading-relaxed font-medium">
                      * Puedes enviarnos el listado detallado de tallas de tu personal al correo o WhatsApp.
                    </span>
                  </div>
                </div>

                <!-- Row 2: Quantity counter & Custom Logo details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  <!-- Quantity adjuster -->
                  <div class="space-y-3">
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Cantidad Requerida (MOQ: 12):
                    </label>
                    <div class="flex items-center gap-3">
                      <button
                        type="button"
                        (click)="handleQtyChange(quantity() - 1)"
                        class="cursor-pointer w-11 h-11 bg-slate-900 border border-slate-850 hover:border-slate-700 hover:text-white rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform"
                      >
                        <svg lucideMinus class="w-4 h-4"></svg>
                      </button>
                      <input
                        type="number"
                        [ngModel]="quantity()"
                        (ngModelChange)="handleQtyChange($event)"
                        name="quantity"
                        class="w-20 h-11 bg-slate-900 border border-slate-800 rounded-xl text-center font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
                      />
                      <button
                        type="button"
                        (click)="handleQtyChange(quantity() + 1)"
                        class="cursor-pointer w-11 h-11 bg-slate-900 border border-slate-850 hover:border-slate-700 hover:text-white rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform"
                      >
                        <svg lucidePlus class="w-4 h-4"></svg>
                      </button>
                      <span class="text-xs text-slate-400 font-medium">Unidades</span>
                    </div>
                    @if (quantity() < 12) {
                      <div class="flex items-start gap-1 text-[10px] text-blue-500 leading-relaxed font-mono">
                        <svg lucideInfo class="w-3.5 h-3.5 flex-shrink-0 mt-0.5"></svg>
                        <span>El pedido mínimo comercial sugerido es de 12 unidades por prenda.</span>
                      </div>
                    }
                  </div>

                  <!-- Embroidery custom details -->
                  <div class="space-y-3">
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Servicio de Bordado Computarizado:
                    </label>
                    <div class="flex items-center gap-3">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          [(ngModel)]="includeEmbroidery"
                          name="includeEmbroidery"
                          class="sr-only peer"
                        />
                        <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-350 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-white"></div>
                      </label>
                      <span class="text-xs font-semibold text-slate-300">
                        {{ includeEmbroidery() ? "✓ Agregar Bordado (+$3.50/ud estimación)" : "No incluir bordados" }}
                      </span>
                    </div>
                    
                    @if (includeEmbroidery()) {
                      <div class="space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <input
                          type="text"
                          placeholder="Ej: Logo corporativo en pecho izquierdo parte frontal"
                          [(ngModel)]="embroideryDetails"
                          name="embroideryDetails"
                          class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-300"
                        />
                      </div>
                    }
                  </div>
                </div>

                <!-- Row 3: Buyer info section -->
                <div class="space-y-4 pt-4 border-t border-slate-950/60">
                  <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Ingresa tus Datos para Enviar el Presupuesto:
                  </h4>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="space-y-1.5">
                      <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Tu Nombre:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Carlos Mendoza"
                        [(ngModel)]="customerName"
                        name="customerName"
                        class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Teléfono Móvil:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 0414-XXXXXXX"
                        [(ngModel)]="customerPhone"
                        name="customerPhone"
                        class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                      />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Correo Corporativo:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ej: compras@empresa.com"
                        [(ngModel)]="customerEmail"
                        name="customerEmail"
                        class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Comentarios Adicionales o Cantidades por Talla:
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Escribe si necesitas modificaciones especiales, combinaciones de colores o condiciones de entrega."
                      [(ngModel)]="comments"
                      name="comments"
                      class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                <!-- Dynamic Budget Display Table -->
                <div class="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div class="md:col-span-7 text-left space-y-1">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
                      Presupuesto Referencial Estimado
                    </span>
                    <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>
                        Unitario base: 
                        <strong class="text-slate-300">$\{{ activeProduct()!.basePrice.toFixed(2) }}</strong>
                      </span>
                      @if (includeEmbroidery()) {
                        <span>
                          Bordado: <strong class="text-slate-300">+$3.50</strong>
                        </span>
                      }
                      @if (discountPercentage() > 0) {
                        <span class="text-emerald-500">
                          Descuento Mayorista: <strong>-{{ discountPercentage() }}%</strong>
                        </span>
                      }
                    </div>
                  </div>

                  <div class="md:col-span-5 text-right flex flex-col justify-end items-end">
                    <div class="text-slate-400 text-xs font-mono">Total de Prendas: {{ quantity() }}</div>
                    <div class="flex items-baseline gap-1.5 mt-0.5">
                      <span class="text-blue-500 text-3xl font-extrabold font-mono hover:scale-105 transition-transform duration-200">
                        $\{{ finalSubtotal().toFixed(2) }}
                      </span>
                      <span class="text-[10px] text-slate-500 font-mono">USD c/ IVA</span>
                    </div>
                    <span class="text-[10px] text-blue-500/85 font-mono">
                      Unitario neto estimado: $\{{ finalUnitPrice().toFixed(2) }} USD
                    </span>
                  </div>
                </div>

                <!-- Actions: Send to Email Form / WhatsApp Trigger -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <!-- Submit to WhatsApp -->
                  <button
                    type="button"
                    (click)="handleWhatsAppSubmit()"
                    class="cursor-pointer group flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-500 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-green-500/10 active:scale-95"
                  >
                    <svg lucideMessageCircle class="w-5 h-5 fill-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform"></svg>
                    <span>Mandar por WhatsApp</span>
                  </button>

                  <!-- Email submission -->
                  <button
                    type="submit"
                    [disabled]="isEmailSending()"
                    [class]="'cursor-pointer group flex items-center justify-center gap-2 py-4 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 ' + (isEmailSending() ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20')"
                  >
                    <svg lucideMail class="w-5 h-5"></svg>
                    <span>{{ isEmailSending() ? "Enviando Solicitud..." : "Enviar por Correo" }}</span>
                  </button>
                </div>
              </form>

              <!-- Email Success Feedback Overlay Modal -->
              @if (emailSuccess()) {
                <div
                  class="absolute inset-0 bg-slate-950/98 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 z-20 border border-emerald-500/30 animate-in fade-in duration-300"
                >
                  <div class="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500">
                    <svg lucideCheck class="w-8 h-8"></svg>
                  </div>
                  <h4 class="text-xl font-bold text-white">
                    ¡Solicitud de Cotización Enviada!
                  </h4>
                  <p class="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                    Hemos recibido los datos de diseño de tu uniforme para <strong class="text-white">{{ activeProduct()!.name }}</strong>. Nuestro equipo de ventas en PeyBer verificará las existencias de tela y se pondrá en contacto contigo a la brevedad al correo <strong class="text-white">{{ customerEmail() || "[Tu correo]" }}</strong>.
                  </p>
                  <button
                    (click)="emailSuccess.set(false)"
                    class="py-2.5 px-6 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Entendido / Seguir Diseñando
                  </button>
                </div>
              }

            </div>
          </div>
        } @else {
          <div class="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-md">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-slate-500 font-medium text-sm">Cargando cotizador digital...</p>
          </div>
        }
      </div>
    </section>
  `
})
export class QuoteBuilderComponent implements OnInit {
  selectedProduct = input<Product | null>(null);
  onSelectProduct = output<Product>();

  private catalogService = inject(CatalogService);

  products = signal<Product[]>([]);
  generalInfo = GENERAL_INFO;

  activeProductId = signal<string>('');

  selectedColor = signal<string>('');
  selectedSize = signal<string>('');
  quantity = signal<number>(12);
  includeEmbroidery = signal<boolean>(false);
  embroideryDetails = signal<string>('');
  
  customerName = signal<string>('');
  customerPhone = signal<string>('');
  customerEmail = signal<string>('');
  comments = signal<string>('');

  isEmailSending = signal<boolean>(false);
  emailSuccess = signal<boolean>(false);

  activeProduct = computed(() => {
    const id = this.activeProductId();
    const list = this.products();
    if (list.length === 0) return null;
    return list.find(p => p.id === id || (p as any)._id === id) || list[0];
  });

  unitBasePrice = computed(() => {
    const prod = this.activeProduct();
    if (!prod) return 0;
    const embroideryPrice = this.includeEmbroidery() ? 3.5 : 0;
    return prod.basePrice + embroideryPrice;
  });

  rawSubtotal = computed(() => {
    return this.unitBasePrice() * this.quantity();
  });

  discountPercentage = computed(() => {
    const q = this.quantity();
    if (q >= 12 && q < 50) return 10;
    if (q >= 50 && q < 100) return 15;
    if (q >= 100) return 20;
    return 0;
  });

  finalSubtotal = computed(() => {
    const raw = this.rawSubtotal();
    const discAmount = (raw * this.discountPercentage()) / 100;
    return raw - discAmount;
  });

  finalUnitPrice = computed(() => {
    const q = this.quantity();
    return q > 0 ? this.finalSubtotal() / q : 0;
  });

  constructor() {
    effect(() => {
      const prodInput = this.selectedProduct();
      if (prodInput) {
        untracked(() => {
          this.activeProductId.set(prodInput.id || (prodInput as any)._id);
        });
      }
    });

    effect(() => {
      const prod = this.activeProduct();
      if (prod) {
        untracked(() => {
          this.selectedColor.set(prod.colors[0]?.name || "");
          this.selectedSize.set(prod.sizes[1] || prod.sizes[0] || "");
        });
      }
    });
  }

  ngOnInit() {
    this.catalogService.getProducts().subscribe({
      next: (prods) => {
        const activeProds = prods.filter(p => p.status !== false);
        this.products.set(activeProds);
        if (activeProds.length > 0) {
          const firstId = activeProds[0].id || (activeProds[0] as any)._id;
          this.activeProductId.set(firstId);
        }
      },
      error: (err) => {
        console.error('Error loading products for quote builder:', err);
      }
    });
  }

  handleProductChange(productId: string) {
    this.activeProductId.set(productId);
    const prod = this.products().find(p => p.id === productId || (p as any)._id === productId);
    if (prod) {
      this.onSelectProduct.emit(prod);
    }
  }

  handleQtyChange(val: number) {
    const parsed = Number(val);
    if (!isNaN(parsed) && parsed >= 1) {
      this.quantity.set(parsed);
    }
  }

  getCategoryName(catRef: string | any): string {
    if (typeof catRef === 'object' && catRef !== null) {
      return catRef.name;
    }
    return 'Colección';
  }

  getWhatsAppMessage(): string {
    const prod = this.activeProduct();
    if (!prod) return '';
    const text = `¡Hola Equipo PeyBer! 👋 Me interesa cotizar el siguiente uniforme:

👔 *Artículo:* ${prod.name}
📍 *Categoría:* ${this.getCategoryName(prod.category).toUpperCase()}
🎨 *Color Elegido:* ${this.selectedColor()}
📏 *Talla:* ${this.selectedSize()}
🔢 *Cantidad:* ${this.quantity()} unidades
🧵 *¿Incluye Bordado?:* ${this.includeEmbroidery() ? `Sí (${this.embroideryDetails() || "Logotipo de empresa"})` : "No"}

👤 *Datos de Contacto:*
- Nombre: ${this.customerName() || "[Especificar]"}
- Teléfono: ${this.customerPhone() || "[Especificar]"}
- Correo: ${this.customerEmail() || "[Especificar]"}
${this.comments() ? `\n📝 *Comentarios adicionales:* ${this.comments()}` : ""}

_Enviado desde el Cotizador Digital de PeyBer Uniformes_`;

    return encodeURIComponent(text);
  }

  handleWhatsAppSubmit() {
    if (!this.customerName() || !this.customerPhone() || !this.customerEmail()) {
      alert('Por favor, completa tu Nombre, Teléfono y Correo para enviar la cotización.');
      return;
    }

    const prod = this.activeProduct();
    if (!prod) return;

    const quotePayload: QuoteRequest = {
      product: prod,
      selectedColor: this.selectedColor(),
      selectedSize: this.selectedSize(),
      quantity: this.quantity(),
      includeEmbroidery: this.includeEmbroidery(),
      embroideryDetails: this.embroideryDetails(),
      customerName: this.customerName(),
      customerPhone: this.customerPhone(),
      customerEmail: this.customerEmail(),
      comments: this.comments()
    };

    this.catalogService.submitQuotation(quotePayload).subscribe({
      next: (res) => {
        console.log('Cotización registrada en backend ERP:', res);
        this.openWhatsAppLink();
      },
      error: (err) => {
        console.error('Error registrando cotización:', err);
        this.openWhatsAppLink(); // Abrir de todos modos para que el cliente no se frustre
      }
    });
  }

  private openWhatsAppLink() {
    const whatsappUrl = `https://wa.me/${this.generalInfo.phoneFormatted}?text=${this.getWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
  }

  handleEmailSubmit(e: Event) {
    e.preventDefault();
    
    if (!this.customerName() || !this.customerPhone() || !this.customerEmail()) {
      alert('Por favor, completa tu Nombre, Teléfono y Correo para enviar la cotización.');
      return;
    }

    this.isEmailSending.set(true);

    const prod = this.activeProduct();
    if (!prod) return;

    const quotePayload: QuoteRequest = {
      product: prod,
      selectedColor: this.selectedColor(),
      selectedSize: this.selectedSize(),
      quantity: this.quantity(),
      includeEmbroidery: this.includeEmbroidery(),
      embroideryDetails: this.embroideryDetails(),
      customerName: this.customerName(),
      customerPhone: this.customerPhone(),
      customerEmail: this.customerEmail(),
      comments: this.comments()
    };

    this.catalogService.submitQuotation(quotePayload).subscribe({
      next: (res) => {
        this.isEmailSending.set(false);
        this.emailSuccess.set(true);
        
        setTimeout(() => {
          this.emailSuccess.set(false);
        }, 5000);
      },
      error: (err) => {
        console.error('Error registrando cotización:', err);
        this.isEmailSending.set(false);
        alert('Hubo un error al registrar la cotización en el servidor, intente de nuevo.');
      }
    });
  }
}

