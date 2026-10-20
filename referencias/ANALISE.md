# Análise das referências

O que cada cópia desta pasta faz, o que serve para o Off Pilot, o que não serve, e se tem algo escondido.

Feita em 2026-10-20 sobre as cópias desta pasta e sobre os repositórios de origem listados em [CREDITOS.md](CREDITOS.md).

## O objetivo, para comparar

1. **Variedade visual.** O sistema de mercado e o de posto não podem sair com a mesma cara.
2. **Distribuição da informação.** Saber o que é importante na tela, o que é secundário e o que sai.
3. **Perguntar antes.** O Claude não assume o que muda o sistema.

---

## refino-de-interface

**O que faz.** É um sistema completo, com 46 arquivos e mais de 20 comandos (`shape`, `critique`, `layout`, `distill`, `clarify`, `polish`...). Mantém dois arquivos no projeto: `PRODUCT.md` (quem usa, para quê) e `DESIGN.md` (decisões visuais). Depende de um programa próprio que ele baixa na primeira vez.

O ponto principal são os **modos da tela**, definidos pelo que o usuário vai fazer nela:

| Modo | Tela | O que manda |
|---|---|---|
| Persuade | landing, venda | ousadia, ponto de vista |
| **Operate** | sistema, painel, admin | clareza, padrão conhecido, a ferramenta some na tarefa |
| Read | documentação | estrutura para entender |
| Experience | portfólio | a obra na frente |

Em **Operate**, o produto entra na tela só por quatro coisas: **fonte, paleta, densidade e um detalhe-assinatura**. Layout, navegação e controles seguem o padrão que o usuário já conhece.

**Serve.**
- Os modos resolvem uma armadilha: "variedade" num PDV ou num sistema de posto não pode virar estranheza. O frentista precisa achar o botão sem pensar. A variedade vem da paleta, da fonte, da densidade e de um detalhe do mundo do posto.
- `shape.md` é um bom roteiro de perguntas. Duas ou três perguntas por rodada, uma rodada por padrão. Assume o óbvio e pede correção. Nunca pergunta valor de CSS.
  - Rodada 1: para que serve, quem chega e em que situação, o que precisa entender ou fazer, o que só esse produto tem.
  - Rodada 2: dados reais e volumes, estados (vazio, erro, carregando), o que não pode mudar.
- `layout.md`: teste do olho semicerrado, agrupamento por proximidade, densidade conforme a frequência de uso.

**Não serve.**
- É grande demais para copiar a estrutura. O valor está nas ideias.
- Depende de um binário próprio. O Off Pilot deve ser só texto.

## catalogo-de-design

**O que faz.** Um script Python busca em tabelas CSV (192 tipos de produto, cada um com paleta e raciocínio próprios, 88 estilos, 74 pares de fonte e 119 regras de UX) e devolve um "design system" pronto para o tipo de produto.

**Serve.**
- A lista de prioridades de UX (acessibilidade, toque, desempenho...) como piso de qualidade.
- As regras de formulário e navegação.

**Não serve, e vai contra o objetivo.** A tabela de raciocínio manda, para "SaaS (geral)": *Hero + Features + CTA*, *Glassmorphism*, *azul de confiança*. Ela fixa no arquivo exatamente a mesmice que o Off Pilot quer evitar. Dois produtos do mesmo tipo recebem a mesma resposta. **Usar só como lista de regras, nunca como fonte de escolha visual.**

---

## Segurança: tem prompt escondido?

**Nos textos copiados, não.** O que foi verificado nos arquivos:

| Verificação | Resultado |
|---|---|
| Caracteres invisíveis (largura zero, inversão de direção, tags Unicode) | nenhum |
| Blocos em base64 | nenhum |
| Frases de injeção ("ignore as instruções anteriores", "não conte ao usuário", "system prompt") | nenhuma |
| Comentários HTML | só exemplos de código e marcadores do próprio refino-de-interface |
| Texto direcionado ao modelo dentro dos CSV | nenhum |
| Autopromoção ou pedido de estrela | nenhum |
| Commit ou push automático | nenhum |

**Comportamentos que não são escondidos, mas que é preciso conhecer** (todos estão nos scripts dos repositórios de origem, que **não** foram copiados para cá):

| Skill | O quê | Risco |
|---|---|---|
| refino-de-interface | Na primeira vez, baixa um executável publicado pelo autor no GitHub e o executa. | Médio. Ele confere o SHA-256 e recusa se não bater. Mesmo assim, é rodar um binário de terceiro. |
| refino-de-interface | O comando `hooks on` grava um *hook* em `.claude/settings.local.json` (ou em `~/.claude/settings.json`, se for global). Depois disso, a cada edição de arquivo, o resultado do detector **entra no contexto do Claude como aviso do sistema**. | Médio. É injeção de contexto por design, documentada. Só liga se a pessoa pedir, mas muda o comportamento de todas as sessões do projeto. |
| refino-de-interface | Grava `.refino-de-interface/` no projeto e `~/.refino-de-interface/bin`. | Baixo. |
| catalogo-de-design | Os scripts Python só leem os CSV locais. Nenhuma chamada de rede. | Nenhum. |

**Para o Off Pilot:** ser só texto (Markdown), sem binário, sem hook e sem chamada de rede. Assim ele é auditável por qualquer pessoa em minutos, o que também vira argumento no README.
