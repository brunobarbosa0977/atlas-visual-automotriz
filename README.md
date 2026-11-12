# Atlas Visual de Diagnóstico Automotriz

Página original em espanhol, implementada após inspeção visual da referência no desktop (1440 px) e celular (390 px). Sem framework e sem etapa de build: HTML, CSS e módulos JavaScript nativos. Fontes Inter e Barlow Condensed locais, com licenças em assets/fonts.

## Desenvolvimento

Node.js 24 ou superior.

```sh
npm ci --cache /tmp/atlas-npm-cache
npm run dev
```

Servidor na porta 3000, configurável por PORT. Os arquivos públicos podem ser hospedados em um serviço estático: index.html, styles.css, app.js, config.js, content.json e assets/.

## Verificação

Com o servidor em execução, rode `npm test`. Os testes usam Playwright e Chromium em /usr/bin/chromium, validam desktop e celular, seis expansíveis, FAQ, ampliação, navegação, preços por plano e ausência de overflow. Capturas são salvas em artifacts/.

## Configuração comercial e publicação

Edite config.js para checkout HTTPS oficial, campanha confirmada, prazo/canal/selo da garantia, imagens originais e relatos reais autorizados. As amostras devem vir do produto; a primeira é P0300. Os cards ficam sem legendas ou avisos visíveis, prontos para receber as imagens reais. A composição da capa na abertura é identificada como prévia e não representa uma ficha real. Prints reais e depoimentos só aparecem com authorized: true. Os espaços de WhatsApp ficam visíveis, sem relatos inventados, até configurar feedbackScreenshots.

A página começa com noindex enquanto a configuração comercial não está completa. Só configure published: true depois da revisão editorial e comercial; a aplicação mantém noindex enquanto faltarem campos essenciais. Não há checkout externo configurado nem coleta de dados. O adicional de checkout não é ofertado nesta página. Nenhum desconto ou prazo de garantia foi inventado.

## Referência e composição

A referência https://120.mapavisual.online/ foi aberta e examinada em 11/11/2026, em desktop e celular, após liberação do acesso de rede. Os recursos foram obtidos com verificação TLS habilitada; nenhum HTML/CSS externo foi incorporado ao projeto.

A composição segue abertura centralizada com imagem antes dos botões; primeiro bloco de amostras em carrossel automático contínuo; seis grupos em grade 3 × 2 no desktop e uma coluna no celular; segundo bloco com duas galerias automáticas contínuas; três cartões de decisão; dois cartões de público; chamada intermediária; imagem dos entregáveis com três cartões; três bônus; cinco cartões de acesso; feedback com espaços para prints de WhatsApp em carrossel automático; dois cartões de preço; garantia; FAQ e rodapé. Grupos podem permanecer abertos simultaneamente. A oferta usa dois planos: Atlas no básico, Atlas e três bônus no completo. Foram aplicadas a paleta grafite/laranja e as fontes pedidas.

## Prévia portátil

Rode `npm run export-preview` para gerar `artifacts/atlas-preview.html`, com CSS, fontes, configuração e conteúdo incorporados. É uma prévia portátil que pode ser baixada e aberta no navegador, sem servidor. Recursos do produto adicionados futuramente ainda precisam ser disponibilizados por URLs acessíveis. A aplicação também pode ser servida com `npm run dev` na porta 3000; não foi criada uma URL pública de hospedagem.

## Pendências de publicação

- Imagens específicas dos três bônus. A imagem de abertura e oito fichas originais do Atlas, incluindo P0300, já foram integradas.
- URL oficial do checkout.
- Prazo, canal e selo oficial de garantia.
- Prints reais de WhatsApp autorizados em feedbackScreenshots; sem eles, o bloco mostra cards vazios.
- Campanha e desconto confirmados apenas se for usar a faixa promocional; a faixa padrão dispensa esses dados.

A página continua em prévia e não foi publicada por esta tarefa.

