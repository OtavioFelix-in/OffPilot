# Peças da tela

Regras para cada tipo de informação numa tela de sistema. Formatos de número, data e dinheiro seguem a parte `textos`.

## Número de destaque

- **É texto, não card.** O número vem com o rótulo em cima, em letra menor, e a unidade junto. Nada de card só para ele com ícone num círculo colorido.
- **O maior número responde à pergunta da tela.** Ele é visivelmente maior que os outros, e nenhum outro número da tela é maior que ele.
- **Poucos números lado a lado.** De dois a quatro, quando cada um responde a uma pergunta. Se cada número só repete o título de um bloco que vem embaixo, tire a fileira e ponha cada número no topo do seu bloco.
- **Sem minigráfico em cada número.** A tendência tem o seu próprio gráfico.
- **Negrito com moderação.** Peso normal ou meio-negrito já destaca um número grande. Negrito pesado só se for dinheiro e for a resposta da tela.

## Comparação

- **Sempre com a base:** "39 a mais que na terça passada até 14:32", "12% abaixo da meta do mês". Nunca "+39" ou "↑12%" sozinho.
- **A cor diz bom ou ruim, não sobe ou desce.** Mais clientes é bom; mais tempo de espera é ruim; menos erro é bom. Bom em verde, ruim na cor de alerta, sem mudança em cinza.
- **Mudança zero ou sem base é cinza:** "igual a terça passada", "primeiro dia, sem comparação".
- **Uma comparação por número.** Se precisar de mais, é um bloco à parte.
- **Previsão diz de onde vem:** "No ritmo da terça passada, o dia fecha perto de 1.410."

## Gráfico

Escolha pelo que a pessoa quer saber:

| Pergunta | Use | Não use |
|---|---|---|
| Como mudou no tempo? | linha, ou barras se forem poucos períodos | área com degradê |
| Qual é maior? (poucos itens) | barras horizontais, em ordem do maior para o menor | pizza, barras em ordem alfabética |
| Que parte do todo? | lista com barra e porcentagem; pizza só com 2 ou 3 partes | pizza com muitas fatias, donut gordo |
| Está na meta? | barra com uma marca na meta, ou o número e a falta em texto | velocímetro |
| Como se espalha? | histograma | média sozinha |
| Uma coisa depende da outra? | pontos (dispersão) | duas linhas em eixos diferentes |
| É um número só | o número | qualquer gráfico |

Regras de todo gráfico:

- **Uma cor de destaque**, no dado que responde à pergunta (hoje, o mês atual, a meta). O resto em cinza.
- **Comparação do mesmo tipo de dado:** o período anterior em linha tracejada cinza, por baixo.
- **Pouca moldura:** de 3 a 5 linhas de grade bem claras, ou nenhuma. Sem linha de eixo dos dois lados.
- **Sem legenda para uma série só.** O título já diz o que é.
- **Marque o momento que importa**, como a hora atual ou o dia em que algo mudou, com uma linha e uma palavra.
- **Gráfico de tempo com linha reta**, sem curva suavizada e sem bolinha em cada ponto.
- **Se a linha fica parada quase o tempo todo**, o gráfico não merece a largura toda. Dê dois terços e ponha a próxima resposta ao lado.

## Tabela

- **Número alinhado à direita**, com algarismos de largura igual e as mesmas casas decimais. Texto alinhado à esquerda.
- **Separação por linha fina**, sem zebra e sem faixa colorida no cabeçalho.
- **Cabeçalho em letra normal**, menor e cinza, sem caixa alta.
- **Um status por linha**, em texto ou numa marca pequena, com cor clara e texto escuro. Nada de etiqueta saturada com letra branca.
- **Ação só onde há ação.** Um botão na linha que precisa dele, não um menu de três pontinhos em todas.
- **Lista longa cortada** em 5 a 10 linhas com "Ver todos", em vez de paginação embaixo de uma lista curta.
- **Linha que pede atenção** ganha um fundo leve na cor de alerta e a situação escrita ("Parado desde 11:05"). Uma por problema, não a tabela inteira colorida.
- **No celular:** as colunas menos importantes somem, ou cada linha vira um bloco com o dado principal em cima.

