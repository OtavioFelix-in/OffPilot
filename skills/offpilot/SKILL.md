---
name: offpilot
description: Porta de entrada do Off Pilot. Tira o Claude do piloto automático ao criar ou revisar qualquer interface (sistema, painel, site, landing page, tela). Faz as perguntas que mudam o resultado uma vez só, decide a cara, a fonte, a estrutura e o conteúdo da tela antes do código, constrói e revisa o próprio trabalho. Use quando a pessoa chamar /offpilot, ou pedir uma interface que "não pareça feita por IA", "com cara própria" ou "diferente do padrão".
---

# Off Pilot

A pessoa chama `/offpilot` com o que quer: "faz o painel do gerente do posto", "cria o site da padaria", "revisa essa tela". Esta skill conduz o trabalho do começo ao fim, chamando as outras skills do Off Pilot na ordem certa, para que a interface saia com cara própria, a informação no lugar certo e textos de gente.

As skills que ela usa:

| Skill | Decide |
|---|---|
| `plano-visual` | a cara do projeto: cor, forma, densidade, detalhe-assinatura |
| `fontes` | a fonte, entre 3 combinações |
| `informacao` | o que aparece numa tela de sistema, em que ordem e tamanho |
| `estrutura-de-pagina` | o formato de uma página de site |
| `textos` | todo texto da tela, em português do Brasil |
| `revisao` | a revisão do que foi feito, e a qualidade mínima |

## 1. Ler o pedido e o projeto

- Leia o `.offpilot/direcao.md`, se existir. O que estiver lá já foi decidido: não pergunte de novo nem decida diferente sem a pessoa pedir.
- Olhe o projeto: stack, CSS, marca, telas que já existem.
- Se a pessoa chamou `/offpilot` sem dizer nada, pergunte numa frase o que ela quer criar ou revisar, com três exemplos curtos.

## 2. Saber que trabalho é

- **Criar algo novo:** sistema, painel, site, landing page, ou um sistema com site. Siga o passo 4.
- **Revisar algo pronto:** "revisa", "tá genérico", "tá poluído", "melhora essa tela". Siga o passo 5.
- **Uma parte só:** chame só a skill dela, mantendo o resto como está:
  - "troca a fonte" → `fontes`;
  - "arruma os textos" → `textos`;
  - "o que eu ponho nessa tela?" → `informacao`;
  - "como organizo essa página?" → `estrutura-de-pagina`;
  - "muda a cara" → `plano-visual`.

## 3. Perguntar uma vez só

As skills `plano-visual`, `informacao` e `estrutura-de-pagina` têm perguntas próprias. O núcleo junta todas numa mensagem só, para a pessoa não responder a mesma coisa três vezes.

Escolha **de 2 a 4 perguntas**, as que mais mudam o resultado, cada uma com um palpite para a pessoa só confirmar ou corrigir:

- **quem usa, onde e por quanto tempo** ("Imagino o gerente no computador do escritório, abrindo várias vezes ao dia");
- **a pergunta principal da tela** ou **a ação principal da página** ("O painel responde quantos clientes passaram hoje?");
- **o conteúdo real que existe**: fotos próprias, preços, números, depoimentos ("Vocês têm fotos da pista, mas não depoimentos, certo?");
- **marca e gosto** ("Tem logo ou cores? Algum sistema ou site que você gosta ou detesta?").

Não pergunte o que dá para descobrir no projeto. Se a pessoa disser "vai" ou "decide você", siga com os palpites e diga numa frase o que assumiu.

Grave as respostas em `.offpilot/direcao.md`, na seção `## Contexto`. As outras skills leem dali e não perguntam de novo.

## 4. Criar

### 4.1 Decidir (sem código)

Rode, nesta ordem, usando as respostas do passo 3:

1. `plano-visual`: tipo de tela, mundo do produto, ideia, cor, forma, densidade, detalhe-assinatura, teste do vizinho.
2. `fontes`: as 3 combinações, com a amostra se der.
3. Para cada tela de sistema, `informacao`: pergunta da tela, achado, blocos e desenho. Para cada página de site, `estrutura-de-pagina`: formato recomendado e duas alternativas, com desenho.

**Mostre tudo numa mensagem só:** o plano visual, as 3 fontes e o desenho de cada tela ou página. A pessoa aprova ou corrige de uma vez. Se ela corrigir uma parte, refaça só aquela parte.

São no máximo duas esperas antes do código: as respostas às perguntas e esta aprovação.

### 4.2 Construir

- Grave o que foi aprovado em `.offpilot/direcao.md`.
- Construa seguindo o passo "Construir" da `plano-visual` (tudo vira variável, ousadia num lugar só), as regras de peça da `informacao` e o `qualidade.md` da `revisao`.
- Escreva todo texto pela skill `textos`, com o glossário do ramo.
- Use dados de exemplo com cara do produto e volumes reais. O que for exemplo e precisar ser trocado, marque como "[a confirmar]".

### 4.3 Revisar o próprio trabalho

Antes de entregar, rode a `revisao` na tela que você fez, com as seis passadas. Como o trabalho é seu, **corrija sozinho** os problemas dos níveis 1 e 2 (impede o uso e cara de IA) e os que fogem do plano aprovado. Os de nível 3 e 4, corrija se forem simples; se mudam alguma decisão aprovada, liste para a pessoa.

### 4.4 Entregar

Mostre prints no computador e no celular, se der, e um resumo curto:

- a ideia do projeto, em uma frase;
- onde está cada coisa (arquivos criados e o `.offpilot/direcao.md`);
- o que a pessoa precisa confirmar ou trocar (os "[a confirmar]", fotos de exemplo, números);
- o que ficou de fora e por quê.

## 5. Revisar

Rode a skill `revisao`, que já tem as perguntas, as passadas, a lista por gravidade e o antes e depois. Se a revisão concluir que a direção inteira está errada e a pessoa topar refazer, volte ao passo 4 com o que já se sabe.

## Regras que valem sempre

- **Pensar antes de construir, mesmo em pedido pequeno.** Uma tela nova passa pelo plano, ainda que curto. Só pula quando o projeto já tem `.offpilot/direcao.md` e a tela nova só segue o que está lá.
- **O pedido da pessoa vence.** Se ela pediu uma cor, uma fonte ou um formato, use, mesmo que esteja numa lista de vícios. Avise uma vez, se for o caso, e siga.
- **Não invente conteúdo.** Número, depoimento, cliente, prêmio e foto de verdade só entram se a pessoa deu.
- **Português do Brasil** em tudo que a pessoa vê, a não ser que o público seja de outro idioma.
- **O `.offpilot/direcao.md` é a memória do projeto.** Toda decisão aprovada vai para lá, e toda skill lê de lá antes de decidir.

## O arquivo `.offpilot/direcao.md`

Fica na raiz do projeto. Cada skill escreve na sua seção:

```markdown
# Direção do projeto

## Contexto        (offpilot: quem usa, o que faz, conteúdo real, marca)
## Plano           (plano-visual: ideia, tipo de tela, cores, forma, densidade, assinatura)
## Fontes          (fontes: a escolhida, o porquê, as descartadas)
## Glossário       (textos: as palavras do ramo e o que não usar)
## Telas           (informacao: pergunta, achado, tarefa e blocos de cada tela)
## Páginas         (estrutura-de-pagina: formato e seções de cada página)
## Histórico       (toda mudança de decisão, com data)
```
