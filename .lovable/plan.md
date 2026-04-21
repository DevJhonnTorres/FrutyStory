
# FrutyStory — Mockup web visual completo

Sitio multi-ruta en español, estética del branding (azul profundo, dorado, tipografía display tipo telenovela, fondo con patrón de manchas). Sin backend en esta fase: precios placeholder editables, carrito y checkout 100% en cliente (localStorage), QR Bancolombia visual, y un pseudo-admin local para "definir cupos".

## Estructura de rutas

- `/` — Landing (Hero + Problema + Qué es + Stats + Casos + Testimonios + CTA)
- `/planes` — Planes detallados + comparativa + botón "Reservar"
- `/casos` — Casos de uso por industria (restaurantes, autos, moda, música…)
- `/servicios` — 4 formatos (Comerciales, Product placement, Embajadores, Integración musical)
- `/carrito` — Items, anticipo 30%, urgencia de cupos
- `/checkout` — Formulario de negocio + método de pago
- `/checkout/pago` — QR Bancolombia + llave + subir comprobante (mock)
- `/checkout/confirmacion` — "Reserva recibida, pendiente de aprobación" + timeline
- `/contacto` — Formulario filtrador (presupuesto, tipo integración, objetivo)
- `/admin` — Pseudo-panel local: gestionar cupos por mes y ver reservas guardadas en localStorage (sin auth real, solo demo visual)

## 1. HERO
- Fondo oscuro con personajes (imagen `frutiiiii.png`), título grande:
  *"Convierte tu marca en protagonista de una serie viral"*
- Sub: +50M reproducciones · 300K seguidores · audiencia global
- 2 CTAs: **Reservar espacio publicitario** → `/planes`, **Ver casos reales** → `/casos`
- Tira de logos de marcas (placeholders editables)
- Banner de urgencia: "🔥 3 espacios disponibles este mes" (leído desde admin/localStorage)

## 2. PROBLEMA → SOLUCIÓN
Tres dolores tachados (publicidad tradicional, skip de anuncios, bajo engagement) → "FrutyStory integra tu marca dentro de la historia".

## 3. ¿QUÉ ES FRUTYSTORY?
Versión condensada del PDF actual con stats 300K / 50M+ / Global y foto Don Bomé.

## 4. PLANES (página `/planes`)
3 tarjetas con precios placeholder editables desde un único archivo `src/data/plans.ts`:
- **Básico** — Product placement simple · 1 episodio · *desde $500.000 COP*
- **Pro** ⭐ (destacado) — Integración en historia · 3 episodios · mención narrativa · *desde $1.500.000*
- **Premium** — Personaje usando la marca · arco completo · *desde $3.000.000*

Cada uno: lista de beneficios + botón **Reservar espacio** (añade al carrito).

## 5. CASOS DE USO (`/casos`)
Cards storytelling con icono + escena: 🍔 Restaurante, 🚗 Concesionario, 👗 Moda, 🎧 Música, 🥤 Bebidas, 💄 Belleza. Usa imágenes `fruti/frutii/frutiii.png` como referencia visual.

## 6. TESTIMONIOS
3 cards con avatar, marca, métrica destacada ("+30% ventas", "Producto agotado tras episodio") — placeholders editables.

## 7. FLUJO DE COMPRA (cliente, sin backend)

**Carrito** (`/carrito`)
- Items con plan, episodio, precio
- Resumen: total, **anticipo 30%**, saldo
- Aviso: "Cupos limitados este mes — quedan X"

**Checkout** (`/checkout`)
- Formulario filtrador (validado con zod):
  - Nombre empresa, industria (select), presupuesto estimado
  - Tipo de integración: Producto / Historia / Personaje
  - Objetivo: Branding / Ventas / Awareness
  - Email + WhatsApp
- Botón **Continuar al pago**

**Pago** (`/checkout/pago`)
- Tabs: **QR Bancolombia** | **Llave / Transferencia**
- QR placeholder + datos bancarios + monto del anticipo
- Zona "Sube tu comprobante" (preview de imagen, solo cliente) + botón **Marcar como pagado**

**Confirmación** (`/checkout/confirmacion`)
- "✅ Reserva recibida — pendiente de aprobación manual"
- Timeline visual: Reserva → Producción → Publicación → Resultados
- Resumen + ID de reserva guardado en localStorage

## 8. PSEUDO-ADMIN (`/admin`)
Demo local (sin login, solo para mostrar el flujo):
- **Cupos por mes**: input numérico que define cuántos espacios hay disponibles (se refleja en Hero/carrito en tiempo real)
- **Reservas**: lista de las reservas guardadas en localStorage con estados *pendiente / pago_subido / aprobado / en_producción* y botones para cambiar estado

## 9. Diseño / sistema visual
- Paleta: azul profundo `#0a1f3d`, dorado `#e8b54a`, blanco hueso, acento coral
- Tipografía display bold para titulares (estilo del PDF), sans-serif limpia para cuerpo
- Fondo decorativo con patrón de manchas sutil
- Componentes shadcn ya instalados (Card, Tabs, Dialog, Form, Sonner para toasts)
- Responsive mobile-first

## 10. Datos editables en un solo lugar
`src/data/` con `plans.ts`, `cases.ts`, `testimonials.ts`, `brands.ts` para que cambies textos/precios sin tocar componentes.

## Fuera de alcance (siguiente fase, cuando quieras activar Lovable Cloud)
- Guardar reservas en base de datos real
- Subida real de comprobante a storage
- Auth + admin protegido
- Pasarela Stripe internacional
- Notificaciones email/WhatsApp automáticas
