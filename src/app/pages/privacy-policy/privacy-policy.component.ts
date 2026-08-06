import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="privacy-container">
      <header class="privacy-header">
        <a routerLink="/" class="back-link">← Volver a inicio</a>
        <h1>Política de Privacidad</h1>
        <p class="subtitle">Confecciones Peyber & peyber-bot-publications</p>
        <p class="last-updated">Última actualización: 6 de Agosto de 2026</p>
      </header>

      <main class="privacy-content">
        <section class="section">
          <h2>1. Introducción</h2>
          <p>
            En <strong>Confecciones Peyber</strong> respetamos su privacidad y nos comprometemos a proteger sus datos personales.
            Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos la información personal
            obtenida a través de nuestros sitios web, aplicaciones y servicios automatizados (incluyendo nuestra integración de Meta/Facebook/Instagram 
            <code>peyber-bot-publications</code>).
          </p>
        </section>

        <section class="section">
          <h2>2. Información que Recopilamos</h2>
          <p>Podemos recopilar y procesar los siguientes tipos de datos:</p>
          <ul>
            <li><strong>Información de contacto:</strong> Nombre, número de teléfono, dirección de correo electrónico y dirección física cuando nos contacta o solicita presupuestos.</li>
            <li><strong>Datos de interacción en Meta (Messenger / Instagram):</strong> Identificador público de usuario (PSID / IGSID), nombre de usuario público y mensajes enviados a través de nuestros canales oficiales.</li>
            <li><strong>Datos de navegación y catálogo:</strong> Información sobre las consultas de productos y uniformes realizadas en nuestra plataforma.</li>
          </ul>
        </section>

        <section class="section">
          <h2>3. Uso de la Información</h2>
          <p>La información recopilada se utiliza exclusivamente para los siguientes fines:</p>
          <ul>
            <li>Procesar solicitudes de catálogo, cotizaciones de uniformes y atención al cliente.</li>
            <li>Brindarle respuestas automatizadas e interactivas a través de nuestro agente/bot en Facebook Messenger e Instagram (<code>peyber-bot-publications</code>).</li>
            <li>Gestionar el inventario y coordinar entregas o servicios contratados.</li>
            <li>Cumplir con las obligaciones legales y regulatorias aplicables.</li>
          </ul>
        </section>

        <section class="section">
          <h2>4. Protección y Compartición de Datos</h2>
          <p>
            No vendemos, alquilamos ni comercializamos sus datos personales con terceros. Su información solo podrá ser compartida con:
          </p>
          <ul>
            <li>Proveedores de infraestructura y tecnología (como Meta Platforms, Inc.) estrictamente para el funcionamiento del servicio de mensajería.</li>
            <li>Autoridades competentes cuando sea requerido por la legislación vigente.</li>
          </ul>
        </section>

        <section class="section">
          <h2>5. Retención y Eliminación de Datos (Derechos ARCO)</h2>
          <p>
            Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales, así como a solicitar la eliminación de sus datos de nuestros registros.
          </p>
          <p>
            Para solicitar la eliminación de sus datos o realizar cualquier consulta sobre privacidad, puede escribirnos a:
            <br />
            <strong>Correo electrónico:</strong> <a href="mailto:privacidad@peyber.com">privacidad@peyber.com</a>
          </p>
        </section>

        <section class="section">
          <h2>6. Cambios a esta Política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier modificación será publicada en esta misma página con la fecha de actualización correspondiente.
          </p>
        </section>
      </main>
    </div>
  `,
  styles: `
    .privacy-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.6;
    }

    .privacy-header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }

    .back-link {
      display: inline-block;
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      margin-bottom: 1rem;
      transition: color 0.2s ease;
    }

    .back-link:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }

    .privacy-header h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #475569;
      margin: 0 0 0.25rem 0;
    }

    .last-updated {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }

    .privacy-content .section {
      margin-bottom: 2rem;
    }

    .privacy-content h2 {
      font-size: 1.35rem;
      font-weight: 600;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 0.75rem;
    }

    .privacy-content p {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .privacy-content ul {
      margin: 0 0 1rem 1.25rem;
      padding: 0;
    }

    .privacy-content li {
      margin-bottom: 0.5rem;
    }

    code {
      background-color: #f1f5f9;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      font-family: monospace;
      color: #0f172a;
    }
  `
})
export class PrivacyPolicyComponent {}
