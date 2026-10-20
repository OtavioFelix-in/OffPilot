# Fontes

Sem orientação, o Claude escolhe sempre entre as mesmas dez fontes. O sistema de um mercado e o de um posto de combustível saem com a mesma letra. Esta skill faz a fonte sair do produto, e a pessoa escolhe entre três caminhos diferentes.

Esta é uma parte do Off Pilot, lida pela skill `offpilot`. As outras partes ficam em pastas irmãs desta, em `../<nome-da-parte>/parte.md`. Quando este texto citar outra skill ou um arquivo dela, leia de lá.

Arquivos desta skill:

- [acervo.md](acervo.md): as fontes permitidas, agrupadas pelo que cada uma lembra.
- [queimadas.md](queimadas.md): as fontes que só entram se a pessoa pedir pelo nome.

## Quando não usar

- O projeto já tem fonte definida (no CSS, no design system ou na marca). Use a que existe.
- A pessoa já disse qual fonte quer. Use a dela, mesmo que esteja em [queimadas.md](queimadas.md).

## 1. Entender o produto

Antes de abrir o acervo, responda para si, em uma linha cada:

- **O que é o produto** e de que ramo.
- **Quem lê a tela**, em que situação e por quanto tempo: o frentista em pé, no sol, olhando de relance; o analista do financeiro sentado oito horas.
- **Que tipo de tela é:**
  - **operar:** sistema, painel, cadastro, PDV, onde a pessoa trabalha;
  - **vender:** landing, site da empresa, onde a pessoa decide;
  - **ler:** documentação, relatório, artigo.
- **Onde roda.** Sistema interno ou sem internet precisa da fonte hospedada junto do projeto, não puxada do Google.

Se faltar uma dessas respostas e ela mudar a escolha, pergunte. Se não mudar, assuma e diga o que assumiu.

## 2. Achar o mundo do produto

Toda atividade já tem letras impressas no seu mundo físico. A fonte boa vem delas, não da categoria "sistema":

- posto: placa de preço do combustível, bomba, sinalização de estrada;
- mercado: etiqueta de gôndola, cartaz de oferta, cupom fiscal;
- clínica: receita, prontuário, placa de consultório;
- oficina: nota de serviço, ferramenta gravada, manual técnico;
- escritório de advocacia: petição, carimbo, papel timbrado.

Liste de três a cinco desses objetos. Depois procure no [acervo.md](acervo.md) os grupos que combinam com eles.

## 3. Montar 3 combinações

Cada combinação tem:

- **título:** a fonte da marca, dos títulos e dos destaques;
- **texto:** a fonte de rótulos, parágrafos, botões e campos;
- **número:** só em tela de operar, a fonte de tabelas, valores e códigos. De preferência a mesma do texto, com números de largura igual.

Uma família só, em pesos diferentes, também é uma combinação válida. Em tela de operar costuma ser a melhor.

Regras para as três:

- **Poucas fontes na mesma tela.** No máximo duas famílias, mais uma só para o detalhe-assinatura, se houver. Uma família em pesos diferentes é melhor que duas famílias. Trocar de fonte a cada bloco ou coluna deixa a tela remendada.
- **Fonte mono só onde a largura fixa serve para algo**, como código, placa de carro ou chave de acesso. Número de tabela usa a fonte do texto com `font-variant-numeric: tabular-nums`.
- **As três vêm de grupos diferentes do acervo.** Três versões do mesmo grupo não são uma escolha.
- **Pelo menos uma sai do mundo do produto** (passo 2), não de um grupo neutro.
- **Nenhuma usa fonte de [queimadas.md](queimadas.md).**
- **Toda fonte cobre o idioma do produto.** Em português, precisa ter acento e ç. O acervo só lista fontes que têm.
- **Em tela de operar:**
  - o texto precisa ser legível em 12 a 14 px e ter pelo menos 4 pesos;
  - os números precisam ter largura igual (`font-variant-numeric: tabular-nums`) para as colunas alinharem;
  - a personalidade fica no título e na marca. Tabela e campo de formulário pedem fonte calma.
- **Em tela de vender:** o título pode ter um peso só e muita personalidade. O texto continua legível.

## 4. Apresentar

Mostre as três **antes de escrever a interface**. Para cada uma:

- o nome das fontes e o grupo do acervo;
- **uma frase sobre por que ela combina com este produto.** Ela tem que citar algo do produto. "Moderna e limpa" não é motivo;
- o que ela custa: "fica mais séria", "pede tamanho maior no celular", "só tem um peso de título".

Se der para gerar uma página, gere uma amostra com as três lado a lado usando **conteúdo real do produto**: o nome, um título de tela, um valor em reais, uma linha de tabela e um botão. Nada de "Lorem ipsum" nem "The quick brown fox".

Depois espere a pessoa escolher. Se ela disser "tanto faz" ou "escolhe você", fique com a que saiu do mundo do produto e diga qual foi.

## 5. Registrar

Depois da escolha, grave em `.offpilot/direcao.md`, na raiz do projeto, o mesmo arquivo em que a skill `plano-visual` guarda o plano:

```markdown
## Fontes
- Data: AAAA-MM-DD
- Escolhida: <título> + <texto> (+ <número>)
- Grupo: <grupo do acervo>
- Por quê: <a frase do passo 4>
- Descartadas: <as outras duas>
```

Se o arquivo já existir, leia-o antes do passo 3. Ao refazer a fonte deste projeto, não repita as descartadas nem a anterior, a menos que a pessoa peça.

## 6. Usar

- Carregue só os pesos que a interface usa.
- Defina as fontes uma vez, como variáveis (`--fonte-titulo`, `--fonte-texto`, `--fonte-numero`), e use só as variáveis no resto do código.
- Coloque uma fonte de reserva parecida: serifada com `serif`, sem serifa com `sans-serif`, mono com `monospace`.
- Se o sistema roda sem internet, baixe os arquivos e sirva junto com o projeto.
