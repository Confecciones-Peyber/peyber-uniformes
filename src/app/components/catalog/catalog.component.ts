import { Component, ChangeDetectionStrategy, input, output, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideBriefcase, LucideStethoscope, LucideShieldAlert, LucideGraduationCap, LucideTrophy, LucideCheckCircle, LucideArrowRight, LucideSparkles, LucideLayers, LucideChevronRight } from '@lucide/angular';
import { CATEGORIES, PRODUCTS } from '../../core/data';
import { Product, Category } from '../../core/types';

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideBriefcase, LucideStethoscope, LucideShieldAlert, LucideGraduationCap, LucideTrophy, LucideCheckCircle, LucideArrowRight, LucideSparkles, LucideLayers, LucideChevronRight],
  template: `
    <section id="catalog-section" class="py-24 bg-slate-50 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div id="catalog-header" class="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            Catálogo Corporativo
          </span>
          <h2 class="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Nuestras Colecciones de Uniformes
          </h2>
          <p class="text-slate-600 text-base">
            Hechos para resistir jornadas intensas. Selecciona tu sector para ver los modelos y materiales disponibles en nuestro taller textil.
          </p>
        </div>

        <!-- Categories Section Grid -->
        <div id="categories" class="flex flex-wrap justify-center gap-3 mb-12">
          <!-- "All" button -->
          <button
            (click)="selectedCategory.set('all')"
            [class]="'cursor-pointer px-6 py-2.5 rounded-full border text-center transition-all duration-200 flex items-center gap-2 ' + (selectedCategory() === 'all' ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50')"
          >
            <svg lucideLayers class="w-4 h-4 flex-shrink-0"></svg>
            <span class="text-sm font-semibold">Todos</span>
          </button>

          @for (cat of categories; track cat.id) {
            <button
              (click)="selectedCategory.set(cat.id)"
              [class]="'cursor-pointer px-6 py-2.5 rounded-full border text-center transition-all duration-200 flex items-center gap-2 ' + (selectedCategory() === cat.id ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50')"
            >
              <div [class]="selectedCategory() === cat.id ? 'text-white' : 'text-blue-600'">
                @switch (cat.iconName) {
                  @case ('Briefcase') { <svg lucideBriefcase class="w-4 h-4"></svg> }
                  @case ('Stethoscope') { <svg lucideStethoscope class="w-4 h-4"></svg> }
                  @case ('ShieldAlert') { <svg lucideShieldAlert class="w-4 h-4"></svg> }
                  @case ('GraduationCap') { <svg lucideGraduationCap class="w-4 h-4"></svg> }
                  @case ('Trophy') { <svg lucideTrophy class="w-4 h-4"></svg> }
                  @default { <svg lucideLayers class="w-4 h-4"></svg> }
                }
              </div>
              <span class="text-sm font-semibold line-clamp-1">
                {{ cat.name.replace('Línea ', '') }}
              </span>
            </button>
          }
        </div>

        <!-- Selected Category Feature Card -->
        @if (selectedCategory() !== 'all') {
          <div
            class="bg-white rounded-3xl p-6 md:p-8 text-slate-900 mb-12 border border-slate-200 shadow-xl flex flex-col md:flex-row gap-8 items-center animate-in slide-in-from-bottom-4 fade-in duration-300"
          >
            <div class="w-full md:w-1/3 aspect-[16/10] rounded-[1.5rem] overflow-hidden relative shadow-inner">
              <img
                [src]="currentCategory()?.heroImage"
                [alt]="currentCategory()?.name"
                referrerPolicy="no-referrer"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div class="w-full md:w-2/3 space-y-3 text-left">
              <div class="flex items-center gap-2 text-blue-600">
                @switch (currentCategory()?.iconName) {
                  @case ('Briefcase') { <svg lucideBriefcase class="w-6 h-6"></svg> }
                  @case ('Stethoscope') { <svg lucideStethoscope class="w-6 h-6"></svg> }
                  @case ('ShieldAlert') { <svg lucideShieldAlert class="w-6 h-6"></svg> }
                  @case ('GraduationCap') { <svg lucideGraduationCap class="w-6 h-6"></svg> }
                  @case ('Trophy') { <svg lucideTrophy class="w-6 h-6"></svg> }
                  @default { <svg lucideLayers class="w-6 h-6"></svg> }
                }
                <h3 class="text-2xl font-black tracking-tight">
                  {{ currentCategory()?.name }}
                </h3>
              </div>
              <p class="text-slate-600 text-base leading-relaxed">
                {{ currentCategory()?.description }}
              </p>
              <div class="flex flex-wrap gap-4 pt-2 text-sm text-slate-500 font-medium">
                <span>🧵 Confección de alta resistencia</span>
                <span>📍 Bordado computarizado</span>
                <span>🛡️ Telas de alta gama</span>
              </div>
            </div>
          </div>
        }

        <!-- Product Grid -->
        <div id="catalog" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of filteredProducts(); track product.id) {
            <div
              class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left group animate-in zoom-in-95 fade-in duration-300"
            >
              <!-- Image Section -->
              <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  [src]="product.imageUrl"
                  [alt]="product.name"
                  referrerPolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                <!-- Category Pill Tag -->
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 text-xs font-bold rounded-full shadow-sm">
                    {{ getCategoryName(product.category) }}
                  </span>
                </div>

                <!-- Pricing estimation box inside -->
                <div class="absolute bottom-4 right-4">
                  <span class="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                    Desde $\{{ product.basePrice.toFixed(2) }}
                  </span>
                </div>
              </div>

              <!-- Content Section -->
              <div class="p-6 flex-grow flex flex-col justify-between">
                <div class="space-y-4">
                  <div>
                    <h4 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {{ product.name }}
                    </h4>
                    <p class="text-slate-500 text-sm mt-1 font-medium">
                      🧵 Mat: {{ product.materials[0] }}
                    </p>
                  </div>

                  <p class="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {{ product.description }}
                  </p>

                  <!-- Uniform features list -->
                  <div class="space-y-2 pt-3 border-t border-slate-100">
                    @for (feat of product.features.slice(0, 2); track $index) {
                       <div class="flex items-start gap-2 text-sm text-slate-700">
                         <svg lucideCheckCircle class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"></svg>
                         <span class="line-clamp-1">{{ feat }}</span>
                       </div>
                    }
                  </div>

                  <!-- Previews of colors selectable -->
                  <div class="pt-3">
                     <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                       Colores Disponibles
                     </p>
                     <div class="flex gap-2">
                       @for (color of product.colors; track $index) {
                         <div
                           [title]="color.name"
                           class="w-5 h-5 rounded-full border border-slate-200 shadow-sm"
                           [style.backgroundColor]="color.hex"
                         ></div>
                       }
                     </div>
                  </div>
                </div>

                <!-- Actions Section -->
                <div class="pt-6 mt-6 border-t border-slate-100">
                  <button
                    (click)="handleSelectToQuote(product)"
                    class="cursor-pointer w-full group flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-full transition-all duration-200"
                  >
                    <span>Cotizar Modelo</span>
                    <svg lucideChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform"></svg>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class CatalogComponent {
  selectProduct = output<Product>();
  scrollToSection = output<string>();

  categories = CATEGORIES;
  products = PRODUCTS;
  selectedCategory = signal<string>('all');

  currentCategory = computed(() => {
    return this.categories.find(c => c.id === this.selectedCategory());
  });

  filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.products;
    return this.products.filter(p => p.category === cat);
  });

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name.replace('Línea ', '') : '';
  }

  private router = inject(Router);

  handleSelectToQuote(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
}
