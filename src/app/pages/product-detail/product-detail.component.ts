import { Component, ChangeDetectionStrategy, signal, computed, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideChevronLeft, LucideCheck, LucideMessageCircle, LucideMail, LucideInfo, LucideRuler } from '@lucide/angular';
import { GENERAL_INFO } from '../../core/data';
import { Product } from '../../core/types';
import { CatalogService } from '../../core/catalog.service';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, FormsModule, LucideChevronLeft, LucideCheck, LucideMessageCircle, LucideMail, LucideInfo, LucideRuler],
  template: `
    <div class="max-w-7xl mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-24 animate-in fade-in duration-500">
      
      <!-- Back / Breadcrumb -->
      <button 
        (click)="goBack()" 
        class="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 cursor-pointer font-medium text-sm"
      >
        <svg lucideChevronLeft class="w-4 h-4"></svg>
        Volver al Catálogo
      </button>

      @if (product()) {
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <!-- Left Column: Gallery & Main Image -->
          <div class="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            
            <!-- Thumbnails (Vertical on MD+, Horizontal on Mobile) -->
            <div class="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:w-20 flex-shrink-0">
              @for (img of galleryImages(); track $index) {
                <button
                  (click)="mainImage.set(img)"
                  class="relative w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0"
                  [ngClass]="mainImage() === img ? 'border-blue-600 shadow-md' : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'"
                >
                  <img [src]="img" [alt]="product()!.name" class="w-full h-full object-cover" />
                </button>
              }
            </div>

            <!-- Main Image -->
            <div class="flex-grow aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative">
              <img [src]="mainImage()" [alt]="product()!.name" class="w-full h-full object-cover animate-in zoom-in-95 duration-300" />
            </div>

          </div>

          <!-- Right Column: Product Details & Configurator -->
          <div class="w-full lg:w-1/2 flex flex-col">
            
            <!-- Category Tag -->
            <span class="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
              {{ getCategoryName(product()!.category) }}
            </span>

            <!-- Title & Price -->
            <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              {{ product()!.name }}
            </h1>
            <div class="text-2xl font-bold text-slate-900 mb-6">
              Desde $\{{ product()!.basePrice.toFixed(2) }}
            </div>

            <!-- Description -->
            <p class="text-slate-600 mb-8 leading-relaxed">
              {{ product()!.description }}
            </p>

            <hr class="border-slate-200 mb-8" />

            <!-- Colors -->
            @if (product()!.colors && product()!.colors.length > 0) {
              <div class="mb-8">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-900">Color: <span class="font-normal text-slate-600 ml-1">{{ selectedColor()?.name || 'Selecciona un color' }}</span></span>
                </div>
                <div class="flex flex-wrap gap-3">
                  @for (color of product()!.colors; track color.hex) {
                    <button
                      (click)="selectedColor.set(color)"
                      class="relative w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-sm flex items-center justify-center"
                      [ngClass]="selectedColor() === color ? 'border-blue-600' : 'border-transparent ring-1 ring-slate-200'"
                      [style.backgroundColor]="color.hex"
                      [title]="color.name"
                    >
                      @if (selectedColor() === color) {
                        <svg lucideCheck class="w-5 h-5 text-white drop-shadow-md mix-blend-difference"></svg>
                      }
                    </button>
                  }
                </div>
              </div>
            }

            <!-- Sizes -->
            @if (product()!.sizes && product()!.sizes.length > 0) {
              <div class="mb-8">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-900">Talla: <span class="font-normal text-slate-600 ml-1">{{ selectedSize() || 'Selecciona una talla' }}</span></span>
                  <button class="text-xs font-semibold text-blue-600 underline flex items-center gap-1 cursor-pointer">
                    <svg lucideRuler class="w-3.5 h-3.5"></svg> Guía de tallas
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  @for (size of product()!.sizes; track size) {
                    <button
                      (click)="selectedSize.set(size)"
                      class="min-w-[3rem] px-3 py-2 border rounded-lg text-sm font-semibold transition-all cursor-pointer"
                      [ngClass]="selectedSize() === size ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:border-slate-400'"
                    >
                      {{ size }}
                    </button>
                  }
                </div>
              </div>
            }

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                (click)="sendWhatsApp()"
                class="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full transition-transform active:scale-95 shadow-lg shadow-green-500/30 cursor-pointer"
              >
                <svg lucideMessageCircle class="w-5 h-5"></svg>
                Cotizar por WhatsApp
              </button>
              <button 
                (click)="sendEmail()"
                class="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-full transition-transform active:scale-95 shadow-lg shadow-slate-900/20 cursor-pointer"
              >
                <svg lucideMail class="w-5 h-5"></svg>
                Enviar por Correo
              </button>
            </div>

          </div>
        </div>

        <!-- Features/Materials Tabs (Optional additional info) -->
        <div class="mt-24 pt-12 border-t border-slate-200 grid md:grid-cols-2 gap-12">
           @if (product()!.features && product()!.features.length > 0) {
             <div>
               <h3 class="text-lg font-bold mb-4 flex items-center gap-2"><svg lucideInfo class="w-5 h-5 text-blue-600"></svg> Detalles de Confección</h3>
               <ul class="space-y-3">
                 @for (feat of product()!.features; track feat) {
                   <li class="flex items-start gap-2 text-slate-600 text-sm">
                     <svg lucideCheck class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"></svg>
                     <span>{{ feat }}</span>
                   </li>
                 }
               </ul>
             </div>
           }
           @if (product()!.materials && product()!.materials.length > 0) {
             <div>
               <h3 class="text-lg font-bold mb-4 flex items-center gap-2"><svg lucideInfo class="w-5 h-5 text-blue-600"></svg> Materiales</h3>
               <div class="flex flex-wrap gap-2">
                 @for (mat of product()!.materials; track mat) {
                   <span class="px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-700 font-medium border border-slate-200">{{ mat }}</span>
                 }
               </div>
             </div>
           }
        </div>
      } @else {
        <div class="text-center py-32">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Producto no encontrado o cargando...</h2>
          <button (click)="goBack()" class="text-blue-600 hover:underline font-medium cursor-pointer">Volver al catálogo</button>
        </div>
      }
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogService = inject(CatalogService);

  product = signal<Product | undefined>(undefined);
  
  galleryImages = computed(() => {
    const p = this.product();
    if (!p) return [];
    const list = [];
    if (p.imageUrl) list.push(p.imageUrl);
    if (p.gallery && p.gallery.length > 0) {
      list.push(...p.gallery);
    }
    // Si no hay galería, retornar al menos la principal repetida para simular thumbnails
    if (list.length === 1) {
      list.push(p.imageUrl, p.imageUrl);
    }
    return list;
  });

  mainImage = signal<string>('');
  
  selectedColor = signal<{name: string, hex: string} | null>(null);
  selectedSize = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.catalogService.getProducts().subscribe({
          next: (prods) => {
            const found = prods.find(p => p.id === id || (p as any)._id === id);
            this.product.set(found);
            if (found) {
              this.mainImage.set(found.imageUrl);
              if (found.colors && found.colors.length > 0) this.selectedColor.set(found.colors[0]);
              if (found.sizes && found.sizes.length > 0) this.selectedSize.set(found.sizes[0]);
            }
          },
          error: (err) => {
            console.error('Error loading product details:', err);
          }
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/'], { fragment: 'catalog-section' });
  }

  getCategoryName(catRef: string | any): string {
    if (typeof catRef === 'object' && catRef !== null) {
      return catRef.name;
    }
    return 'Colección';
  }

  getQuoteMessage(): string {
    const p = this.product();
    if (!p) return '';
    
    let msg = `¡Hola PeyBer! 👋 Me interesa cotizar el modelo: *${p.name}*\n\n`;
    msg += `Detalles de mi interés:\n`;
    if (this.selectedSize()) msg += `- Talla: ${this.selectedSize()}\n`;
    if (this.selectedColor()) msg += `- Color: ${this.selectedColor()?.name}\n\n`;
    msg += `¿Podrían ayudarme con precios y disponibilidad?`;
    
    return msg;
  }

  sendWhatsApp() {
    const text = encodeURIComponent(this.getQuoteMessage());
    window.open(`https://wa.me/${GENERAL_INFO.phoneFormatted}?text=${text}`, '_blank');
  }

  sendEmail() {
    const subject = encodeURIComponent(`Cotización: ${this.product()?.name}`);
    const body = encodeURIComponent(this.getQuoteMessage());
    window.open(`mailto:${GENERAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  }
}

