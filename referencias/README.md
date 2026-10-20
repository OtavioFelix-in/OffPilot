# Referências

Material de estudo do Off Pilot: cópias de skills abertas que ainda vão ser estudadas e reescritas. Cada pasta tem o nome do que a skill faz. A origem e a licença estão em [CREDITOS.md](CREDITOS.md), e a análise de cada uma, com a verificação de segurança, em [ANALISE.md](ANALISE.md).

Quando uma pasta é reescrita do zero como skill do Off Pilot, ela sai daqui. As skills prontas ficam em [skills/](../skills/).

## As pastas

| Pasta | O que faz |
|---|---|
| [refino-de-interface](refino-de-interface/) | Separa a tela pelo uso (vender, operar, ler), faz as perguntas iniciais e tem comandos de revisão, corte e acabamento. |
| [catalogo-de-design](catalogo-de-design/) | Tabelas de paletas, fontes e regras de UX por tipo de produto. |

### refino-de-interface

A mais completa e a mais próxima da frente 2.

- **Modos da tela:** *Persuade* (landing, vender), *Operate* (sistema, painel, tarefa), *Read* (documentação) e *Experience* (portfólio). O modo vem da tela, não do produto. Em *Operate*, clareza e padrão conhecido ganham da expressão.
- Em *Operate*, o mundo do produto entra só por quatro coisas: **fonte, paleta, densidade e um detalhe-assinatura**. Nunca entra pelo layout nem pelos controles.
- `reference/layout.md`: teste do olho semicerrado, agrupamento por proximidade, densidade conforme a frequência de uso.
- `reference/shape.md`: o roteiro de perguntas antes de construir.
- `reference/distill.md`, `clarify.md`, `critique.md`: cortar o que não precisa, arrumar texto, revisar.
- Guarda `PRODUCT.md` e `DESIGN.md` no projeto como memória do que foi decidido.

Limite: é grande (46 arquivos) e várias etapas dependem de um programa próprio que não está aqui.

### catalogo-de-design

- Não é método, é **catálogo**: 192 tipos de produto com paleta, 74 pares de fonte, 119 regras de UX, em CSV (`data/`).

Risco: a tabela recomenda a mesma mesmice para todo produto de um tipo. Usar só as regras de UX.
