import { Component, ChangeDetectionStrategy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { QuoteBuilderComponent } from './components/quote-builder/quote-builder.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsAppFloatComponent } from './components/whatsapp-float/whatsapp-float.component';
import { Product } from './core/types';
import { PRODUCTS } from './core/data';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    CatalogComponent,
    QuoteBuilderComponent,
    ContactFormComponent,
    FooterComponent,
    WhatsAppFloatComponent
  ],
  host: {
    '(window:scroll)': 'onWindowScroll()'
  },
  template: `
    <div class="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-blue-200 selection:text-slate-900">
      <!-- Prime Navigation Header bar -->
      <app-header 
        [activeSection]="activeSection()" 
        (navigate)="scrollToSection($event)">
      </app-header>

      <!-- Hero Presentation -->
      <app-hero (scrollToSection)="scrollToSection($event)"></app-hero>

      <!-- Main product catalog -->
      <app-catalog 
        (selectProduct)="setSelectedProduct($event)"
        (scrollToSection)="scrollToSection($event)">
      </app-catalog>

      <!-- Custom Quote Builder -->
      <app-quote-builder 
        [selectedProduct]="selectedProduct()"
        (onSelectProduct)="setSelectedProduct($event)">
      </app-quote-builder>

      <!-- Contact information form -->
      <app-contact-form></app-contact-form>

      <!-- Professional Footer block -->
      <app-footer (onNavigate)="scrollToSection($event)"></app-footer>

      <!-- Pulsing floating WhatsApp interaction bubble -->
      <app-whatsapp-float [selectedProduct]="selectedProduct()"></app-whatsapp-float>
    </div>
  `
})
export class AppComponent {
  activeSection = signal<string>('hero');
  selectedProduct = signal<Product | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (PRODUCTS.length > 0 && !this.selectedProduct()) {
      this.selectedProduct.set(PRODUCTS[0]);
    }
  }

  setSelectedProduct(prod: Product) {
    this.selectedProduct.set(prod);
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        this.activeSection.set(sectionId);
      }
    }
  }

  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const sections = ['hero', 'categories', 'catalog', 'quote-section', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset for sticky navigation

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            this.activeSection.set(sectionId);
            break;
          }
        }
      }
    }
  }
}
