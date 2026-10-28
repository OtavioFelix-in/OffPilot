# Manutenção

Notas para quem mantém o Off Pilot. Este arquivo fica fora de `skills/` de propósito: o Claude nunca lê nada daqui quando alguém roda o `/offpilot:criar`.

## Listas com data

As listas de vícios e de fontes envelhecem. Cada correção que vira moda vira vício na rodada seguinte. Revise cada lista a cada seis meses e, ao revisar, troque a data nesta tabela. A data não volta para dentro da parte: lá ela só gasta token.

| Lista | Arquivo | Conferida em | O que revisar |
|---|---|---|---|
| Fontes queimadas | `skills/criar/partes/fontes/queimadas.md` | 2026-10 | Toda fonte que vira a "alternativa ao Inter" acaba entrando aqui. Use os critérios de "Como identificar uma nova", no fim do arquivo. |
| Acervo de fontes | `skills/criar/partes/fontes/acervo.md` | 2026-10 | Conferido na base pública do Google Fonts. Veja se cada fonte ainda existe, ainda tem `latin-ext`, tem os pesos da tabela e não foi para `queimadas.md`. Se o total mudar, troque o "167" no acervo e no README. |
| Vícios visuais | `skills/criar/partes/plano-visual/vicios.md` | 2026-10 | Procure a correção que virou moda, como foi o creme com terracota. |
| Vícios de painel | `skills/criar/partes/informacao/vicios-de-painel.md` | 2026-10 | Peças e ordens de bloco que passaram a sair em toda tela. |
| Vícios de texto de tela | `skills/criar/partes/textos/vicios-de-tela.md` | 2026-10 | Frases de botão, erro e tela vazia que passaram a sair em toda tela. |
| Vícios de texto corrido | `skills/criar/partes/textos/vicios-de-prosa.md` | 2026-10 | As palavras da moda mudam, as estruturas ficam. Revise sobretudo a lista de palavras infladas. |