Os quatro carrosséis avançam automaticamente, pausam ao interagir com as fichas e oferecem controle de pausa acessível pelo teclado, sem controles visíveis durante a navegação comum. A preferência do sistema por movimento reduzido é respeitada.

O selo genérico em assets/garantia.svg não promete prazo nem condições de reembolso. Substitua pelo selo oficial e configure prazo/canal quando confirmados.

## Imagens recebidas e integradas

A abertura usa a imagem original assets/atlas-hero.png, recebida no IMG.zip, sem recorte. Os três carrosséis do Atlas usam oito páginas de conteúdo extraídas do PDF compactado do mesmo ZIP. Nenhuma capa ou divisória foi usada nas galerias. P0300 é a primeira ficha. A relação entre códigos e páginas de origem está em assets/samples/source.json; o PDF completo não é publicado nos arquivos estáticos. Os espaços de WhatsApp continuam separados dos materiais do Atlas.

## Otimização para celular

As imagens visíveis usam WebP com variantes responsivas (`srcset`/`sizes`), largura e altura declaradas, decodificação assíncrona e carregamento tardio abaixo da abertura. A imagem principal tem carregamento prioritário. Os carrosséis usam miniaturas; a ampliação carrega a ficha completa, mantendo sua legibilidade. Os arquivos com hash em assets/optimized recebem cache imutável na Vercel.

Em uma medição local com viewport de 390 × 844 e densidade 2, sem rolar, as imagens transferidas na abertura passaram de 4.047.251 para 403.900 bytes (redução de 90%). Isso mede bytes de imagens nesse cenário, não um tempo de carregamento garantido para toda conexão.

As variantes já estão geradas e são copiadas pelo build. Para regenerar a partir das imagens originais extraídas do ZIP: `python3 scripts/optimize-images.py --source-dir /caminho/das/imagens` (Pillow necessário). O diretório deve conter 2.png (bônus 1), 3.png (bônus 2), 4.png (imagem recebida do bônus 3) e 5.png (pacote completo).

O terceiro bônus foi confirmado como Guía de Diagnóstico sin Códigos de Falla. Sua imagem e a composição grande do Atlas com os três bônus estão integradas em WebP responsivo. O nome anterior Atlas Visual de Datos en Vivo del Escáner foi substituído na oferta e nos entregáveis.

## Planos de compra

Dois planos confirmados: básico de US$ 9.90 com os 70 mapas e índice, e completo de US$ 14.90 com o mesmo Atlas e os três bônus. Os links são independentes em config.js: plans.basic.checkoutUrl e plans.complete.checkoutUrl. Itens não incluídos aparecem riscados no básico. O preço só é apresentado na seção de oferta. As referências aos bônus no restante da página identificam o plano completo. O bloco intermediário usa o título Oferta por tiempo limitado, conforme solicitado, sem percentual, preço anterior ou contador inventado.

Os cards de amostras seguem as dimensões medidas na referência: cerca de 260 × 342 px; nas duas fileiras internas, 220 × 288 px no celular. As páginas são enquadradas inteiras, sem cortes.

## Demonstrações ilustrativas

A seção en-practica reúne dez imagens geradas com IA mostrando formas de uso do material. A identificação aparece na seção e na ampliação. Elas ficam em practiceImages, separadas dos depoimentos e prints de WhatsApp, e não são apresentadas como relatos reais de clientes. As versões WebP são responsivas e carregadas sob demanda; os originais permanecem em /workspace/generated_images.

## Mockups de conversas

Os quatro prints diferentes enviados pelo usuário ficam em conversationMockups, com fictional: true, e são exibidos sob o título Conversaciones sobre el Atlas. A seção e a ampliação informam que são conversas fictícias com imagens geradas por IA, sem tratar os personagens como clientes reais. Os arquivos não têm tarjas internas. Prints reais autorizados continuam separados em feedbackScreenshots; quando configurados, passam a ocupar a seção de experiências.
