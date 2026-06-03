import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideMail, LucidePhone, LucideMapPin, LucideClock, LucideSend, LucideCheck, LucideFileSpreadsheet } from '@lucide/angular';
import { GENERAL_INFO } from '../../core/data';

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideMail, LucidePhone, LucideMapPin, LucideClock, LucideSend, LucideCheck, LucideFileSpreadsheet],
  template: `
    <section id="contact" class="pt-12 pb-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono bg-blue-500/10 px-3 py-1 rounded-full">
            Centro de Soporte
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Hablemos de tus Uniformes
          </h2>
          <p class="text-slate-600 text-base">
            Envía tus especificaciones técnicas, solicita cotizaciones por volumen o coordina una visita de nuestros asesores comerciales a tus oficinas.
          </p>
        </div>

        <!-- Contact Grid Section -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <!-- Info Card Block (Left Side) -->
          <div class="lg:col-span-4 bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none"></div>
            
            <div class="space-y-8 relative z-10 text-left">
              <div>
                <h3 class="text-xl font-bold tracking-tight">Atención Corporativa</h3>
                <p class="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  PeyBer Uniformes cuenta con un centro de diseño y costura capacitado para grandes producciones. Contáctanos por cualquiera de nuestras vías directas.
                </p>
              </div>

              <!-- Info details -->
              <div class="space-y-5 text-sm">
                <div class="flex items-start gap-3">
                  <div class="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <svg lucidePhone class="w-4 h-4"></svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Teléfono Directo</span>
                    <a [href]="'tel:' + generalInfo.phone" class="text-white hover:text-blue-500 font-semibold font-mono text-sm mt-0.5 block">
                      {{ generalInfo.phone }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <svg lucideMail class="w-4 h-4"></svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Correo Electrónico</span>
                    <a [href]="'mailto:' + generalInfo.email" class="text-white hover:text-blue-500 font-semibold font-mono text-sm mt-0.5 block">
                      {{ generalInfo.email }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <svg lucideMapPin class="w-4 h-4"></svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Planta y Oficinas</span>
                    <p class="text-slate-300 font-medium text-xs sm:text-sm mt-0.5 leading-relaxed">
                      {{ generalInfo.address }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2.5 bg-slate-850 border border-slate-800 rounded-xl text-blue-500">
                    <svg lucideClock class="w-4 h-4"></svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Horario Laboral</span>
                    <p class="text-slate-300 font-medium text-xs sm:text-sm mt-0.5">
                      {{ generalInfo.hours }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quality badges in side -->
            <div class="pt-8 border-t border-slate-800 text-left relative z-10 hidden lg:block">
              <span class="text-[10px] font-bold font-mono text-blue-500 uppercase tracking-widest block mb-1">
                Garantía PeyBer
              </span>
              <p class="text-[11px] text-slate-400 leading-relaxed">
                Cada pedido incluye revisión de muestras pre-producción para asegurar la conformidad de telas, tallas y bordado institucional.
              </p>
            </div>
          </div>

          <!-- Elegant Interactive Contact Form (Right Side) -->
          <div class="lg:col-span-8 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-left relative shadow-sm">
            
            @if (!success()) {
              <form
                (ngSubmit)="handleSubmit($event)"
                class="space-y-6 animate-in fade-in duration-300"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Tu Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Sofía Rodriguez"
                      [(ngModel)]="name"
                      name="name"
                      class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Empresa / Organización
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Clínica Lara C.A."
                      [(ngModel)]="company"
                      name="company"
                      class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Correo de Contacto *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ej: srodriguez@empresa.com"
                      [(ngModel)]="email"
                      name="email"
                      class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium font-mono"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Teléfono Móvil
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej: 0414-XXXXXXX"
                      [(ngModel)]="phone"
                      name="phone"
                      class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium font-mono"
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Asunto de Consulta
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    @for (sub of subjects; track sub) {
                      <button
                        type="button"
                        (click)="subject.set(sub)"
                        [class]="'cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ' + (subject() === sub ? 'bg-slate-900 border-slate-900 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100')"
                      >
                        {{ sub }}
                      </button>
                    }
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Detalles de tu Requerimiento *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Indícanos cuántas prendas necesitas, si vas a requerir bordados institucionales, colores corporativos y rangos de entrega estimados."
                    [(ngModel)]="message"
                    name="message"
                    class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  ></textarea>
                </div>

                <div class="pt-2">
                  <button
                    type="submit"
                    [disabled]="isSubmitting()"
                    [class]="'cursor-pointer w-full group flex items-center justify-center gap-2 py-4 font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md active:scale-95 ' + (isSubmitting() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20')"
                  >
                    <svg lucideSend class="w-4 h-4"></svg>
                    <span>{{ isSubmitting() ? "Enviando mensaje..." : "Enviar Formulario" }}</span>
                  </button>
                </div>
              </form>
            } @else {
              <div
                class="py-12 flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95 fade-in duration-300"
              >
                <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-300">
                  <svg lucideCheck class="w-8 h-8"></svg>
                </div>
                <div class="space-y-2">
                  <h3 class="text-2xl font-bold text-slate-950">¡Mensaje Recibido, muchas gracias!</h3>
                  <p class="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Tus especificaciones han sido almacenadas con éxito en nuestro sistema de backend. El equipo comercial de <strong class="text-slate-900">PeyBer Uniformes</strong> se pondrá en contacto contigo telefónicamente o por correo electrónico dentro de las próximas 24 horas hábiles.
                  </p>
                </div>

                <div class="p-4 bg-slate-100 rounded-xl text-left border border-slate-200 max-w-sm w-full font-mono text-[10px] text-slate-600 flex items-start gap-2.5">
                  <svg lucideFileSpreadsheet class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"></svg>
                  <div>
                    <span class="font-bold text-slate-800 block">Detalle de registro:</span>
                    <span>ID-CONTACT: PEY-{{ randomId }}</span>
                    <span class="block mt-0.5">Asunto: {{ subject() }}</span>
                  </div>
                </div>

                <button
                  (click)="resetForm()"
                  class="cursor-pointer py-2 px-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 rounded-xl text-xs font-semibold"
                >
                  Enviar otro Mensaje
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactFormComponent {
  name = '';
  company = '';
  email = '';
  phone = '';
  subject = signal('Cotización Corporativa');
  message = '';

  isSubmitting = signal(false);
  success = signal(false);
  randomId = (Math.random() * 10000).toFixed(0);

  subjects = ["Cotización Grupal", "Visita de Asesor", "Dudas de Fabricación"];
  generalInfo = GENERAL_INFO;

  handleSubmit(e: Event) {
    e.preventDefault();
    this.isSubmitting.set(true);

    // Simulate Nest + Mongo API endpoint post
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.success.set(true);
      this.randomId = (Math.random() * 10000).toFixed(0);
    }, 1500);
  }

  resetForm() {
    this.success.set(false);
    this.name = '';
    this.company = '';
    this.email = '';
    this.phone = '';
    this.message = '';
    this.subject.set('Cotización Corporativa');
  }
}
