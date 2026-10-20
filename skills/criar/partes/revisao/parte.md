# Revisão

As outras skills do Off Pilot decidem uma interface antes de ela existir. Esta olha uma que já existe, feita pelo Claude, por outra IA ou por uma pessoa, e aponta o que a deixa genérica, confusa ou frágil.

Esta é uma parte do Off Pilot, lida pela skill `criar` do Off Pilot. As outras partes ficam em pastas irmãs desta, em `../<nome-da-parte>/parte.md`. Quando este texto citar outra skill ou um arquivo dela, leia de lá.

Arquivos e skills ligados a esta:

- [qualidade.md](qualidade.md): o mínimo que toda tela precisa cumprir (contraste, teclado, toque, larguras, formulários).
- skill `plano-visual`, com `vicios.md`: a cara do projeto e os vícios visuais.
- skill `informacao`, com `vicios-de-painel.md`: o que aparece na tela de sistema e em que ordem.
- skill `estrutura-de-pagina`: o formato da página de site.
- skill `textos`, com `vicios-de-tela.md`: os textos.

## Regra de ouro: revisar não é refazer

- Mantenha a cara do projeto: cores, fontes, cantos e o detalhe-assinatura que já existem.
- Mexa só no que foi pedido e aprovado. Não arrume "de quebra" o que está fora do escopo.
- Se o problema é a direção inteira (a tela toda é genérica, ou o esqueleto está errado), diga isso com clareza e proponha refazer pela `plano-visual` e pela `informacao` ou `estrutura-de-pagina`. Não esconda uma reforma dentro de uma revisão.

## 1. Entender a tela

- Leia o código da tela e o `.offpilot/direcao.md`, se existir.
- Descubra o tipo de tela: operar (sistema), vender (site) ou ler (ajuda, relatório).
- O que não der para descobrir, pergunte numa mensagem só, com palpites:
  - quem usa e para quê: "Imagino que é o gerente olhando o movimento do dia. É isso?";
  - o que incomoda: "Você quer uma revisão geral ou tem algo que já te incomoda?";
  - o que não pode mudar: "Tem alguma coisa aqui que é da marca ou que o cliente pediu e precisa ficar?".

## 2. Ver a tela

Se der, abra a tela e tire print no computador e no celular. Julgue pelo que aparece, não só pelo código. Se possível, veja também os estados: vazio, carregando, com erro e com muitos dados.

## 3. Diagnosticar em seis passadas

Faça as passadas nesta ordem e anote cada problema com o lugar exato onde está.

**1. Cara de IA.**
- Passe a tela pelas listas de vícios: `vicios.md` (plano-visual), `vicios-de-painel.md` (informacao) e `vicios-de-tela.md` (textos).
- **Teste do vizinho:** a tela serviria igualzinha para um negócio de outro ramo? O painel do posto trocado pelo do mercado, sem mexer em nada além do nome? Se sim, a tela não tem cara própria.

**2. Informação.**
- Qual é a pergunta da tela? Se não está claro, isso já é um problema.
- O maior bloco responde à pergunta?
- O fato mais urgente aparece primeiro, junto da ação?
- Tem bloco que não responde a pergunta nenhuma?
- A tarefa mais comum está a um clique?
- Os números fecham, e toda comparação diz contra o quê?
- Em página de site: a primeira tela responde à primeira pergunta do visitante e tem a ação?

**3. Texto.**
- Teste do apagar: que textos podem sair sem a tela ficar menos clara?
- As palavras são do ramo, e a mesma coisa tem o mesmo nome em todo lugar?
- Botão, erro, tela vazia e confirmação seguem a skill `textos`?
- Português: maiúscula, plural, formatos de data e dinheiro, acento e crase.

**4. Fuga do plano.** Se existe `.offpilot/direcao.md`, compare: cor fora da paleta, fonte que não é a escolhida, canto diferente, detalhe-assinatura sumido ou repetido em tudo. Se não existe, anote isso e ofereça tirar um plano da tela atual pela `plano-visual` no fim.

**5. Qualidade mínima.** Passe por [qualidade.md](qualidade.md).

**6. Casos extremos.** Imagine a tela com:
- nome ou endereço muito longo, e campo vazio;
- número enorme (R$ 1.234.567,89), zero e negativo;
- lista com nenhum item, com um e com mil;
- imagem que não carrega;
- internet lenta ou caindo, e erro do servidor;
- sessão expirada no meio do uso;
- clique duplo no botão de salvar;
- nome com acento e ç;
- tela de 320 px e zoom de 200%.

## 4. Entregar a lista

Entregue os problemas por gravidade, do mais grave para o mais leve:

1. **Impede o uso:** informação errada ou escondida, ação que não se acha, tela que quebra, falha grave de acessibilidade.
2. **Cara de IA:** a tela é genérica ou cheia de vícios.
3. **Fora de lugar:** informação na ordem errada, bloco sobrando, texto ruim, fuga do plano.
4. **Acabamento:** alinhamento, espaçamento irregular, estado que falta, detalhe de português.

Cada problema em uma linha ou duas: **onde está, o que é, por que atrapalha e como corrigir.** Comece com um resumo de três linhas: o que a tela faz bem, o maior problema e o que você corrigiria primeiro.

**Não mexa em nada ainda.** Pergunte o que a pessoa quer corrigir: tudo, só os níveis 1 e 2, ou itens escolhidos.

## 5. Corrigir

- Corrija só o que foi aprovado.
- Mantenha a cara do projeto (regra de ouro).
- Siga as regras da skill dona de cada assunto: `informacao` para ordem e peças, `textos` para palavras, `plano-visual` para cor e forma.
- Se o projeto não tinha `.offpilot/direcao.md` e a pessoa aceitou, grave o plano tirado da tela no fim.

## 6. Mostrar antes e depois

Se der, tire print da tela antes e depois, no computador e no celular, e mostre lado a lado. Embaixo, a lista curta do que mudou, na mesma ordem de gravidade. Diga também o que ficou de fora e por quê.

## Pedidos específicos

Quando a pessoa pede uma coisa só, rode só as passadas que importam, mas sempre com a regra de ouro e a entrega em lista:

- **"Simplifica" ou "tá poluído":** passadas 2 e 3, cortando o que não responde a nenhuma pergunta e o que passa no teste do apagar.
- **"Blinda" ou "deixa pronto para produção":** passadas 5 e 6.
- **"Dá um acabamento":** passadas 4 e 5, mais os detalhes finos: alinhamentos, espaçamentos iguais para coisas iguais, todos os estados de botão e campo, textos finais.
- **"Tá sem graça" ou "tá chamativo demais":** ajuste a intensidade pelo plano visual (quanta cor, densidade, tamanho do detalhe-assinatura) sem trocar a cara. Mais força num lugar só; mais calma tirando enfeite, não personalidade.
- **"Tá com cara de IA":** passada 1 completa e, se o teste do vizinho falhar, a proposta de refazer pela `plano-visual`.
