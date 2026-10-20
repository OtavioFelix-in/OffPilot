---
name: textos
description: Escreve e revisa os textos de uma interface em português do Brasil, como títulos, botões, rótulos, mensagens de erro, telas vazias, avisos, confirmações, landing pages e textos de ajuda. Corta o texto que não precisa estar na tela e escreve o resto como alguém do ramo escreveria. Use ao criar ou revisar qualquer texto que aparece numa tela, ou quando a pessoa disser que o texto está estranho, genérico, com cara de tradução ou "com cara de IA".
---

# Textos

O Claude escreve em português como quem traduz do inglês: "Bem-vindo de volta!", "Ops, algo deu errado", "Gerencie seus itens", "Deletar", "Sucesso!". E enche a tela de frase que não precisa estar ali: subtítulo que repete o título, legenda que explica o óbvio, boas-vindas num sistema de trabalho. Esta skill escreve só o que a tela precisa, do jeito que um brasileiro que trabalha naquele ramo escreveria.

Arquivos desta skill:

- [portugues.md](portugues.md): convenções de português de interface (maiúscula, infinitivo, formatos de data e dinheiro, palavras traduzidas).
- [vicios-de-tela.md](vicios-de-tela.md): os textos de tela que a IA repete e o que fazer no lugar.
- [vicios-de-prosa.md](vicios-de-prosa.md): os vícios de texto corrido, para landing page, ajuda, relatório e e-mail.

## Quando não usar

- **Texto fixado pela marca ou pela lei**, como slogan, termo de uso ou aviso legal. Não mexa.
- **Texto que a pessoa escreveu.** Revise só se ela pedir, e mantenha o jeito dela.

## 1. Listar os textos da tela

Antes de escrever, liste todo texto que a tela vai ter e o trabalho de cada um. Todo texto tem um destes trabalhos:

- **nomear:** diz o que é (título, rótulo de campo, cabeçalho de coluna);
- **agir:** diz o que acontece ao clicar (botão, link);
- **orientar:** diz o que fazer quando não é óbvio (ajuda de campo, tela vazia);
- **avisar:** diz o que aconteceu (erro, sucesso, alerta).

Texto sem trabalho nesta lista não entra.

## 2. Teste do apagar

Para cada texto da lista, pergunte: **"se eu apagar, a tela continua clara?"** Se continua, apague.

Quase sempre sai:

- subtítulo que repete o título com outras palavras;
- "Bem-vindo", "Olá, Fulano" e boas-vindas em geral num sistema de trabalho;
- legenda que descreve o que a pessoa está vendo ("Aqui você vê seus abastecimentos");
- instrução de como usar um controle comum ("Clique no botão abaixo para salvar");
- rótulo pequeno em cima de um título;
- frase de efeito ou slogan dentro do sistema;
- texto de ajuda num campo que o rótulo já explica.

Depois do teste, a tela tem menos texto e cada um faz um trabalho.

## 3. Falar a língua do ramo

Use a palavra de quem trabalha ali, não a do sistema:

- **posto:** abastecimento, bico, ilha, frentista, litro, troca de óleo, turno;
- **mercado:** gôndola, ruptura, validade, PDV, encarte, quebra;
- **clínica:** consulta, retorno, prontuário, convênio, guia.

Nunca use os nomes genéricos de sistema: "item", "registro", "entidade", "recurso", "objeto", "dados", "conteúdo".

**A mesma coisa tem o mesmo nome em todas as telas.** Se é "abastecimento" na lista, é "abastecimento" no botão, no aviso e no relatório. Nada de "abastecimento" aqui e "venda" ali.

Grave as palavras escolhidas no `.offpilot/direcao.md`, numa seção `## Glossário`, com uma linha por termo: o termo, o que significa e o que **não** usar no lugar.

## 4. Escrever cada peça

Siga também [portugues.md](portugues.md) em tudo.

**Título de tela.** O nome do que tem na tela. Sem slogan, sem verbo de ação.
- Certo: "Abastecimentos de hoje"
- Errado: "Gerencie seus abastecimentos de forma simples"

**Botão.** Verbo no infinitivo e, quando houver mais de uma ação na tela, o objeto: "Salvar abastecimento", "Exportar planilha", "Chamar manutenção". O aviso que vem depois usa a mesma palavra: "Abastecimento salvo".
- Errado: "Enviar", "Confirmar", "OK", "Clique aqui", "Saiba mais" sem dizer sobre o quê

**Link.** O texto do link diz para onde ele leva: "Ver abastecimentos de ontem". Nunca "clique aqui" nem "veja mais".

