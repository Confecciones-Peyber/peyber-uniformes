import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LucideCircleDot, LucideScissors, LucideShirt, LucidePalette, LucideCheckCircle2 } from '@lucide/angular';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideCircleDot, LucideScissors, LucideShirt, LucidePalette, LucideCheckCircle2],
  template: `
    <section id="services-section" class="pt-24 pb-12 bg-white relative overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">Lo que hacemos</span>
          <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Nuestros <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Servicios</span>
          </h2>
          <p class="text-lg text-slate-600 leading-relaxed">
            En PeyBer Uniformes no solo vendemos prendas, ofrecemos soluciones completas para la imagen de tu empresa con la más alta calidad y atención al detalle.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Service 1: Ojal y Botón -->
          <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-transform duration-300 group">
            <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
              <svg lucideCircleDot class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Ojal y Botón</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Servicio especializado de ojalado y botonado industrial con precisión milimétrica para acabados perfectos en todo tipo de prendas.
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Máquinas automatizadas</li>
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Alta resistencia</li>
            </ul>
          </div>

          <!-- Service 2: Bordado -->
          <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-transform duration-300 group">
            <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300">
              <svg lucideScissors class="w-8 h-8 text-emerald-500 group-hover:text-white transition-colors"></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Bordado</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Personalizamos tus uniformes con el logo de tu empresa mediante bordado computarizado de alta definición y durabilidad.
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Hilos de primera calidad</li>
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Digitalización exacta</li>
            </ul>
          </div>

          <!-- Service 3: Confección -->
          <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden">
            <!-- Highlight badge -->
            <div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Especialidad
            </div>
            <div class="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
              <svg lucideShirt class="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors"></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Confección</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Diseño y fabricación de uniformes corporativos, industriales y médicos a medida, garantizando comodidad y profesionalismo.
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Telas antifluido / drill</li>
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Patronaje preciso</li>
            </ul>
          </div>

          <!-- Service 4: Serigrafía y Estampado -->
          <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-transform duration-300 group">
            <div class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300">
              <svg lucidePalette class="w-8 h-8 text-purple-600 group-hover:text-white transition-colors"></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Serigrafía y Estampado</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Estampados vibrantes y duraderos ideales para promociones, eventos corporativos o diseños de gran escala en prendas.
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Tintas resistentes al lavado</li>
              <li class="flex items-start gap-2 text-xs text-slate-500 font-medium"><svg lucideCheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0"></svg> Acabados profesionales</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {}
