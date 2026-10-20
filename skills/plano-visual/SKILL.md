---
name: plano-visual
description: Decide a cara de um sistema, site ou tela antes de escrever código. Pergunta o que muda o visual, separa tela de vender, de operar e de ler, tira cor, forma e detalhe do mundo físico do produto e mostra o plano para a pessoa aprovar. Use ao criar uma interface nova, ao refazer o visual de uma existente, ou quando a pessoa disser que está genérico, igual a tudo ou "com cara de IA".
---

# Plano visual

Sem um plano, o Claude começa a codar com os valores de sempre, e todo sistema sai igual: a mesma cor, os mesmos cantos arredondados, o mesmo card com sombra. Esta skill decide a cara do projeto antes da primeira linha de código, a partir do produto e de quem usa, e a pessoa aprova antes de construir.

Arquivos e skills ligados a esta:

- [vicios.md](vicios.md): o que a IA sempre repete. Nada dali entra sem motivo.
- skill `fontes`: escolhe a fonte. Este plano não escolhe fonte por conta própria.

## Quando não usar

- **O projeto já tem cara.** Se há marca, design system ou um visual coerente no código, a tela nova herda o que existe. Leia o que há e siga.
- **É um pedaço dentro de uma tela pronta**, como um botão, um modal ou uma seção nova. Também herda.
- **A pessoa já definiu o visual.** O que ela pediu vale, mesmo que esteja em [vicios.md](vicios.md).

## 1. Ler o que já existe

Antes de perguntar qualquer coisa, olhe o projeto:

- o arquivo `.offpilot/direcao.md`, se existir: decisões já tomadas;
- CSS, variáveis, tema, logo e imagens;
- a stack e onde o sistema roda.

O que der para descobrir lendo não vira pergunta.

## 2. Perguntar o que muda o visual

Faça **duas ou três perguntas numa mensagem só**, cada uma com o seu palpite, para a pessoa só confirmar ou corrigir. Escolha as que mais mudam o resultado:

- **Quem usa, onde e por quanto tempo.** "Imagino o frentista em pé, no sol, olhando de relance no celular. É isso, ou é o gerente no escritório?"
- **O que a tela precisa fazer.** "A tela principal é para lançar abastecimento rápido, certo?"
- **Gosto e repulsa.** "Tem alguma marca, cor ou sistema que você gosta ou que não quer nem de perto?"
- **Marca.** "A empresa já tem logo ou cores?"

Pergunta ruim é a que não muda nada ("prefere azul ou verde?") ou a que pede valor técnico ("qual raio de borda?").

Se a pessoa disser "vai", "tanto faz" ou "decide você", siga com os palpites e diga numa frase o que assumiu. Não faça uma segunda rodada, a não ser que uma resposta abra uma dúvida que muda o plano.

## 3. Saber o tipo de tela

O mesmo produto tem telas de tipos diferentes. O site do posto e o sistema do caixa do posto não seguem a mesma regra.

- **Vender** (landing, site da empresa, página de produto): a pessoa decide e age. Aqui cabe ousadia: composição fora do comum, título grande, muita cor.
- **Operar** (sistema, painel, cadastro, PDV, admin): a pessoa trabalha, às vezes o dia inteiro. O layout, a navegação e os controles seguem o que ela já conhece: botão parece botão, tabela parece tabela. A personalidade entra só por quatro portas: **cor, fonte, densidade e um detalhe-assinatura.** Um sistema diferente não pode virar um sistema estranho.
- **Ler** (relatório, documentação, ajuda): a pessoa quer entender. Prioridade para a leitura confortável e para achar as coisas.

Anote o tipo de cada tela do pedido.

## 4. Achar o mundo do produto

A cara do projeto sai das coisas reais do ramo, não da categoria "sistema". Liste de cinco a oito objetos físicos do mundo do produto:

- **posto:** a bomba, a placa de preço com números grandes, a cor da bandeira, a faixa da pista, o cupom;
- **mercado:** a etiqueta amarela de oferta, a gôndola, o cupom fiscal, o carrinho, a balança;
- **clínica:** a receita, o prontuário, a pulseira de identificação, a placa do consultório.

De cada objeto, anote o que ele empresta: uma cor, uma forma, um material, um jeito de mostrar número.

Depois escolha a **ideia** do projeto numa frase: *"neste sistema, [algo do mundo do produto] vira [uma decisão visual]"*. Por exemplo: "neste sistema, a placa de preço do posto vira o jeito de mostrar o valor do litro: números enormes, contraste máximo".

**Teste da ideia:** troque o produto por um de outro ramo (o mercado, se o pedido é o posto). Se a frase continua fazendo sentido, a ideia é genérica. Procure algo que só existe no mundo deste produto.

## 5. Montar o plano

Cada decisão tem um motivo tirado das etapas 2 a 4. "Moderno e limpo" não é motivo.

- **Cor.** De 4 a 6 cores, cada uma com nome, hex e papel: fundo, texto, ação principal, destaque, estados (sucesso, alerta, erro). Diga também **quanta cor** a tela leva:
  - em tela de operar, a cor vai no dado e na ação, não na moldura;
  - em tela de vender, pode haver áreas inteiras de cor.