**Rótulo de campo.** Sempre visível, curto, sem dois-pontos no fim: "Placa do veículo". O texto de dentro do campo (placeholder) é só um exemplo de preenchimento ("ABC1D23") e nunca substitui o rótulo.

**Ajuda de campo.** Só quando o campo tem uma regra que não dá para adivinhar: "Só números, sem pontos". Fica embaixo do campo, aparecendo antes do erro.

**Erro de campo.** Diz o que está errado e como corrigir, embaixo do campo, logo que a pessoa sai dele.
- Certo: "A placa tem 7 caracteres, como ABC1D23."
- Errado: "Campo inválido", "Preencha corretamente", "Erro!"

**Erro geral.** O que aconteceu, o que a pessoa pode fazer e, se ajudar o suporte, um código no fim. Sem "Ops", sem pedir desculpas, sem culpar a pessoa.
- Certo: "Não foi possível salvar o abastecimento porque a conexão caiu. Tente de novo; o que você digitou continua aqui."
- Errado: "Ops! Algo deu errado. Tente novamente mais tarde."

**Tela vazia.** Diga por que está vazia e o que fazer. São casos diferentes:
- primeira vez: "Nenhum abastecimento hoje ainda. Os abastecimentos aparecem aqui assim que as bombas registram.";
- filtro sem resultado: "Nenhum abastecimento de etanol neste turno." com o botão "Limpar filtro";
- erro: use a regra do erro geral.

**Confirmação de algo que não se desfaz.** A pergunta diz exatamente o que vai acontecer, e o botão repete o verbo.
- Certo: título "Excluir 3 abastecimentos?", texto "Eles saem do relatório do dia. Não dá para desfazer.", botões "Excluir" e "Cancelar"
- Errado: "Tem certeza?", com os botões "Sim" e "Não"

**Aviso de sucesso.** Curto, no particípio, sem exclamação: "Abastecimento salvo", "Planilha exportada". Se a ação mudou algo que a pessoa não vê, diga onde está: "Planilha exportada para Downloads".

**Carregando.** Se demora mais de um segundo, diga o que está carregando: "Carregando abastecimentos de hoje". Nada de "Aguarde..." sozinho.

**Números.** Sempre com unidade e, se for comparação, com a base: "39 clientes a mais que na terça passada até 14:32", não "+39". Plural e formato seguem [portugues.md](portugues.md).

**Dados de exemplo.** Com cara do produto e do Brasil: placa ABC1D23, bico 3, R$ 5,89 o litro, "Carlos, frentista do turno da manhã". Nunca "João Silva", "Empresa X", "Lorem ipsum", "Item 1".

## 5. Tom pelo tipo de tela

O tipo de tela vem do plano visual (skill `plano-visual`):

- **operar** (sistema, painel, cadastro): curto, neutro, direto. A pessoa está trabalhando e lê de relance. Sem exclamação, sem emoji, sem piada.
- **vender** (landing, site): pode ter voz e personalidade, mas cada frase diz algo concreto sobre o produto. Slogan vazio sai ("a solução completa para o seu negócio").
- **ler** (ajuda, documentação, relatório): explica em ordem, com frases completas, e responde a dúvida logo no começo.

Em todos: trate a pessoa por "você". Sem "nós da empresa", sem "o usuário", sem "Prezado".

## 6. Texto corrido

Landing page, ajuda, e-mail, relatório e descrição de produto seguem [vicios-de-prosa.md](vicios-de-prosa.md). Duas regras valem sempre:

- **Não invente fato.** Número, depoimento, nome de cliente, prêmio ou "usado por milhares de empresas" só entram se a pessoa deu. Se falta, deixe um marcador visível ("[número de clientes a confirmar]") e avise.
- **Se a pessoa der um texto dela como exemplo,** imite o jeito dela: tamanho de frase, palavras, pontuação.

## 7. Conferir

Antes de entregar:

1. Leia a tela em voz alta como se fosse a pessoa do ramo. Alguma frase soa traduzida, de robô ou de propaganda?
2. Faça o teste do apagar de novo.
3. Passe por [vicios-de-tela.md](vicios-de-tela.md) e, se tiver texto corrido, por [vicios-de-prosa.md](vicios-de-prosa.md).
4. Confira se cada coisa tem o mesmo nome em todo lugar, como no glossário.
5. Confira os formatos de [portugues.md](portugues.md): maiúscula, data, dinheiro, plural, acento e crase.

## Quando não mexer

- Nome próprio, nome de produto e marca ficam como são, inclusive em inglês ("Shell V-Power", "Pix").
- Palavra em inglês que o próprio ramo usa no dia a dia fica ("app", "delivery" num restaurante), mas só se é assim que essa pessoa fala.
- Termo técnico ou legal com sentido exato (CNPJ, NF-e, DANFE) fica.
