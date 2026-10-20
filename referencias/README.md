# Referências

Material de partida do Off Pilot. Cada pasta é uma skill aberta que resolve uma parte do problema. Vai ser estudada, cortada e reescrita até virar parte do Off Pilot.

Cada pasta tem o nome do que a skill faz. A origem e a licença de cada uma estão em [CREDITOS.md](CREDITOS.md). A análise de cada uma, e a verificação de segurança, estão em [ANALISE.md](ANALISE.md).

## O que o Off Pilot procura aqui

1. **Variedade visual.** Dois sistemas diferentes, como um mercado e um posto, não podem sair com a mesma cor, fonte, cantos e estrutura.
2. **Distribuição da informação.** Saber o que é importante na tela, o que é secundário e o que nem devia estar ali. Os textos entram aqui: frase sem sentido também é informação mal distribuída.

## As pastas

| Pasta | O que faz | Frente |
|---|---|---|
| plano-visual (reescrita: [skills/plano-visual](../skills/plano-visual/)) | Monta um plano de cor, fonte e layout e o compara com o que sairia para qualquer pedido parecido antes de codar. | visual, textos |
| [refino-de-interface](refino-de-interface/) | Separa a tela pelo uso (vender, operar, ler), faz as perguntas iniciais e tem comandos de revisão, corte e acabamento. | visual, informação, textos |
| [direcao-de-arte](direcao-de-arte/) | Tira a ideia visual do mundo do cliente. Tem um guia de telas de sistema: a pergunta da tela, o que vem primeiro, o que sai. | visual, informação |
| [estrutura-de-pagina](estrutura-de-pagina/) | Escolhe a estrutura da página antes da cor e não repete estrutura de um projeto para o outro. | visual, estrutura |
| [catalogo-de-design](catalogo-de-design/) | Tabelas de paletas, fontes e regras de UX por tipo de produto. | catálogo |
| [texto-sem-cara-de-ia](texto-sem-cara-de-ia/) | Revisa texto procurando 26 padrões de escrita de IA. | textos |

### plano-visual

Já reescrita como skill do Off Pilot, em [skills/plano-visual](../skills/plano-visual/). O que ela era antes:

- Manda descobrir **o assunto, o público e a função principal** antes de desenhar. A cara do projeto sai do mundo do assunto.
- Lista os cinco visuais em que o design gerado por IA se amontoa hoje, incluindo o "remédio" que virou vício (fundo creme + serifa + terracota).
- Processo em duas passadas: monta um plano (cor, tipo, layout, princípios), compara com o que sairia para qualquer pedido parecido e só depois codifica.
- **Estrutura visual é informação.** Numeração 01/02/03 só se o conteúdo for sequência de verdade.
- Seção sobre textos de tela: nome pelo que o usuário entende, botão diz o que acontece, erro explica e não pede desculpa.

Limite: cuida de visual e texto, não de perguntar nem de hierarquia de informação em tela de sistema.

### refino-de-interface

A mais completa e a mais próxima da frente 2.

- **Modos da tela:** *Persuade* (landing, vender), *Operate* (sistema, painel, tarefa), *Read* (documentação) e *Experience* (portfólio). O modo vem da tela, não do produto. Em *Operate*, clareza e padrão conhecido ganham da expressão.
- Em *Operate*, o mundo do produto entra só por quatro coisas: **fonte, paleta, densidade e um detalhe-assinatura**. Nunca entra pelo layout nem pelos controles.
- `reference/layout.md`: teste do olho semicerrado, agrupamento por proximidade, densidade conforme a frequência de uso.
- `reference/shape.md`: o roteiro de perguntas antes de construir.
- `reference/distill.md`, `clarify.md`, `critique.md`: cortar o que não precisa, arrumar texto, revisar.
- Guarda `PRODUCT.md` e `DESIGN.md` no projeto como memória do que foi decidido.

Limite: é grande (46 arquivos) e várias etapas dependem de um programa próprio que não está aqui.

### direcao-de-arte

- `references/tells.md`: o melhor catálogo de vícios, **datado por onda** (2023–24, 2025, 2025–26). Toda lista de "use isso no lugar" vira o próximo vício.
- `references/app-screens.md` (1.199 linhas): telas de sistema, painel e admin. Entra direto na frente 2.
- Sorteia direções de um acervo de 247 sites, mas a escolha parte do produto.
- `references/copy.md` e `critique.md`: textos, e o ciclo de olhar o print e corrigir.

### estrutura-de-pagina

- **Escolhe a macroestrutura antes de qualquer cor** (`references/macrostructures.md`). Ataca o "sempre a mesma organização".
- `references/anti-patterns.md` e `slop-test.md`: teste de mesmice no fim do trabalho.
- `references/interaction-and-states.md`: estados vazio, carregando e erro.
- Modo `study`: extrai o design de um site ou print de referência.

Limite: só página de apresentação.

### catalogo-de-design

- Não é método, é **catálogo**: 192 tipos de produto com paleta, 74 pares de fonte, 119 regras de UX, em CSV (`data/`).
- `data/google-fonts.csv` foi a base para conferir o acervo da skill de fontes.

Risco: a tabela recomenda a mesma mesmice para todo produto de um tipo. Usar só as regras de UX.

### texto-sem-cara-de-ia

- 26 padrões de texto com cara de IA: "não é X, é Y", trio forçado, travessão em tudo, palavra inflada, negrito decorativo.
- Feita para texto longo. Precisa de uma versão curta para texto de tela.

## O que nenhuma delas faz

Todas partem do pedido e decidem sozinhas. Nenhuma tem uma etapa clara de **perguntar à pessoa o que muda o sistema** antes de começar, que é o centro do Off Pilot. A distribuição da informação aparece em pedaços (os modos do refino-de-interface, o `app-screens.md` da direcao-de-arte), mas nenhuma pergunta "quem olha essa tela e o que essa pessoa precisa ver primeiro".
