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

## Páginas de agradecimiento

- `/gracias` o `/gracias.html`: compra del producto principal, sin el Sistema Avanzado.
- `/gracias-vip` o `/gracias-vip.html`: compra del principal y del Sistema Avanzado.
- Ambas usan `gracias.css`, que importa las fuentes y variables del sitio principal. No cargan widgets de compra ni disparan Purchase.
- En Hotmart, configurar las URLs como destinos apropiados después de una compra aprobada y las decisiones del embudo. No enviar pagos pendientes o rechazados a estas páginas de confirmación.
- Son páginas estáticas de instrucciones, no verifican pagos, no liberan archivos y no autentican al comprador. El acceso a los productos sigue controlado por Hotmart. Visitar la URL VIP directamente no concede acceso.
- Sustituir los enlaces `https://consumer.hotmart.com` marcados con `INSERIR LINK DO HOTMART CLUB AQUI` por los enlaces específicos del producto/área de miembros cuando estén disponibles.
- El soporte remite a los datos del productor dentro de la compra en Hotmart: no se inventó un correo ni se prometió un plazo de respuesta. Si existe un canal oficial directo, incorporarlo en las tarjetas de soporte.

## Funil separado do plano básico

`/upsell-basico` (también `/upsell-basico.html`) es una copia de `/upsell`, con la misma VSL, contenido, estilos y oferta adicional de US$ 29,90. El nombre básico identifica el producto principal de US$ 9,90 que originó el embudo; no cambia el precio del upsell.

La copia ya incluye el widget oficial de Hotmart, con una única carga de `hotmart-checkout-elements.js` y una llamada a `checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel')`. No hay botones ficticios ni rechazos manuales. La URL de esta página debe asociarse al segundo embudo dentro de Hotmart; el embed genérico utiliza el contexto de la sesión de compra y no selecciona un precio por el nombre de la ruta. La página original `/upsell` permanece intacta.
