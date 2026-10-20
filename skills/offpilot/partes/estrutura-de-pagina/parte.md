# Estrutura de página

Sem orientação, toda página que o Claude monta tem a mesma ordem: título grande no meio, uma frase, dois botões, três cards de recursos, depoimentos, preços, perguntas e um botão final. O site do posto, o da padaria e o do escritório de advocacia saem com o mesmo esqueleto. Esta skill escolhe o formato da página a partir do que o negócio tem para mostrar e do que o visitante quer saber.

Esta é uma parte do Off Pilot, lida pela skill `offpilot`. As outras partes ficam em pastas irmãs desta, em `../<nome-da-parte>/parte.md`. Quando este texto citar outra skill ou um arquivo dela, leia de lá.

Arquivos e skills ligados a esta:

- [formatos.md](formatos.md): os 24 formatos de página, cada um com do que precisa, quando usar e quando não usar.
- skill `plano-visual`: cor, fonte, forma e a ideia do projeto. Esta skill cuida só da estrutura.
- skill `textos`: todo texto das seções.

## Quando usar

Em página que a pessoa **lê e rola**: site de empresa, landing page, página de produto, de serviço, de evento, portfólio, cardápio online, página de ajuda.

Tela onde a pessoa **trabalha** (sistema, painel, cadastro) não usa esta skill. Ela segue o layout que o usuário já conhece, como manda a `plano-visual`.

Se a página já existe e a pessoa só quer mudar uma seção, mantenha o formato dela.

## 1. Ler o que já existe

Olhe o `.offpilot/direcao.md`. Ele pode ter o plano visual, o glossário e os formatos já usados em outras páginas do projeto. Olhe também as páginas que já existem no código.

## 2. Levantar o conteúdo real

O formato depende do que existe. Antes de escolher, descubra o que o negócio **tem de verdade**:

- **fotos próprias** do lugar, do produto, da equipe ou do trabalho;
- **números reais** que provam algo (anos de casa, clientes atendidos, prazo de entrega);
- **depoimentos reais**, com nome;
- **uma tela de produto** para mostrar, se for software;
- **lista de coisas com preço** (cardápio, serviços, planos);
- **um processo em etapas** que o cliente percorre;
- **a história** de quem fundou ou de como começou;
- **endereço, horário e contato**, se o negócio tem lugar físico;
- **datas**, se é evento.

O que não der para descobrir lendo o projeto, pergunte numa mensagem só, com palpites, junto com as perguntas da `plano-visual` se as duas estiverem rodando: "Imagino que vocês têm fotos da pista e da loja, mas não depoimentos de cliente. É isso?"

**Nunca planeje em cima do que não existe.** Formato de depoimento sem depoimento real, ou de foto sem foto, vira página falsa.

## 3. Saber o que o visitante quer

Escreva em uma linha cada:

- **A ação:** a única coisa que a página precisa fazer a pessoa fazer. Ligar, chamar no WhatsApp, ir até o lugar, pedir orçamento, comprar, se inscrever, agendar.
- **As perguntas de quem chega**, na ordem em que surgem. No site de um posto: "fica onde?", "abre agora?", "quanto está a gasolina?", "tem lava-jato e loja?". No de um software: "o que é?", "serve para mim?", "quanto custa?".

A primeira pergunta e a ação precisam estar resolvidas **na primeira tela**, sem rolar.

## 4. Escrever o argumento

Liste as seções da página como respostas às perguntas do passo 3, em ordem, uma linha cada:

```
1. Primeira tela: onde fica e se está aberto agora, com o botão "Como chegar"
2. Preço do litro hoje, por combustível
3. Serviços: lava-jato, troca de óleo, loja de conveniência
4. Horários por dia da semana
5. Rodapé: endereço, telefone, WhatsApp, CNPJ
```

**Seção que não responde a nenhuma pergunta sai.** Logos de cliente, "nossos valores" e "por que nos escolher" só entram se alguém de fato perguntaria isso.

## 5. Escolher o formato

