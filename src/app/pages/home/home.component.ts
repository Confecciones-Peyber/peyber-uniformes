import { Component, ChangeDetectionStrategy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Product } from '../../core/types';
import { PRODUCTS } from '../../core/data';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    CatalogComponent,
    ServicesComponent,
    ContactFormComponent
  ],
  host: {
    '(window:scroll)': 'onWindowScroll()'
  },
  template: `
    <!-- Hero Presentation -->
    <app-hero (scrollToSection)="scrollToSection($event)"></app-hero>

    <!-- Main product catalog -->
    <app-catalog 
      (selectProduct)="setSelectedProduct($event)"
      (scrollToSection)="scrollToSection($event)">
    </app-catalog>

    <!-- Services Overview -->
    <app-services></app-services>

    <!-- Contact information form -->
    <app-contact-form></app-contact-form>
  `
})
export class HomeComponent {
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
      }
    }
  }

  onWindowScroll() {
    // Scroll detection logic can stay here if needed to update a service
    // But since the header is outside, we'll need to handle active section differently
    // For now, we keep it simple.
  }
}
