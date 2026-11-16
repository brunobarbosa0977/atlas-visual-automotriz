# Páginas de poscompra

- `/upsell` o `/upsell.html`: Sistema Avanzado Multi-Sistemas, US$ 29,90.
- `/downsell` o `/downsell.html`: guía PDF P1xxx y Fuel Trim, US$ 12,90.
- Las páginas usan las mismas fuentes y variables de `styles.css`; los estilos específicos están en `postpurchase.css`.
- La página principal, sus planes y sus checkouts no cambian.

## Widget oficial de compra de un clic

Solo la página de upsell incluye el código oficial `hotmart-checkout-elements.js` y una sola llamada a `checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel')`.

En el upsell, el botón de demostración y el enlace manual de rechazo fueron eliminados. El downsell mantiene su versión anterior, sin widget oficial y con botón de demostración desactivado. El widget de Hotmart controla las opciones de aceptación y rechazo. El contenedor exterior `#hotmart-upsell-widget` se mantiene para organizar el layout.

Para activar el flujo correcto, asociar estas URLs a los pasos y ofertas correspondientes en el Funil de Vendas de Hotmart. Verificar los destinos de aceptación/rechazo dentro de Hotmart. No probar un cargo desde una visita directa sin contexto de compra: validar el flujo con una sesión autorizada de compra, comprobando precio, entrega y mantenimiento del Atlas principal. Este código de embed genérico no identifica por sí solo la oferta ni el precio.

La integración se entrega instalada. No se ha ejecutado una compra real ni se envía Purchase desde el frontend de estas páginas. Los eventos de cobro confirmado corresponden a Hotmart.

## Vídeo y acceso

La VSL del upsell ya está integrada con el player VTurb `vid-6afa81db504e9e302adfc2de` y el script oficial de ConverteAI. El player directo tiene prioridad sobre `videoEmbedUrl`.

- Configurar `upsell.videoEmbedUrl` con una URL de embed HTTPS de YouTube, YouTube sin cookies, Vimeo o player.hotmart.com; no una URL de página de reproducción normal.
- Alternativamente sustituir el poster en el contenedor `.pp-video` por el iframe/player oficial en el comentario indicado. El contenido visible no promete un vídeo de dos minutos mientras no exista.
- Configurar el destino final de acceso y los pasos de rechazo en el embudo de Hotmart.
- Mantener los siete días de garantía configurados también en las ofertas de Hotmart.

## Copy

El material se presenta según el contenido especificado por el propietario (4 clases y 50 fichas, y la guía reducida). Confirmar que los archivos y clases correspondan a cada oferta antes de activar el embudo.

No se incorporan porcentajes sin fuente, tiempos garantizados de diagnóstico, promesas de ausencia total de riesgo, estado ficticio del pago ni precios anteriores de productos diferentes. El indicador del 80% se identifica como avance de la oferta opcional, no procesamiento del pago.

## Publicación

`npm run build` incluye ambos HTML y sus archivos comunes en `dist`. `vercel.json` define `/upsell` y `/downsell`; `server.mjs` reproduce esas rutas para pruebas locales.
