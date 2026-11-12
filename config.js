export const config = {
  plans: {
    basic: {price: '9.90', checkoutUrl: ''},
    complete: {price: '14.90', checkoutUrl: ''}
  },
  campaign: { date: '', discount: '', confirmed: false },
  guarantee: { days: null, channel: '', seal: 'assets/garantia.svg' },
  images: { cover: '', hero: 'assets/optimized/hero-1200-b9c482374c.webp', bundle: 'assets/optimized/bundle-1200-c74472a431.webp', bonusTests: 'assets/optimized/bonus-tests-720-62a9f601cc.webp', bonusChecklist: 'assets/optimized/bonus-checklist-720-ff57f34ae8.webp', bonusGuide: 'assets/optimized/bonus-guide-720-bf4371e08a.webp' },
  bonus3: {title: 'Guía de Diagnóstico sin Códigos de Falla', description: 'Cuando el vehículo presenta un síntoma pero el escáner no registra códigos de falla, consulta la guía para ordenar la revisión. Parte de lo que observas en el motor y elige la siguiente comprobación antes de cambiar una pieza.'},
  // Only product pages from the actual Atlas may be marked as real samples.
  samples: [
    {code: 'P0300', src: 'assets/samples/p0300.webp', alt: 'Ficha original del Atlas para el código P0300'},
    {code: 'P0068', src: 'assets/samples/p0068.webp', alt: 'Ficha original del Atlas para el código P0068'},
    {code: 'P0171', src: 'assets/samples/p0171.webp', alt: 'Ficha original del Atlas para el código P0171'},
    {code: 'P0101', src: 'assets/samples/p0101.webp', alt: 'Ficha original del Atlas para el código P0101'},
    {code: 'P0335', src: 'assets/samples/p0335.webp', alt: 'Ficha original del Atlas para el código P0335'},
    {code: 'P0420', src: 'assets/samples/p0420.webp', alt: 'Ficha original del Atlas para el código P0420'},
    {code: 'P0115', src: 'assets/samples/p0115.webp', alt: 'Ficha original del Atlas para el código P0115'},
    {code: 'P0128', src: 'assets/samples/p0128.webp', alt: 'Ficha original del Atlas para el código P0128'}
  ],
  practiceImages: [
    {
        "src": "assets/optimized/practica-apostila-en-mano-960-5d846dd6b8.webp",
        "alt": "Imagen ilustrativa generada con IA: Mano con grasa sosteniendo el Atlas impreso en el taller"
    },
    {
        "src": "assets/optimized/practica-junto-al-motor-960-a70c1fe6dd.webp",
        "alt": "Imagen ilustrativa generada con IA: Consulta de la ficha P0300 junto al motor y al escáner"
    },
    {
        "src": "assets/optimized/practica-mecanico-taller-960-25a246f6e8.webp",
        "alt": "Imagen ilustrativa generada con IA: Mecánico mostrando la cuaderno impreso del Atlas en un taller cubierto"
    },
    {
        "src": "assets/optimized/practica-checklist-escritorio-960-9404c91ab6.webp",
        "alt": "Imagen ilustrativa generada con IA: Checklist de diagnóstico con anotaciones de ejemplo junto al Atlas"
    },
    {
        "src": "assets/optimized/practica-consulta-celular-960-a689c8f14c.webp",
        "alt": "Imagen ilustrativa generada con IA: Consulta de la ficha P0300 en el celular junto al vehículo"
    },
    {
        "src": "assets/optimized/practica-mecanico-ladrillo-960-bb5fa1cee0.webp",
        "alt": "Imagen ilustrativa generada con IA: Mecánico mostrando el Atlas en un taller de ladrillo"
    },
    {
        "src": "assets/optimized/practica-bancada-pruebas-960-c73213289d.webp",
        "alt": "Imagen ilustrativa generada con IA: Atlas abierto en P0171 junto al multímetro y un bloc de notas"
    },
    {
        "src": "assets/optimized/practica-mecanico-elevador-960-04f50d89e2.webp",
        "alt": "Imagen ilustrativa generada con IA: Mecánico con gafas mostrando el Atlas junto a un elevador"
    },
    {
        "src": "assets/optimized/practica-atlas-abierto-960-f3a956754c.webp",
        "alt": "Imagen ilustrativa generada con IA: Vista desde arriba del Atlas abierto en P0171 y P0420"
    },
    {
        "src": "assets/optimized/practica-mecanico-portada-960-c35beea1ed.webp",
        "alt": "Imagen ilustrativa generada con IA: Mecánico mostrando la portada del Atlas en su taller"
    }
],
  conversationMockups: [
    {
        "src": "assets/optimized/conversacion-7c533a01-940-ed6bc02fbe.webp",
        "alt": "Ejemplo ficticio de conversación sobre el Atlas: Roberto Méndez",
        "name": "Roberto Méndez",
        "fictional": true
    },
    {
        "src": "assets/optimized/conversacion-abb5891d-940-fe6195b484.webp",
        "alt": "Ejemplo ficticio de conversación sobre el Atlas: José Ramírez",
        "name": "José Ramírez",
        "fictional": true
    },
    {
        "src": "assets/optimized/conversacion-9c31105c-940-c6ae3b4c0f.webp",
        "alt": "Ejemplo ficticio de conversación sobre el Atlas: Miguel Torres",
        "name": "Miguel Torres",
        "fictional": true
    },
    {
        "src": "assets/optimized/conversacion-4ce84add-940-02c231a17b.webp",
        "alt": "Ejemplo ficticio de conversación sobre el Atlas: Daniel Ortega",
        "name": "Daniel Ortega",
        "fictional": true
    }
],
  // Add only real testimonials with explicit publication permission.
  testimonials: [],
  feedbackScreenshots: [
    {src: '', alt: 'Captura de WhatsApp de un mecánico', authorized: false},
    {src: '', alt: 'Captura de WhatsApp de un mecánico', authorized: false},
    {src: '', alt: 'Captura de WhatsApp de un mecánico', authorized: false}
  ],
  published: false
};