- **Fonte.** Use a skill `fontes`. O plano só registra a combinação escolhida.
- **Forma.**
  - **Cantos:** retos, pouco ou muito arredondados, e por quê. Não use o mesmo arredondado em tudo: cantos diferentes podem separar coisas diferentes.
  - **Como separar áreas:** linha, mudança de tom ou espaço. Sombra só onde algo flutua de verdade, como um menu aberto.
  - **Ícones:** com ou sem, que estilo, que espessura.
- **Densidade.** Folgada ou compacta, conforme o uso. Quem lança cem itens por hora quer compacto. Quem olha uma vez por dia aguenta folga.
- **Esqueleto.** Uma frase e um desenho em texto da organização geral: onde fica a navegação e onde fica a área de trabalho. A ordem dos blocos dentro da tela, o que vem primeiro e o que sai, é trabalho da distribuição da informação, não deste plano.
- **Detalhe-assinatura.** **Um só**, com nome concreto e tirado da ideia: "o valor do litro aparece como na placa da pista", "o total do carrinho imita o rodapé do cupom fiscal". É o único lugar da tela que pode chamar atenção. O resto fica quieto.
- **Movimento.** Só onde mostra o que mudou: algo abriu, salvou ou deu erro. Nada de animação de entrada em tudo.

## 6. Testar contra o genérico

Antes de mostrar o plano:

1. **Teste do vizinho.** Escreva, de cabeça, o plano que você faria para o produto vizinho: o mercado, se o pedido é o posto. Se os dois saem parecidos (mesma cor, mesmos cantos, mesmo esqueleto), o plano é genérico. Refaça a parte que se repetiu.
2. **Teste dos vícios.** Passe o plano por [vicios.md](vicios.md). Cada item que aparecer precisa de um motivo vindo do produto ou do pedido. Sem motivo, sai.
3. **Quando a marca obriga.** Se a marca impõe algo que bate com o vizinho ou com [vicios.md](vicios.md), como as cores da bandeira, mantenha e diga no plano que ficou por causa da marca. A diferença então vem do que a marca não fixa: forma, densidade, esqueleto e detalhe-assinatura.

## 7. Mostrar e esperar o ok

Apresente o plano antes de escrever a interface, neste formato:

```markdown
**Ideia:** neste sistema, <algo do mundo do produto> vira <decisão visual>.

**Tipo de tela:** <operar / vender / ler>, <uma frase do porquê>.

**Cores**
- <nome> <#hex>: <papel>
- ...

**Fonte:** <a combinação escolhida na skill fontes>

**Forma:** cantos <...>, separação por <...>, ícones <...>. <motivo em uma frase>

**Densidade:** <folgada / compacta>. <motivo>

**Esqueleto:** <uma frase> + desenho em texto

**Detalhe-assinatura:** <o detalhe>

**Fica de fora:** <os vícios que o teste encontrou e foram tirados>
```

Se der para gerar uma página, mostre também uma amostra pequena com conteúdo real do produto: o nome, um título, um valor, uma linha de tabela e um botão.

Espere a pessoa aprovar ou corrigir. Se ela corrigir uma parte, refaça só aquela parte e mostre de novo.

## 8. Registrar

Com o plano aprovado, grave-o em `.offpilot/direcao.md`, na raiz do projeto, com a data. As próximas telas leem esse arquivo e mantêm a mesma cara. Se o plano mudar depois, atualize o arquivo e anote a mudança no fim dele.

## 9. Construir

- **Releia [vicios.md](vicios.md) antes de escrever**, não só no fim. Vício entra na hora de escrever, até em texto pequeno como subtítulo e rótulo.
- **Tudo vira variável primeiro:** cores, fontes, cantos, espaçamentos. O resto do código usa só as variáveis. Valor solto no meio do CSS não entra.
- **A ousadia fica num lugar só:** o detalhe-assinatura. Todo o resto segue o plano sem enfeite.
- **Qualidade mínima, sempre:**
  - funciona no celular;
  - dá para usar só com o teclado e o foco é visível;
  - o contraste do texto é suficiente;
  - respeita quem desliga animação no aparelho.
- **Estrutura visual é informação.** Borda, numeração, rótulo e divisória só existem se dizem algo sobre o conteúdo. Numerar 01, 02, 03 só se for passo a passo de verdade.

## 10. Conferir

Se der para ver a tela renderizada, tire print no celular e no computador e compare com o plano:

- a ideia aparece na primeira olhada?
- o detalhe-assinatura está lá, e só ele chama atenção?
- entrou algum item de [vicios.md](vicios.md) que não estava no plano?
- dá para tirar um enfeite sem perder nada? Se der, tire.

## Textos da tela

Até existir a skill de textos do Off Pilot, siga o básico:

- nome pelo que o usuário entende, não pelo que o sistema faz por dentro: "Avisos", não "Configuração de webhook";
- botão diz o que acontece: "Salvar abastecimento", não "Enviar". A mesma ação mantém o mesmo nome até o fim;
- erro diz o que houve e como resolver, sem pedir desculpa;
- tela vazia diz o que fazer para ela deixar de estar vazia;
- dado de exemplo com cara do produto: placa de carro, litro, bico 3. Nada de "João Silva" ou "Lorem ipsum".
