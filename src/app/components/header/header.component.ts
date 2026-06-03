import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideMenu, LucideX, LucideMessageCircle } from '@lucide/angular';
import { GENERAL_INFO } from '../../core/data';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideMenu, LucideX, LucideMessageCircle],
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
  template: `
    <header
      id="main-header"
      [class]="'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ' + (isScrolled() ? 'border-b border-slate-200 shadow-sm py-2' : 'border-b border-transparent py-3')"
    >
      <div class="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <!-- Brand Logo -->
        <button
          (click)="handleItemClick('hero')"
          class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white rounded-lg p-1 group cursor-pointer"
          id="logo-brand"
        >
          <img src="/logo.svg?v=5" alt="PeyBer Uniformes" class="h-10 md:h-12 lg:h-16 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300" />
        </button>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8">
          @for (item of menuItems; track item.id) {
            <button
              (click)="handleItemClick(item.id)"
              [class]="'text-sm font-medium tracking-wide transition-colors relative py-2 cursor-pointer ' + (activeSection() === item.id ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900')"
            >
              {{ item.label }}
              @if (activeSection() === item.id) {
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-md"></div>
              }
            </button>
          }
        </nav>

        <!-- CTA Actions -->
        <div class="hidden md:flex items-center gap-4">
          <a
            [href]="generalInfo.instagram"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 hover:text-pink-700 focus:ring-2 focus:ring-pink-500 focus:outline-none rounded-full transition-colors duration-200 border border-pink-100"
            title="Síguenos en Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span>Instagram</span>
          </a>
          <button
            (click)="handleItemClick('contact')"
            class="cursor-pointer flex items-center gap-1.5 px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-full transition-colors duration-200"
          >
            <span>Contáctanos</span>
          </button>
        </div>

        <!-- Mobile menu trigger -->
        <button
          (click)="toggleMobileMenu()"
          class="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-lg cursor-pointer"
          aria-label="Abrir menú"
        >
          @if (isMobileMenuOpen()) {
            <svg lucideX class="w-6 h-6"></svg>
          } @else {
            <svg lucideMenu class="w-6 h-6"></svg>
          }
        </button>
      </div>

      <!-- Mobile Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-xl origin-top animate-in slide-in-from-top-2 fade-in duration-200">
          <nav class="flex flex-col space-y-3">
            @for (item of menuItems; track item.id) {
              <button
                (click)="handleItemClick(item.id)"
                [class]="'text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ' + (activeSection() === item.id ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')"
              >
                {{ item.label }}
              </button>
            }
          </nav>
          <div class="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <button
              (click)="handleItemClick('contact')"
              class="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors cursor-pointer"
            >
              Contáctanos
            </button>
            <div class="flex gap-2">
              <a
                [href]="'https://wa.me/' + generalInfo.phoneFormatted"
                target="_blank"
                rel="noreferrer"
                class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-full"
              >
                <svg lucideMessageCircle class="w-4 h-4 text-green-500"></svg>
                <span>Asesor</span>
              </a>
              <a
                [href]="generalInfo.instagram"
                target="_blank"
                rel="noreferrer"
                class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-pink-50 hover:text-pink-600 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal<string>('hero');

  generalInfo = GENERAL_INFO;

  menuItems = [
    { id: "hero", label: "Inicio" },
    { id: "catalog-section", label: "Catálogo" },
    { id: "services-section", label: "Servicios" },
    { id: "contact", label: "Contacto" }
  ];

  constructor(private router: Router) {}

  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  handleItemClick(id: string) {
    this.router.navigate(['/'], { fragment: id });
    this.isMobileMenuOpen.set(false);
  }
}


