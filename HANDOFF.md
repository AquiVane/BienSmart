# HANDOFF — BienSmart (Hábitos BienSmart)

Actualizado: 2026-10-18. Zona horaria: Buenos Aires (UTC-3). Idioma: español rioplatense. Vaneh se comunica solo en español.

## 22/10 — Hosting migrado de GitHub Pages a Cloudflare Pages — EN PRODUCCIÓN
- **Motivo:** los términos de GitHub Pages no permiten usarlo como hosting de un negocio/e-commerce (acá se vende el reto de hábitos). Pedido de Vaneh.
- **Ahora:** proyecto **Cloudflare Pages `biensmart`** (preview `biensmart.pages.dev`) conectado a `AquiVane/BienSmart`, rama `main`, sin build, salida = raíz. Dominio personalizado: `biensmart.vamatienda.com.ar` (zona `vamatienda.com.ar`: el CNAME a `aquivane.github.io` se borró y Cloudflare creó el suyo). GitHub Pages **despublicado**; se borró `CNAME`. Cada push a `main` se publica solo.
- **Comportamiento:** `/habitos` redirige a `/habitos/` (igual que antes); una URL inexistente devuelve el `index.html` con 200 (GitHub daba 404). Verificado en desktop y mobile: home, `/habitos/` (Brick de Mercado Pago + PayPal cargan solos), gracias, guía gratuita, `/registro/`, `/reset-password/`, `/descargas/`. Los mails del pie los oculta la protección de Cloudflare de la zona.

## Qué es
Producto digital de Aquí Vaneh: **reto de 21 días "Sin harinas ni azúcar"**. Se vende un ebook PDF y el acceso a una app de progreso. No hay acompañamiento personal (no mencionarlo en ningún texto).
- Dominio: `biensmart.vamatienda.com.ar` (Cloudflare Pages, proyecto `biensmart`; desde el 22/10 ya no hay `CNAME` en el repo).
- Rutas: `/habitos/` (landing de venta), `/habitos/guia-gratuita/` (mini guía), `/descargas/` (app; hoy es un placeholder "Tu app está en camino"). `/` redirige a la landing.
- Ebook PDF y app: pendientes.
- Mini guía gratuita (lead magnet): página propia `habitos/guia-gratuita/index.html` (formulario y gracias con botón a la landing de venta). La landing de venta NO lleva la guía. Texto de la guía pendiente de escribir. Título propuesto: "5 desayunos sin harina ni azúcar, listos en 10 minutos".

## Contenido fuente
Los 21 días (comidas, tip, rutina) ya están escritos por Vaneh en su sitio https://aquivanehr21.netlify.app/ (archivo `index.html` de ese sitio, constante `RETO`). Se reutiliza tal cual; no reescribir.

## Marca y diseño
- Paleta: magenta `#C2185B`, magenta oscuro `#880E4F`, rosa `#F06292`, rosa claro `#FCE4EC`, blush `#FFF0F5`, crema `#FFF9FA`, tinta `#3D1520`. Fondo oscuro = texto blanco.
- Fuentes: DM Serif Display (títulos), Playfair Display itálica (acentos), DM Sans (texto).
- La marca Savia del handoff anterior quedó **descartada**.

## Decisiones tomadas
- Sin fechas de desbloqueo: todos los días abiertos al comprar.
- Precio: $24.000 tachado, **$12.000** (50 % off) en pesos; **USD 7,80** (antes USD 15) en PayPal.
- Cobro con Mercado Pago (Brick) y PayPal **embebidos en la landing** (opción B). Nunca sacar a la persona del checkout.
- Los 21 días NO se presentan como "tiempo en que se fija un hábito" (el estudio de Lally et al. 2010 encontró un promedio de 66 días, rango 18–254). Se presentan como empujón inicial. Vaneh pidió NO mencionar el estudio en la landing.
- Estética: replicar la de su sitio original (crema, degradés pastel, pastillas blancas, formas orgánicas, botón magenta→coral). Sin bandas oscuras. Botones a ancho completo en mobile.
- Todo ebook lleva aviso de derechos de autor y aviso de salud. Texto oficial (modelo: ebook IA para Emprendedores, adaptado y aprobado por Vaneh 18/10): "© 2026 Vanesa Anahí Fernández - COSMART. Todos los derechos reservados...", con página de **Créditos y condiciones de uso al INICIO y al FINAL** del ebook y de la guía. Versión corta en el pie de las páginas.
- Progreso de la app: **por cuenta** (se reutiliza el mecanismo genérico `/academy/lecciones` + `/academy/leccion` de `cosmart-training-core`, KV `PROGRESS`, agregando el curso a `CURSOS_LECCIONES`).
- Remitente de mails: `hola@vamatienda.com.ar`.

