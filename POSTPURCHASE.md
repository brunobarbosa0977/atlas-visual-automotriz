# Páginas de poscompra

- `/upsell` o `/upsell.html`: Sistema Avanzado Multi-Sistemas, US$ 29,90.
- `/downsell` o `/downsell.html`: guía PDF P1xxx y Fuel Trim, US$ 12,90.
- Las páginas usan las mismas fuentes y variables de `styles.css`; los estilos específicos están en `postpurchase.css`.
- La página principal, sus planes y sus checkouts no cambian.

## Activar la compra de un clic

1. Crear las dos ofertas adicionales y el embudo en Hotmart.
2. Obtener el código oficial de widget de cada oferta.
3. En `upsell.html`, sustituir el botón de demostración y el estado del contenedor `#hotmart-upsell-widget` por el código oficial completo.
4. Repetir en `downsell.html` dentro de `#hotmart-downsell-widget`.
5. Configurar en Hotmart el destino de aceptación y rechazo. El enlace de rechazo HTML del upsell apunta a `/downsell`; el rechazo final se configura con `accessUrl` en `postpurchase-config.js`.
6. Probar el flujo con una sesión de compra válida de Hotmart. Verificar oferta, valor cobrado, entrega y acceso al producto principal.

Los botones de demostración permanecen desactivados hasta instalar los widgets. No hay cobros simulados ni eventos Purchase enviados desde estas páginas. La confirmación y medición de la compra adicional corresponden a la integración de Hotmart.

`checkoutUrl` en `postpurchase-config.js` es un fallback opcional a un checkout HTTPS regular: al configurarlo, el botón se convierte en «CONTINUAR EN EL CHECKOUT DE HOTMART». Esto no implementa un cargo de un clic ni promete reutilizar los datos del pago.

## Vídeo y acceso

La VSL del upsell ya está integrada con el player VTurb `vid-6afa81db504e9e302adfc2de` y el script oficial de ConverteAI. El player directo tiene prioridad sobre `videoEmbedUrl`.

- Configurar `upsell.videoEmbedUrl` con una URL de embed HTTPS de YouTube, YouTube sin cookies, Vimeo o player.hotmart.com; no una URL de página de reproducción normal.
- Alternativamente sustituir el poster en el contenedor `.pp-video` por el iframe/player oficial en el comentario indicado. El contenido visible no promete un vídeo de dos minutos mientras no exista.
- Configurar `accessUrl` con el enlace específico de la biblioteca/área de miembros. Por defecto se usa el acceso oficial general `https://consumer.hotmart.com/`.
- Mantener los siete días de garantía configurados también en las ofertas de Hotmart.

## Copy

El material se presenta según el contenido especificado por el propietario (4 clases y 50 fichas, y la guía reducida). Confirmar que los archivos y clases correspondan a cada oferta antes de activar el embudo.

No se incorporan porcentajes sin fuente, tiempos garantizados de diagnóstico, promesas de ausencia total de riesgo, estado ficticio del pago ni precios anteriores de productos diferentes. El indicador del 80% se identifica como avance de la oferta opcional, no procesamiento del pago.

## Publicación

`npm run build` incluye ambos HTML y sus archivos comunes en `dist`. `vercel.json` define `/upsell` y `/downsell`; `server.mjs` reproduce esas rutas para pruebas locales.
