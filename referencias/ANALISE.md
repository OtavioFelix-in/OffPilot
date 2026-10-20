# Análise das referências

O que cada skill faz de fato, o que serve para o Off Pilot, o que não serve, e se tem algo escondido.

Feita em 2026-10-20 sobre as cópias desta pasta e sobre os repositórios de origem listados em [CREDITOS.md](CREDITOS.md).

## O objetivo, para comparar

1. **Variedade visual.** O sistema de mercado e o de posto não podem sair com a mesma cara.
2. **Distribuição da informação.** Saber o que é importante na tela, o que é secundário e o que sai. Os textos entram aqui.
3. **Perguntar antes.** O Claude não assume o que muda o sistema.

---

## 1. plano-visual

**O que faz.** É uma instrução única, de 71 linhas, sem script. O Claude assume o papel de diretor de arte de um estúdio cujo cliente já recusou propostas genéricas. O fluxo:

1. Se o pedido não diz o assunto, o público e a função principal, ele propõe os três e confirma.
2. Monta um plano curto: 4 a 6 cores com hex, fontes e seus papéis, layout descrito em uma frase e desenhado em ASCII, princípios.
3. Compara o plano com o que sairia para um pedido parecido. O que for genérico, ele troca e diz por quê.
4. Só então codifica, criticando o próprio trabalho por print.

Lista os cinco visuais em que a IA se amontoa hoje (creme + terracota, preto + neon, jornal com filete, kit de cards SaaS, enfeites como rótulo em caixa alta e "→" no botão).

**Serve.**
- O passo 3 é o mecanismo central do Off Pilot em uma frase: *"isso sairia igual para qualquer pedido parecido?"*.
- *"Estrutura visual é informação"*: numeração, borda e rótulo só quando dizem algo sobre o conteúdo.
- A seção de textos: nome pelo que o usuário entende, botão diz o que faz, erro explica sem pedir desculpa, tela vazia convida a agir.

**Não serve.** Pensa em página de apresentação (fala de *hero*). Não trata tela de sistema e quase não pergunta.

## 2. refino-de-interface

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
- `shape.md` é o melhor roteiro de perguntas das seis skills. Duas ou três perguntas por rodada, uma rodada por padrão. Assume o óbvio e pede correção. Nunca pergunta valor de CSS.
  - Rodada 1: para que serve, quem chega e em que situação, o que precisa entender ou fazer, o que só esse produto tem.
  - Rodada 2: dados reais e volumes, estados (vazio, erro, carregando), o que não pode mudar.
- `layout.md`: teste do olho semicerrado, agrupamento por proximidade, densidade conforme a frequência de uso.

**Não serve.**
- É grande demais para copiar a estrutura. O valor está nas ideias.
- Depende de um binário próprio. O Off Pilot deve ser só texto.

## 3. direcao-de-arte

**O que faz.** Primeiro decide se a tarefa é uma **página** (lida e rolada) ou uma **tela de app** (onde se trabalha). Cada uma tem o seu fluxo.

Para página: inventário de 8 a 12 coisas que só esse cliente tem (nome, rua, materiais, rituais, números) → argumento (cada seção é uma afirmação com prova; seção sem afirmação sai) → um script sorteia 3 direções de um acervo de 247 sites e o Claude escolhe a que carrega o assunto → a "ideia" ("nesta página, [algo do cliente] vira [o recurso]") → textos antes do código → constrói → inspetor no navegador → print em 3 larguras.

O teste do concorrente: põe o concorrente mais próximo na frase da ideia. Se ainda funciona, a ideia é da categoria, não do cliente.

**`app-screens.md` é a peça mais importante para a frente 2.** Saiu de 23 telas reais medidas. O fluxo:

1. **Inventário dos dados e das tarefas:** os objetos da tela e seus campos, volumes reais, **quem abre essa tela, com que frequência e em que aparelho**, e o que a pessoa faz em seguida.
2. **A única pergunta da tela:** "as vendas de hoje entraram?". Ela decide **o que é maior, o que vem primeiro e o que fica de fora**.
3. **O achado do dia:** o fato que mais pede atenção vai onde se lê primeiro, junto da ação.
4. Cada bloco responde à próxima pergunta. **Bloco sem pergunta é apagado.**
5. A tarefa mais frequente fica a um clique.

Mais regras: cor vai no dado, não na moldura; número de destaque é texto, não card com ícone; dado que aparece duas vezes é uma variável só; todo "+5" diz contra o quê.

Tem 7 estilos de tela de sistema, escolhidos pelo uso (sessão longa ou olhada rápida, dinheiro ou mídia, equipe ou uma pessoa).

**Serve.** É praticamente a frente 2 pronta. "A única pergunta da tela" e "bloco sem pergunta sai" respondem ao seu "o Claude não sabe o que é relevante". E `tells.md` é o melhor catálogo de vícios.

**Não serve.**
- Depende de scripts Node, de Chrome e de um acervo fixo.
- Decide no lugar de perguntar: *"se o pedido for vago, decida e diga em uma linha"*. É o contrário do Off Pilot.

## 4. estrutura-de-pagina

**O que faz.** Para página. Fluxo:

