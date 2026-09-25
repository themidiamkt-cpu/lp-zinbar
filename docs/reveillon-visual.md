# Réveillon 2027 — entrega visual

Fonte de verdade: `reveillon-visual-spec-zin.md`. Referência estrutural local: `mapa.jpeg`.

## Escopo

- `/reveillon`: hero, destaques, como funciona, seleção de mesas, informações, FAQ e CTA final.
- `/reveillon/checkout`: formulário com validação local e resumo da seleção.
- `/reveillon/sucesso`: confirmação explicitamente demonstrativa, com resumo da simulação ou exemplo ao acessar diretamente.
- Identidade existente: preto, vinho, champagne, tipografia serifada e fotos da casa. Header, logo e footer têm uma opção de evento; o comportamento padrão da home permanece preservado.
- Nenhum endpoint, banco, pagamento real, webhook, reserva real, envio de convite ou evento de analytics foi adicionado. Os convites e seus QR Codes são demonstrativos, sem validação de entrada. O layout global já existente continua responsável pelos scripts que o site já tinha.
- O formulário não envia nem persiste dados pessoais. IDs e quantidades ficam no `sessionStorage` da aba, com validação de capacidade e disponibilidade mockada. Os convites individuais (código, lote, mesa, posição e data de criação) ficam no `localStorage`, sem dados pessoais.

## Mapa

SVG independente da imagem original: 14 setores e 71 elementos de mesa. Possui pan, zoom por controles e pinça, foco por setor, tooltip, estados visuais e lista alternativa. O modal suporta teclado, Escape e retorno de foco. Carrinho lateral no desktop e bottom sheet no mobile.

Os dados editáveis estão em `src/data/reveillon-config.ts`: `eventConfig`, `sectorConfig` e `tableConfig`. `id` é único mesmo quando o número impresso se repete. Coordenadas seguem a planta de 1070 × 1470; capacidades desconhecidas são `null`.

### Revisão da referência

| Ponto | Tratamento nesta entrega |
| --- | --- |
| Setor C, duas mesas 34 | Ambas preservadas: `C-34-square` e `C-34-long`, com `needsReview`. Confirmar numeração e os 14 lugares aparentes da mesa longa. |
| Número 28 | Não aparece na referência. Nenhuma mesa foi inventada para preencher a sequência. |
| Setor B, mesa 27 | Cadeiras pouco legíveis; capacidade não presumida. |
| Setor I, mesas 59–62 | A planta não apresenta cadeiras; capacidades não presumidas. |
| Mesa 100 | Mantida junto ao bar, com setor indefinido. Confirmar participação no evento. |
| Demais mesas | Posições, formatos e lugares reconstruídos visualmente; validar com a operação antes de qualquer venda. |

Mesas com revisão pendente ficam indisponíveis e marcadas com asterisco. Mesa A-19 reservada e G-11 vendida são exemplos fixos de estados, sem relação com ocupação real.

## Conteúdo pendente

Confirmar data, horário, preço, atrações, menu, bebidas, estacionamento, condições da área kids, política infantil, regras e cancelamento. O preço de R$ 250 por pessoa é somente ilustrativo. Fotos são do site atual, sem promessa de cardápio específico do evento.

## Arquivos criados

- `src/app/reveillon/layout.tsx`
- `src/app/reveillon/page.tsx`
- `src/app/reveillon/reveillon.css`
- `src/app/reveillon/checkout/page.tsx`
- `src/app/reveillon/sucesso/page.tsx`
- `src/data/reveillon-config.ts`
- `src/components/reveillon/cart.tsx`
- `src/components/reveillon/checkout-mock.tsx`
- `src/components/reveillon/dialog.tsx`
- `src/components/reveillon/event-sections.tsx`
- `src/components/reveillon/interactive-venue-map.tsx`
- `src/components/reveillon/reveillon-provider.tsx`
- `src/components/reveillon/success-mock.tsx`
- `src/components/reveillon/table-experience.tsx`
- `src/components/reveillon/table-selection-modal.tsx`
- `docs/reveillon-visual.md`

## Arquivos existentes alterados

- `src/components/logo.tsx`
- `src/sections/header-section.tsx`
- `src/sections/footer-section.tsx`

## Verificação

Build de produção (`next build`) aprovado em 25/09/2026 em cópia temporária dos arquivos atuais, para preservar a prévia local em execução. TypeScript (`tsc --noEmit --incremental false`) aprovado. As três rotas do evento foram pré-renderizadas como conteúdo estático.

Revisão visual e fluxo de seleção → carrinho → checkout → sucesso em Chromium nas larguras 320, 375, 390, 430, 768, 1024, 1440 e 1920 px, incluindo ausência de overflow horizontal e modal dentro da tela.

Verificados também: filtros A–N; tooltip; teclado e Escape; capacidade máxima; edição sem duplicação; remoção; recarga da sessão; mesas indisponíveis; lista por setor; vista do mezanino; checkout vazio; sucesso acessado diretamente; gestos de pinça e pan por eventos de toque; seleção por toque; validação do telefone; ausência de persistência de dados pessoais; preservação da home. Emulação de viewport e toque não substitui teste em aparelhos físicos ou Safari iOS.

## Convites demonstrativos

Após autorização do usuário, cada lugar gera um convite com código único. Quatro lugares geram quatro convites. `/reveillon/convites` lista os convites salvos e consulta códigos; `/reveillon/convite/[codigo]` permite reabrir cada convite diretamente. Recarga não gera novos códigos. Simulações antigas salvas na aba recebem os convites ao reabrir a página.

Os códigos só existem no navegador e endereço onde foram gerados. Limpar os dados do site remove os convites; eles não migram do localhost para o deploy nem entre aparelhos. Códigos desconhecidos têm estado de não encontrado. Não há pagamento, reserva, envio por e-mail ou controle real de entrada.