1. Abra [formatos.md](formatos.md) e **descarte os formatos cujo conteúdo necessário não existe** (passo 2).
2. Entre os que sobraram, fique com os que servem à ação e à primeira pergunta.
3. **Rodízio:** se outra página do mesmo projeto, ou outra página feita nesta conversa, já usa um formato, prefira outro quando o conteúdo permitir. Páginas do mesmo site compartilham cor, fonte, menu e rodapé, mas não precisam ter o mesmo esqueleto.
4. Escolha **um formato recomendado e duas alternativas de grupos diferentes** do [formatos.md](formatos.md).

## 6. Mostrar e esperar a escolha

Para cada uma das três opções, mostre:

- o nome do formato;
- uma frase sobre por que ele serve a este negócio, citando o conteúdo real;
- um desenho em texto da página, de cima para baixo, com a primeira tela marcada.

```
Balcão (recomendado): quem procura posto quer saber onde fica e se está aberto.

┌─────────────────────────────── primeira tela ┐
│ Posto Serra Azul                             │
│ Av. Amazonas, 4.200. Aberto agora, 24 horas  │
│ [Como chegar]  [WhatsApp]                    │
│ Gasolina R$ 5,89   Etanol R$ 3,99   S10 ...  │
└──────────────────────────────────────────────┘
  Serviços: lava-jato, troca de óleo, loja
  Horários por dia
  Mapa
  Rodapé: endereço, telefone, CNPJ
```

Espere a pessoa escolher. Se ela disser "tanto faz", fique com a recomendada e diga qual foi.

## 7. Montar o esqueleto

Com o formato escolhido, defina para cada seção:

- **o que mostra**, com o conteúdo real;
- **o tamanho relativo**: a seção que responde à primeira pergunta é a maior; as outras vão diminuindo;
- **o que acontece no celular**: a ordem pode mudar, o que é lado a lado vira um embaixo do outro, e a ação continua a um toque. Telefone e WhatsApp viram links que ligam e abrem a conversa direto.

Topo e rodapé seguem o conteúdo, não um molde:

- **Menu:** só os destinos que existem e que alguém procura. Uma página só, com poucas seções, pode não ter menu nenhum.
- **Rodapé:** o que o visitante procura no fim da página. Num negócio físico: endereço, horário, telefone, CNPJ. Num software: preço, contato, termos. Nada de quatro colunas de links que não levam a lugar nenhum.

## 8. Registrar

Grave no `.offpilot/direcao.md`, numa seção `## Páginas`, uma entrada por página:

```markdown
### <nome da página>
- Formato: <nome>
- Por quê: <a frase do passo 6>
- Seções: <a lista do passo 4>
- Data: AAAA-MM-DD
```

## 9. Conferir

Depois de construir:

- **A primeira tela responde à primeira pergunta e tem a ação?** Confira no celular também.
- **Teste do vizinho:** um negócio de outro ramo teria a mesma lista de seções? Se sim, o esqueleto é genérico. Volte ao passo 4.
- **Sequência pronta:** a ordem virou título, cards de recursos, depoimentos, preços, perguntas e botão final? Só pode ficar assim se cada seção responde a uma pergunta real.
- **Conteúdo falso:** algum número, depoimento, logo de cliente ou foto foi inventado para preencher o formato? Tire, ou troque de formato.
- Passe pela lista de vícios da `plano-visual` (seção Estrutura) e pelo `qualidade.md` da skill `revisao`.

## Estudar uma referência

Quando a pessoa manda um site ou um print e diz "quero algo assim":

1. **Leia a referência.** Se for um link, leia a página e o CSS dela. Se for um print, olhe a imagem.
2. **Descreva o que ela faz**, sem copiar:
   - qual formato de [formatos.md](formatos.md) ela usa, ou que mistura;
   - o que aparece na primeira tela e como ela responde à primeira pergunta;
   - a ordem das seções;
   - a densidade: muito espaço ou muito conteúdo;
   - como ela usa tipo, cor e imagem, em palavras.
3. **Mostre o que vale levar para este projeto** e o que não serve, porque o conteúdo ou o negócio é outro.
4. **Use a descrição como ponto de partida** dos passos 5 e 6. A referência vira uma das três opções, adaptada ao conteúdo real.

Nunca copie texto, imagem, logo, ícone ou código da referência. Se o link for de template pago (ThemeForest, Envato, loja de templates), não estude: peça para a pessoa dizer o que gosta nele.
