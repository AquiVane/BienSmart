# HANDOFF — BienSmart (Hábitos BienSmart)

Actualizado: 2026-10-18. Zona horaria: Buenos Aires (UTC-3). Idioma: español rioplatense. Vaneh se comunica solo en español.

## Qué es
Producto digital de Aquí Vaneh: **reto de 21 días "Sin harinas ni azúcar"**. Se vende un ebook PDF y el acceso a una app de progreso. No hay acompañamiento personal (no mencionarlo en ningún texto).
- Dominio: `biensmart.vamatienda.com.ar` (archivo `CNAME`; Vaneh crea el subdominio en Cloudflare).
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
- Todo ebook lleva aviso de derechos de autor (prohibida copia/reproducción) y aviso de salud.

## Pendiente
1. Aprobación de Vaneh de textos y de la landing (preview en artifact).
2. Backend de cobro: registrar el producto en `cosmart-training-core` (`COURSES`, `PAYPAL_MIN_USD`) y `mp-productos-ganadores` (`PRODUCTOS`) en `AquiVane/cosmart-workers`, y permitir el origen de la landing. Deploy manual: avisar a Vaneh antes.
3. Embeber Brick de Mercado Pago y PayPal en `index.html` (hoy los botones son de vista previa).
4. Conectar el formulario de la guía gratuita a `POST /leadmagnet/captura` (training-core) y que entregue la guía por mail.
5. Frase exacta de derechos de autor del ebook de "IA para Emprendedores" (está dentro del PDF): igualarla.
6. Ebook PDF, app (PWA con progreso por día), precio de PayPal validado contra `PAYPAL_MIN_USD`.