## 20/10 — Cobro real, cuenta y app (EN RAMA `claude/checkout-app`, SIN MEZCLAR A MAIN)
**No mezclar a `main` hasta que estén desplegados los dos workers del backend** (rama `claude/biensmart-habitos` en `AquiVane/cosmart-workers`: `cosmart-training-core` y `mp-productos-ganadores`). Con el backend viejo, el worker de pago cobraría el monto que mande el navegador y otorgaría el curso equivocado.
- `assets/biensmart.js` (config pública + helpers) y `assets/site.css` (estilos de las páginas de cuenta).
- `habitos/index.html`: checkout embebido. Mercado Pago (Payment Brick, `/preference` + `/pay` de `mp-productos-ganadores`) y PayPal (botones del SDK + `POST /payment/paypal` del core). Nunca se saca a la persona de la página. El precio mostrado es solo visual: lo fija el servidor.
- `habitos/gracias/`, `registro/` (crea el usuario con el token del mail), `reset-password/`.
- `descargas/`: la app. Ingreso con el mismo `/auth/login` del core; lee `/academy/lecciones?curso=habitos-biensmart` y guarda con `/academy/leccion` (ids `d1..d21`, `d<n>-desayuno|colacion|almuerzo|merienda|cena|rutina`). Descarga el ebook con `/academy/archivo/habitos-biensmart/ebook`. PWA: `manifest.webmanifest`, `sw.js` (solo cachea la cáscara), íconos.
- **Regla**: todo elemento que use el atributo `hidden` y tenga `display` propio necesita `[hidden]{display:none!important}` (ya está en todas las páginas; el 20/10 se arregló un bug así en `guia-gratuita`).
- Probado con Playwright (celular y escritorio) contra un servidor simulado: ingreso, progreso por cuenta, registro, reset, gracias y checkout (preferencia con el producto y el email). **No probado con pagos reales.**
- Pendiente: deploy de los workers (aviso a Vaneh), probar un pago real chico en MP y PayPal, mezclar la rama a `main`, ebook en PDF (subirlo a R2) y conectar el formulario de la guía gratuita.

## 20/10 (2) — Cambios pedidos por Vaneh sobre la rama `claude/checkout-app`
- **La app vive en `/descargas/habitos/`** (antes `/descargas/`, que ahora redirige). Manifest con `scope:"/"` para poder instalarse también desde la landing.
- **Días de a uno**: el día N solo se abre si el N-1 está tildado como completo (para que use la app todos los días). La regla la aplica el SERVIDOR (`cosmart-workers`, ver su HANDOFF): los días cerrados llegan sin contenido y no se pueden marcar. Pregunta abierta a Vaneh: ¿además se limita a un día nuevo por día calendario? Hoy NO. El ebook trae los 21 días completos.
- **Transferencia bancaria** (3.ª pestaña del pago en la landing): alias `contacto.smart`, monto $12.000, comprobante a `hola@vamatienda.com.ar` indicando el email de la cuenta; Vaneh activa a mano con `POST /admin/otorgar` del core (todavía sin botón en el panel). **Pendiente de Vaneh confirmar el alias exacto y el nombre del titular antes de publicar en `main`** (si el alias está mal, el dinero va a otra persona).
- **Descargar la app** (`assets/instalar.js`): botón + pasos de Android y de iPhone en la landing, la página de gracias y dentro de la app (también en el ingreso, `?instalar=1`). Si el navegador permite instalar con un toque, lo hace; si no, guía con los pasos.
- Pruebas con Playwright (celular y escritorio) en `scratchpad`, no commiteadas: ingreso, progreso, días cerrados, registro, reset, gracias, checkout, transferencia, instalar.

## Pendiente
1. Aprobación de Vaneh de textos y de la landing (preview en artifact).
2. Backend de cobro: registrar el producto en `cosmart-training-core` (`COURSES`, `PAYPAL_MIN_USD`) y `mp-productos-ganadores` (`PRODUCTOS`) en `AquiVane/cosmart-workers`, y permitir el origen de la landing. Deploy manual: avisar a Vaneh antes.
3. Embeber Brick de Mercado Pago y PayPal en `index.html` (hoy los botones son de vista previa).
4. Conectar el formulario de la guía gratuita a `POST /leadmagnet/captura` (training-core) y que entregue la guía por mail.
5. Frase exacta de derechos de autor del ebook de "IA para Emprendedores" (está dentro del PDF): igualarla.
6. Ebook PDF, app (PWA con progreso por día), precio de PayPal validado contra `PAYPAL_MIN_USD`.

## 21/10 — Estado final: listo para vender
Todo está en producción (ver `HANDOFF.md` de `cosmart-workers`, sección "21/10 — Hábitos BienSmart listo para vender"): landing con bonos y precio ($78.000 de referencia tachado, hoy $12.000 / USD 7,80), carrusel de testimonios (`assets/resenas.js|css`, trae `/api/bs/resenas`), collages de fotos (`assets/fotos/`), guía gratuita con fotos y oferta, app con bonos/medidas/reseña y `admin/resenas/`. Las notas de arriba que dicen "pendiente" (ebook, app, guía) quedaron resueltas.
