import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsAppFloatComponent } from './components/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    WhatsAppFloatComponent
  ],
  template: `
    <div class="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-blue-200 selection:text-slate-900 flex flex-col">
      <!-- Prime Navigation Header bar -->
      <app-header></app-header>

      <!-- Main Router Content -->
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- Professional Footer block -->
      <app-footer></app-footer>

      <!-- Pulsing floating WhatsApp interaction bubble -->
      <app-whatsapp-float></app-whatsapp-float>
    </div>
  `
})
export class AppComponent {}
