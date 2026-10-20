# Referências

Skills abertas que já atacam parte do problema do Off Pilot. Estão aqui para estudo: cada pasta é uma cópia sem alteração dos arquivos `.md` da skill original (e dos dados, no caso do UI/UX Pro Max), com a licença do autor ao lado. Nada daqui é código do Off Pilot.

Baixado em 2026-10-20.

## O que o Off Pilot procura nelas

Duas frentes, por enquanto:

1. **Variedade visual.** Dois sistemas diferentes (um mercado, um posto) não podem sair com a mesma cor, fonte, cantos e estrutura.
2. **Distribuição da informação.** Saber o que é importante na tela, o que é secundário e o que nem devia estar ali. Inclui os textos: frase sem sentido também é informação mal distribuída.

## As skills

| Pasta | Origem | Licença | Commit | Frente |
|---|---|---|---|---|
| [anthropic-frontend-design](anthropic-frontend-design/) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache-2.0 | `dbd4588` | visual, textos |
| [impeccable](impeccable/) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 | `dad8dbb` | visual, informação, textos |
| [taste-skill](taste-skill/) | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | `63aba5f` | visual, telas de app |
| [hallmark](hallmark/) | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | `13ac0ec` | visual, estrutura |
| [ui-ux-pro-max](ui-ux-pro-max/) | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT | `56ea9cf` | catálogo (paletas, fontes, regras UX) |
| [humanizer](humanizer/) | [blader/humanizer](https://github.com/blader/humanizer) | MIT | `8c307f3` | textos |

### anthropic-frontend-design

A skill oficial, curta (71 linhas). Vale ler inteira primeiro.

- Manda descobrir **o assunto, o público e a função principal** antes de desenhar. A cara do projeto sai do mundo do assunto.
- Lista os cinco visuais em que o design gerado por IA se amontoa hoje, incluindo o "remédio" que virou vício (fundo creme + serifa + terracota).
- Processo em duas passadas: monta um plano (cor, tipo, layout, princípios), compara com o que sairia para qualquer pedido parecido e só depois codifica.
- Regra que serve direto à frente 2: **estrutura visual é informação**. Numeração 01/02/03 só se o conteúdo for sequência de verdade.
- Tem uma seção boa sobre textos de tela: nome pelo que o usuário entende, botão diz o que acontece, erro explica e não pede desculpa.

Limite: cuida de visual e texto, não de perguntar nem de hierarquia de informação em tela de sistema.

### impeccable

A mais completa e a mais próxima da frente 2.

- **Modos da tela:** *Persuade* (landing, vender), *Operate* (sistema, painel, tarefa), *Read* (documentação) e *Experience* (portfólio). O modo vem da tela, não do produto. Em *Operate*, clareza e padrão conhecido ganham da expressão. É a base para tratar o PDV do mercado diferente da landing do mercado.
- Em *Operate*, o "mundo" do produto entra só por quatro coisas: **tipo, paleta, densidade e um movimento-assinatura**. Nunca entra pelo layout nem pelos controles.
- `reference/layout.md`: teste do olho semicerrado (dá para achar o primário, o secundário e os grupos?), agrupamento por proximidade, ritmo, densidade conforme frequência de uso.
- `reference/distill.md`, `clarify.md`, `shape.md`, `critique.md`: cortar o que não precisa, arrumar texto, planejar antes de codar, revisar.
- Usa `PRODUCT.md` e `DESIGN.md` no projeto como memória do que foi decidido. Parecido com o "documento de direção" da ideia original.

Limite: é grande (46 arquivos) e depende de um binário próprio para várias etapas.

### taste-skill

- `references/tells.md`: o melhor catálogo de vícios, **datado por onda** (2023–24, 2025, 2025–26). A tese: toda lista de "use isso no lugar" vira o próximo vício, então o lugar das proibições é procedimento, não um produto substituto.
- Sorteia direções de um acervo de 247 sites de galeria, mas o sorteio parte do produto.
- `references/app-screens.md` (1.199 linhas): telas de sistema, painel, admin. Entra direto na frente 2.
- `references/copy.md` e `critique.md`: textos e laço de olhar e corrigir com print.

### hallmark

- **Escolhe a macroestrutura antes de qualquer cor** (`references/macrostructures.md`). Ataca o "sempre a mesma organização".
- `references/anti-patterns.md` e `slop-test.md`: teste de mesmice no fim do trabalho.
- `references/structure.md`, `layout-and-space.md` e `interaction-and-states.md`: estados vazio, carregando e erro.
- Tem modo `study`: extrai o design de um site ou print de referência.

Limite: foco em landing page e página pública.

### ui-ux-pro-max

- Não é método, é **catálogo**: 192 paletas por tipo de produto, 74 pares de fonte, 119 regras de UX, 25 tipos de gráfico, em CSV (`data/`).
- Útil como fonte de opções quando a pessoa não sabe o que quer.

Risco: catálogo fixo usado sem critério vira a mesmice seguinte, que é justamente o aviso do taste-skill.

### humanizer

- 26 padrões de texto com cara de IA, baseado no "Signs of AI writing" da Wikipédia: "não é X, é Y", trio forçado, travessão em tudo, palavra inflada, negrito decorativo.
- É para prosa, mas cobre o "frases que não fazem sentido" das telas.

## Vistas e não copiadas

- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) (MIT): diagramas editoriais, contra o visual Mermaid padrão. Foge do escopo de tela.
- [nexu-io/open-design](https://github.com/nexu-io/open-design) (Apache-2.0): é um aplicativo de design, não uma skill.
- [github.com/topics/agent-skills](https://github.com/topics/agent-skills): lista geral, onde as de cima aparecem.

## O que nenhuma delas faz

Todas partem do pedido e decidem sozinhas. Nenhuma tem uma etapa clara de **perguntar à pessoa o que muda o sistema** antes de começar, que é o centro do Off Pilot. A distribuição de informação aparece em pedaços (os modos do impeccable, o `app-screens.md` do taste-skill), mas nenhuma pergunta "quem olha essa tela e o que essa pessoa precisa ver primeiro".
