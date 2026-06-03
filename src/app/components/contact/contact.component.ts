import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contacto" class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <!-- Left Column: Corporate Info -->
          <div class="lg:col-span-5">
            <span class="text-brand-emerald font-semibold uppercase tracking-widest text-xs">Ponte en Contacto</span>
            <h2 class="font-display font-bold text-3xl md:text-5xl text-brand-navy mt-3 mb-6">
              ¿Listo para vestir a tu equipo?
            </h2>
            <p class="text-slate-500 font-light leading-relaxed mb-8">
              Contáctanos hoy mismo para obtener cotizaciones corporativas, solicitar muestras físicas de telas o contratar nuestros servicios industriales de bordado y ojalado. Eduardo Hernández y nuestro equipo te atenderán con la mayor brevedad.
            </p>

            <!-- Info Items -->
            <div class="space-y-6">
              
              <!-- Owner/Representative -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-brand-navy text-sm">Representante de Ventas</h4>
                  <p class="text-slate-500 text-sm">Eduardo Hernández</p>
                </div>
              </div>

              <!-- Phone -->
              <a 
                href="https://wa.me/5804145082446" 
                target="_blank"
                rel="noopener"
                class="flex items-center gap-4 group cursor-pointer focus:outline-none"
              >
                <div class="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.14.67 4.13 1.81 5.77L2 22l4.39-1.42a9.92 9.92 0 005.61 1.42c5.49 0 9.986-4.5 9.986-10S17.495 2 12.004 2zm0 1.8c4.52 0 8.18 3.66 8.18 8.2s-3.66 8.2-8.18 8.2c-1.85 0-3.55-.61-4.93-1.65l-.35-.26-2.58.84.85-2.5-.29-.38a8.15 8.15 0 01-1.39-4.71c0-4.53 3.66-8.2 8.18-8.2zm-1.85 3.32c-.22 0-.46.06-.68.17-.22.11-.47.3-.65.51-.43.51-.55 1.15-.55 1.76 0 .89.41 1.83.91 2.49 1.15 1.51 2.87 2.76 4.69 3.49.52.21 1.05.35 1.57.35.48 0 .9-.06 1.25-.23.47-.23.86-.64.97-1.16.12-.52-.08-1.03-.23-1.22-.15-.19-.44-.3-.91-.53-.47-.23-2.18-1.07-2.39-1.15-.21-.08-.47-.04-.67.22-.24.32-.67.89-.83 1.03-.16.14-.38.16-.68.04-.65-.26-1.45-.71-2.02-1.29-.57-.58-1.01-1.36-1.23-2.02-.12-.3-.02-.53.1-.68.11-.15.34-.47.51-.68.17-.21.23-.42.34-.63.11-.21.04-.47-.04-.68-.08-.21-.76-1.83-.93-2.22-.17-.38-.43-.33-.68-.33z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-brand-navy text-sm group-hover:text-brand-emerald transition-colors">WhatsApp Directo</h4>
                  <p class="text-slate-500 text-sm font-mono">+58 0414-5082446</p>
                </div>
              </a>

              <!-- Email -->
              <a 
                href="mailto:confeccionespeyber@gmail.com" 
                class="flex items-center gap-4 group cursor-pointer focus:outline-none"
              >
                <div class="w-12 h-12 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0 group-hover:bg-brand-emerald group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-brand-navy text-sm group-hover:text-brand-emerald transition-colors">Correo Corporativo</h4>
                  <p class="text-slate-500 text-sm font-mono">confeccionespeyber&#64;gmail.com</p>
                </div>
              </a>

            </div>
          </div>

          <!-- Right Column: Glassmorphism Contact Form -->
          <div class="lg:col-span-7">
            <div class="glass-card p-8 md:p-10 rounded-3xl border border-slate-200/40 relative">
              
              @if (isSubmitted()) {
                <!-- Success State -->
                <div class="text-center py-10 animate-scale-up">
                  <div class="w-20 h-20 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-10 h-10">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 class="font-display font-bold text-2xl text-brand-navy mb-3">¡Consulta Recibida!</h3>
                  <p class="text-slate-500 max-w-md mx-auto text-sm leading-relaxed mb-6">
                    Muchas gracias, <strong>{{ formData.name }}</strong>. Hemos recibido tu solicitud de interés para <em>{{ getServiceLabel(formData.service) }}</em>. Nos pondremos en contacto contigo en breve a través del correo <strong>{{ formData.email }}</strong>.
                  </p>
                  <button 
                    (click)="resetForm()"
                    class="bg-brand-navy text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-brand-navy-light"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              } @else {
                <!-- Form State -->
                <form (submit)="onSubmit($event)" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        id="name" 
                        [(ngModel)]="formData.name" 
                        name="name"
                        required
                        placeholder="Ej. Juan Pérez"
                        class="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label for="company" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Clínica / Institución</label>
                      <input 
                        type="text" 
                        id="company" 
                        [(ngModel)]="formData.company" 
                        name="company"
                        placeholder="Ej. Hospital Central"
                        class="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Correo de Contacto</label>
                      <input 
                        type="email" 
                        id="email" 
                        [(ngModel)]="formData.email" 
                        name="email"
                        required
                        placeholder="ejemplo@dominio.com"
                        class="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label for="phone" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Teléfono Celular</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        [(ngModel)]="formData.phone" 
                        name="phone"
                        required
                        placeholder="Ej. 0414-1234567"
                        class="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="service" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Servicio Requerido</label>
                    <select 
                      id="service" 
                      [(ngModel)]="formData.service" 
                      name="service"
                      class="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald text-sm text-slate-600 transition-all cursor-pointer"
                    >
                      <option value="confeccion">Servicio de Confección de Uniformes</option>
                      <option value="bordado">Servicio de Bordado Computarizado</option>
                      <option value="ojal-boton">Servicio de Ojal y Botón</option>
                      <option value="estampado">Servicio de Estampado y Serigrafía</option>
                      <option value="compra">Compra Directa de Productos</option>
                    </select>
                  </div>

                  <div>
                    <label for="message" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Detalles del Requerimiento</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      [(ngModel)]="formData.message" 
                      name="message"
                      required
                      placeholder="Descríbenos tallas, cantidades de uniformes o detalles adicionales para agilizar la cotización..."
                      class="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald text-sm transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    class="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-semibold py-4 rounded-xl shadow-premium transition-all duration-200 hover:translate-y-[-1px]"
                  >
                    Enviar Solicitud
                  </button>
                </form>
              }

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- Footer Area -->
    <footer class="bg-brand-navy text-white py-16 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <!-- Company & Logo -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="PeyBer Logo" class="h-9 w-auto brightness-0 invert" />
              <span class="font-display font-bold text-2xl tracking-wide">
                Pey<span class="text-brand-emerald">Ber</span>
              </span>
            </div>
            <p class="text-slate-400 text-sm font-light max-w-sm leading-relaxed mb-6">
              Fabricantes y distribuidores mayoristas de indumentaria profesional médica e industrial. Diseños ergonómicos con la más alta durabilidad textil.
            </p>
            <p class="text-slate-500 text-xs font-light">
              &copy; {{ currentYear }} PeyBer. Todos los derechos reservados.
            </p>
          </div>

          <!-- Quick Navigation -->
          <div>
            <h4 class="font-display font-semibold text-sm uppercase tracking-wider mb-6 text-brand-emerald">Enlaces Rápidos</h4>
            <ul class="space-y-3">
              <li><a href="#inicio" class="text-slate-400 hover:text-white text-sm font-light transition-colors">Inicio</a></li>
              <li><a href="#productos" class="text-slate-400 hover:text-white text-sm font-light transition-colors">Catálogo de Productos</a></li>
              <li><a href="#servicios" class="text-slate-400 hover:text-white text-sm font-light transition-colors">Servicios Textiles</a></li>
              <li><a href="#contacto" class="text-slate-400 hover:text-white text-sm font-light transition-colors">Contacto</a></li>
            </ul>
          </div>

          <!-- Representative Details -->
          <div>
            <h4 class="font-display font-semibold text-sm uppercase tracking-wider mb-6 text-brand-emerald">Atención al Cliente</h4>
            <address class="not-italic space-y-3 text-slate-400 text-sm font-light">
              <p class="font-semibold text-white">Eduardo Hernández</p>
              <p>Telf: +58 0414-5082446</p>
              <p>confeccionespeyber&#64;gmail.com</p>
              <p class="text-xs text-slate-500 mt-2">Barquisimeto, Venezuela</p>
            </address>
          </div>

        </div>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }
    
    @keyframes scaleUp {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    .animate-scale-up {
      animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  `
})
export class ContactComponent {
  protected readonly isSubmitted = signal(false);
  protected readonly currentYear = new Date().getFullYear();

  protected formData = {
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'confeccion',
    message: ''
  };

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formData.name && this.formData.email && this.formData.phone && this.formData.message) {
      this.isSubmitted.set(true);
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: 'confeccion',
      message: ''
    };
    this.isSubmitted.set(false);
  }

  getServiceLabel(value: string): string {
    switch (value) {
      case 'confeccion': return 'Servicio de Confección de Uniformes';
      case 'bordado': return 'Servicio de Bordado Computarizado';
      case 'ojal-boton': return 'Servicio de Ojal y Botón';
      case 'estampado': return 'Servicio de Estampado y Serigrafía';
      case 'compra': return 'Compra Directa de Productos';
      default: return 'Consulta General';
    }
  }
}