## Lista e fila

- **O mais urgente primeiro:** o que vence antes, o que espera há mais tempo, o que está com problema.
- **Cada item mostra o que decide a ação:** quem, o quê, desde quando e a situação. O resto fica no detalhe.
- **A ação do item fica no item:** "Chamar", "Aprovar", "Responder".

## Formulário

- **Rótulo visível em cima do campo.** O exemplo dentro do campo não substitui o rótulo.
- **Ordem do jeito que a pessoa tem a informação na mão.** Placa antes de modelo, se ela está olhando o carro.
- **Só o que é necessário.** Campo opcional diz "(opcional)"; campo que ninguém usa sai.
- **Erro embaixo do campo**, assim que a pessoa sai dele, dizendo como corrigir.
- **Um botão principal**, no fim, com o nome da ação ("Salvar abastecimento").
- **Valor que o sistema já sabe vem preenchido:** data de hoje, filial do usuário, último valor usado.

## Estados

- **Zero real aparece como zero:** "0 clientes", "R$ 0,00". Pode ficar cinza se a frase ao lado diz o próximo passo.
- **Dado que falta ou não se aplica é um traço cinza (—)**, pequeno. Nunca "--" em tamanho de número grande, que parece carregando.
- **Contagens seguem o filtro.** Se o filtro mostra só etanol, os totais e as abas mostram só etanol.
- **Bloco vazio mantém a moldura e o título** e ganha uma frase: "Nenhum bico parado hoje." Se ajudar, mostre a referência no lugar: "Na terça passada, o pico foi às 12h."
- **Carregando:** a moldura do bloco aparece já no tamanho final, com o texto do que está vindo. A tela não pula quando o dado chega.
- **Erro num bloco** fica no bloco, dizendo o que falhou e com "Tentar de novo". O resto da tela continua funcionando.
- **Vermelho é sinal, não enfeite:** uma marca vermelha por problema. Se tudo está vermelho, nada está.

## Dados que fecham

- **O total soma as partes que aparecem na tela.** Some os valores arredondados que estão na tela, não o valor bruto, para não dar um centavo de diferença.
- **O mesmo fato tem o mesmo valor em todo lugar.** O horário do pico, o total do dia e o bico parado vêm de um lugar só e aparecem iguais em todos os blocos.
- **A mesma coisa tem o mesmo nome em todo lugar** (glossário da parte `textos`).
- **Dados de exemplo** com volumes reais do ramo e números pequenos quando o sistema é novo. Nada de totais redondos e crescimento de 300% numa conta de uma semana.

## Densidade

A densidade é três coisas mudando juntas: altura da linha, espaço interno e tamanho da letra. Não diminua a letra e mantenha o espaço.

- **Espaçosa:** tela de olhar uma vez por dia, com poucos dados (até uns 25 números). Linhas altas, letra de 15 a 16 px.
- **Média:** visão geral, lista de trabalho (25 a 50 números). O padrão da maioria das telas.
- **Compacta:** monitoramento, conferência, tela usada horas seguidas (100 ou mais números). Letra de 13 a 14 px, linhas baixas, mas com bastante espaço entre os grupos.

Espaço que sobra porque o grid não serve para os dados (coluna vazia em todas as linhas, card esticado até a altura do vizinho) parece inacabado. Espaço que vem de um grid fixo e de distâncias repetidas parece calmo.

## Navegação

- **Poucos destinos, sem menu lateral.** Um sistema com três ou quatro telas pode ter só uma barra no topo.
- **Menu lateral na cor do fundo**, com o item atual marcado por um tom leve ou pela cor do texto. Nada de menu escuro com o item atual numa pílula colorida.
- **Barra do topo só com o que é usado:** o nome do que está aberto, a busca se houver o que buscar, a troca de filial ou de conta. Sininho e foto de perfil só se tiverem função.
- **O sistema diz de quem é:** nome do produto e da empresa ou filial no topo.
