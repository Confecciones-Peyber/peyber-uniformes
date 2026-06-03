import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { LucidePhone, LucideMail, LucideMapPin, LucideClock, LucideAward } from '@lucide/angular';
import { GENERAL_INFO } from '../../core/data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucidePhone, LucideMail, LucideMapPin, LucideClock, LucideAward],
  template: `
    <footer id="main-footer" class="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        
        <!-- Brand details Column -->
        <div class="md:col-span-5 space-y-4">
          <div class="flex items-center gap-2">
            <img src="/logo.svg?v=5" alt="PeyBer Uniformes" class="h-10 md:h-12 lg:h-16 w-auto object-contain brightness-0 invert drop-shadow-sm transition-transform hover:scale-105 duration-300" />
          </div>
          <p class="text-xs text-slate-400 leading-relaxed max-w-sm text-left">
            {{ generalInfo.companyDescription }} Liderando el mercado de ropa de trabajo en el centroccidente del país.
          </p>
          <div class="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <svg lucideAward class="w-4 h-4 text-blue-500"></svg>
            <span>Telas certificadas con garantía anti-pilling</span>
          </div>
          <!-- Social Media -->
          <div class="flex items-center gap-3">
            <a [href]="generalInfo.instagram" target="_blank" rel="noreferrer" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-all duration-300" title="Síguenos en Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Nav links -->
        <div class="md:col-span-3 text-left space-y-4">
          <h4 class="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Explorar Catálogo
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <button (click)="onNavigate.emit('catalog')" class="hover:text-blue-400 cursor-pointer transition-colors text-left w-full">
                Línea Administrativa / Sastrería
              </button>
            </li>
            <li>
              <button (click)="onNavigate.emit('catalog')" class="hover:text-blue-400 cursor-pointer transition-colors text-left w-full">
                Línea Hospitalaria / Scrubs
              </button>
            </li>
            <li>
              <button (click)="onNavigate.emit('catalog')" class="hover:text-blue-400 cursor-pointer transition-colors text-left w-full">
                Línea Industrial y de Seguridad
              </button>
            </li>
            <li>
              <button (click)="onNavigate.emit('catalog')" class="hover:text-blue-400 cursor-pointer transition-colors text-left w-full">
                Línea Escolar y Polos
              </button>
            </li>
            <li>
              <button (click)="onNavigate.emit('catalog')" class="hover:text-blue-400 cursor-pointer transition-colors text-left w-full">
                Línea Deportiva Sublimada
              </button>
            </li>
          </ul>
        </div>

        <!-- Direct Contact column -->
        <div class="md:col-span-4 text-left space-y-4">
          <h4 class="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Atención al Cliente
          </h4>
          <ul class="space-y-3 text-xs text-slate-400">
            <li class="flex items-start gap-2">
              <svg lucidePhone class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"></svg>
              <span>
                Teléfono: 
                <a [href]="'tel:' + generalInfo.phone" class="hover:text-white font-mono font-medium">
                  {{ generalInfo.phone }}
                </a>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <svg lucideMail class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"></svg>
              <span>
                Correo: 
                <a [href]="'mailto:' + generalInfo.email" class="hover:text-white font-mono">
                  {{ generalInfo.email }}
                </a>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <svg lucideMapPin class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"></svg>
              <span class="leading-relaxed">{{ generalInfo.address }}</span>
            </li>
            <li class="flex items-start gap-2">
              <svg lucideClock class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"></svg>
              <span>{{ generalInfo.hours }}</span>
            </li>
            <li class="pt-4">
              <a [href]="generalInfo.instagram" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 rounded-full shadow-sm transition-opacity" title="Síguenos en Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>Síguenos en Instagram</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Copy info bar -->
      <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          © {{ year }} <strong>{{ generalInfo.companyName }}</strong>. Todos los derechos reservados. Barquisimeto, Venezuela.
        </div>
        <div class="flex gap-4">
          <button (click)="onNavigate.emit('hero')" class="hover:text-slate-300 cursor-pointer">
            Volver Arriba ↑
          </button>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  onNavigate = output<string>();
  
  generalInfo = GENERAL_INFO;
  year = new Date().getFullYear();
}


