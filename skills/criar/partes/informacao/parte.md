# Informação

Sem orientação, toda tela de sistema que o Claude monta tem a mesma ordem: quatro cards de número no topo, um gráfico grande, dois gráficos pequenos e uma tabela. O painel do posto e o do mercado saem iguais, e nenhum dos dois diz o que importa hoje. Esta parte decide o conteúdo da tela pelo que a pessoa que a usa precisa saber e fazer.

Esta é uma parte do Off Pilot, lida pela skill `criar` do Off Pilot. As outras partes ficam em pastas irmãs desta, em `../<nome-da-parte>/parte.md`. Quando este texto citar outra parte ou um arquivo dela, leia de lá.

Arquivos e partes ligados a esta:

- [pecas.md](pecas.md): regras de número, comparação, gráfico, tabela, formulário e estados (vazio, zero, erro, carregando).
- [vicios-de-painel.md](vicios-de-painel.md): o que a IA repete em toda tela de sistema e o que fazer no lugar.
- parte `plano-visual`: a cara da tela (cor, fonte, forma, densidade). Esta parte cuida do conteúdo.
- parte `textos`: todo texto da tela.

## Quando usar

Em tela onde a pessoa **trabalha**: painel, dashboard, lista, fila, cadastro, detalhe de um registro, PDV, configuração, relatório.

Página de site, que a pessoa lê e rola, segue a parte `estrutura-de-pagina`.

## 1. Fazer o inventário

Antes de desenhar, escreva em poucas linhas:

- **As coisas da tela:** o que ela mostra (abastecimentos, bicos, turnos, clientes) e os campos de cada uma, com unidade.
- **O volume real:** quantas coisas existem e em que faixa os valores andam. No posto: 8 bicos, 700 a 900 clientes por dia, de 20 a 120 por hora. Num sistema novo, os números são pequenos; desenhe para eles também.
- **Quem abre a tela:** a pessoa, com que frequência (uma olhada por dia ou oito horas seguidas) e em que aparelho.
- **O que a pessoa faz depois de olhar:** aprovar, ligar, corrigir, chamar alguém, exportar. E qual dessas tarefas é a mais comum.

O que não der para descobrir lendo o projeto, pergunte numa mensagem só, com palpites, junto com as perguntas da `plano-visual` se as duas estiverem rodando.

## 2. Escrever a pergunta da tela

Toda tela responde primeiro a uma pergunta. Escreva-a em uma linha:

- painel do gerente do posto: "Quantos clientes passaram hoje?";
- tela do caixa do mercado: "Quanto falta para fechar esta compra?";
- agenda da clínica: "Quem é o próximo e já chegou?".

A pergunta decide três coisas:

- **o que é maior:** o bloco que responde à pergunta é o maior da tela, e o maior número da tela é a resposta;
- **o que vem primeiro:** a resposta está no topo, sem rolar;
- **o que fica de fora:** o que não ajuda a responder a esta pergunta nem às próximas vai para outra tela ou some.

Se a pessoa não sabe dizer a pergunta, proponha uma a partir do inventário e confirme.

## 3. Achar o achado

O achado é **o fato de hoje que mais pede atenção**: o bico parado, o produto que vai faltar, o paciente esperando há 40 minutos, a conta que vence amanhã.

- Ele vai onde se lê primeiro: logo abaixo do título, ou como frase embaixo do número principal.
- Ele vem junto da ação que resolve: "Bico 4 parado desde 11:05" e o botão "Chamar manutenção".
- Se não há nada pedindo atenção, não invente. O espaço fica para a resposta.

## 4. Listar os blocos como respostas

Depois da pergunta principal, escreva as próximas perguntas que a pessoa faria, em ordem. Cada uma vira um bloco:

```
Pergunta: quantos clientes passaram hoje?
Achado: bico 4 parado desde 11:05
1. Quantos clientes hoje e como está contra a terça passada?  -> número grande + frase
2. Em que horário vieram?                                     -> gráfico por hora
3. Em que bico e ilha?                                        -> tabela
4. Que combustível levaram? Como pagaram?                     -> duas listas com barra
```

**Bloco sem pergunta é apagado.** Quatro cards de número no topo só ficam se cada um responde a uma pergunta que a pessoa faz. Um gráfico só fica se ninguém consegue a resposta com um número.

Cuidado com a ordem pronta "cards, gráfico grande, dois gráficos, tabela". Se a lista de perguntas chegou nela, confira se não foi por costume.

## 5. Deixar a tarefa comum a um clique

Nomeie a tarefa mais frequente: "conferir o abastecimento suspeito", "chamar o próximo paciente", "repor o produto em falta". O controle dela fica onde a resposta aparece:

- um botão principal no topo, quando é a tarefa da tela inteira;
- uma ação na própria linha, quando é sobre um item;
- um link no achado, quando é sobre o problema do dia.

Tela sem controle para a tarefa principal é relatório, não ferramenta. Se for mesmo só relatório, tudo bem, mas que seja de propósito.

## 6. Desenhar e esperar o ok

Mostre a tela desenhada em texto antes de codar, com os blocos em ordem, os tamanhos relativos e o que acontece no celular:

```
[faixa da marca] Posto Serra Azul                 terça 20/10, 14:32
[achado] Bico 4 parado desde 11:05.               [Chamar manutenção]
┌───────────────┬──────────────────────────────────────────┐
│ 789 clientes  │ clientes por hora: hoje × terça passada  │
│ +39 vs terça  │                                          │
├───────────────┴────────────┬─────────────────────────────┤
│ por ilha e bico (tabela)   │ por combustível             │
│                            │ por forma de pagamento      │
└────────────────────────────┴─────────────────────────────┘
No celular: achado, número, gráfico, tabela sem a coluna de litros, listas.
```

Junto do desenho, diga a pergunta, o achado e a tarefa comum em uma linha cada. Espere a pessoa aprovar ou corrigir.

## 7. Montar com as regras de cada peça

Na construção, siga [pecas.md](pecas.md). Os pontos que mais erram:

- o maior número responde à pergunta da tela, e nenhum outro número é maior que ele;
- toda comparação diz contra o quê, e a cor diz bom ou ruim, não sobe ou desce;
- o gráfico é escolhido pela pergunta que responde, com uma cor de destaque;
- os totais somam as partes que aparecem na tela, e o mesmo fato tem o mesmo valor em todo lugar;
- o zero aparece como zero, a falta de dado como traço, e o vazio diz o que fazer.

## 8. Registrar

Grave no `.offpilot/direcao.md`, numa seção `## Telas`, uma entrada por tela: a pergunta, o achado (o tipo de fato que vira achado), a tarefa comum e a lista de blocos. As próximas telas do sistema leem isso para não repetir informação de uma tela na outra sem motivo.

## 9. Conferir

Antes de entregar, olhe a tela pronta, de preferência por print, e confira:

1. Olhando por cinco segundos, dá para responder à pergunta da tela?
2. O achado é a primeira coisa que chama atenção depois do título?
3. A tarefa comum está a um clique?
4. Algum bloco não responde a nenhuma pergunta? Apague.
5. Os números fecham? Some as partes e compare com o total.
6. Passe por [vicios-de-painel.md](vicios-de-painel.md) e pelo `qualidade.md` da parte `revisao`.
7. Abra no celular: a ordem continua fazendo sentido?