1. **Sempre pergunta antes**, mesmo com pedido detalhado: público, a única ação da página, tom ("limpo e moderno não é tom"). Se a pessoa disser "vai", ele deduz e **diz em uma frase o que escolheu**.
2. Escolhe uma de **21 macroestruturas** (bento, documento longo, manifesto, catálogo, carta...) antes de qualquer cor.
3. Escolhe um de 21 temas e um tipo de menu e de rodapé.
4. **Regra de rodízio:** guarda num log o que usou e não repete estrutura, tema, menu nem rodapé no projeto seguinte.
5. Antes de entregar, dá nota de 1 a 5 em seis eixos e refaz o que ficou abaixo de 3.

**Serve.**
- O "sempre pergunta, com saída 'vai'" mais a frase "fui com X, Y, Z" é um bom modelo para não virar interrogatório.
- O rodízio com memória ataca de frente "10 sistemas iguais".
- "Texto honesto": não inventa número, depoimento nem logo de cliente.

**Não serve.**
- É só para página de apresentação. Não ajuda em tela de sistema.
- Os 21 temas são um catálogo fixo. Quem usa muito vai reconhecer os temas, e eles viram a nova mesmice.

## 5. catalogo-de-design

**O que faz.** Um script Python busca em tabelas CSV (192 tipos de produto, cada um com paleta e raciocínio próprios, 88 estilos, 74 pares de fonte e 119 regras de UX) e devolve um "design system" pronto para o tipo de produto.

**Serve.**
- A lista de prioridades de UX (acessibilidade, toque, desempenho...) como piso de qualidade.
- As regras de formulário e navegação.

**Não serve, e vai contra o objetivo.** A tabela de raciocínio manda, para "SaaS (geral)": *Hero + Features + CTA*, *Glassmorphism*, *azul de confiança*. Ela fixa no arquivo exatamente a mesmice que o Off Pilot quer evitar. Dois produtos do mesmo tipo recebem a mesma resposta. **Usar só como lista de regras, nunca como fonte de escolha visual.**

## 6. texto-sem-cara-de-ia

**O que faz.** Revisa textos procurando 26 padrões de escrita de IA, baseados na página "Signs of AI writing" da Wikipédia: "não é X, é Y", frase de efeito no fim, trio forçado, travessão em tudo, palavra inflada, negrito decorativo, explicar o que o leitor já sabe.

**Serve.** Para os textos da tela, os "frases que não fazem sentido". A parte de "inflação" e "escrever para o leitor errado" vale para rótulo, mensagem de erro e tela vazia.

**Não serve.** Foi feita para prosa longa. Precisa de uma versão curta para texto de interface.

---

## Mapa: quem cobre o quê

| | Variedade visual | Distribuição da informação | Perguntar antes | Textos |
|---|---|---|---|---|
| plano-visual | **forte** (plano + teste do genérico) | média (estrutura é informação) | fraca | **forte** |
| refino-de-interface | média (modos, 4 contribuições) | **forte** (modos, layout) | **forte** (`shape.md`) | média |
| direcao-de-arte | **forte** (inventário, ideia, concorrente) | **forte** (`app-screens.md`) | fraca (decide sozinho) | média |
| estrutura-de-pagina | **forte** (rodízio com memória) | fraca | **forte** (sempre pergunta) | média |
| catalogo-de-design | **contra** | fraca | nenhuma | nenhuma |
| texto-sem-cara-de-ia | nenhuma | nenhuma | nenhuma | **forte** |

**A base do Off Pilot, se for montar hoje:**
- perguntas: `shape.md` do refino-de-interface + o "sempre pergunta, com saída" do estrutura-de-pagina;
- tipo de tela: os modos do refino-de-interface (vender × operar × ler);
- distribuição da informação: o fluxo de `app-screens.md` do direcao-de-arte (pergunta da tela, achado, bloco sem pergunta sai);
- variedade: o teste do genérico do plano-visual + o teste do concorrente do direcao-de-arte + o rodízio do estrutura-de-pagina;
- vícios: `tells.md` do direcao-de-arte + os 5 visuais do plano-visual;
- textos: a seção de escrita do plano-visual + um texto-sem-cara-de-ia curto.

**O que nenhuma faz, e é o espaço do Off Pilot:** perguntar *quem olha essa tela e o que essa pessoa precisa ver primeiro*, num sistema de trabalho, antes de desenhar. Elas resolvem a variedade e a distribuição separadamente. Nenhuma liga as duas a uma conversa com a pessoa.

---

## Segurança: tem prompt escondido?

**Nos textos copiados, não.** O que foi verificado nos 191 arquivos:

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
| direcao-de-arte | `assets.mjs` busca imagens em APIs públicas (Openverse, Wikimedia, Met Museum, Art Institute, Archive.org, NASA). Não usa chave e não envia dados do projeto, só a palavra buscada. | Baixo. |
| direcao-de-arte | Guarda o histórico de sorteios em `~/.direcao-de-arte/history.json`. | Baixo. |
| estrutura-de-pagina | O modo `study` busca a URL que a pessoa passar. Algumas imagens de exemplo apontam para o site do autor. | Baixo. Uma página com essas imagens faz o navegador pedir arquivos ao site dele. |
| catalogo-de-design | Os scripts Python só leem os CSV locais. Nenhuma chamada de rede. | Nenhum. |
| texto-sem-cara-de-ia | Só texto. | Nenhum. |

**Para o Off Pilot:** ser só texto (Markdown), sem binário, sem hook e sem chamada de rede. Assim ele é auditável por qualquer pessoa em minutos, o que também vira argumento no README.
