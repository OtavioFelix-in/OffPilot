# Changelog

Aqui fica o que muda para quem usa o Off Pilot, versão por versão.

O formato segue o [Keep a Changelog 1.1.0](https://keepachangelog.com/pt-BR/1.1.0/), e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/). Enquanto a versão começar com 0, uma versão nova pode mudar o jeito de usar. Quando isso acontecer, a versão diz o que mudou e o que fazer.

## [Não publicado]

### Adicionado

- Avaliações em `evals/` para o `claude plugin eval`: 15 casos em seis ramos (posto de combustível, estoque de insumos agrícolas, agenda de clínica, landing page de contabilidade, app de academia e extrato de conta digital). Cobrem as perguntas antes do código, o plano, a construção, o "decide você", o pedido que vence a regra e a revisão, mais duas linhas de base com o mesmo pedido sem o comando.
- Dois verificadores em Node, sem dependência nenhuma, em `skills/criar/scripts/`. O `fontes-queimadas.mjs` lê a lista do `queimadas.md` e acha cada fonte escolhida dela no projeto, com arquivo e linha. O `contraste.mjs` calcula o contraste dos pares de cor pelo cálculo da WCAG 2.2 e diz quando não sabe sobre que fundo uma cor fica, em vez de chutar.
- `evals/limpar-historico.mjs`, que tira da conversa gravada tudo o que não é conversa (e-mail da conta, prompt de sistema, caminhos) antes de ela virar caso.
- `CHANGELOG.md`, este arquivo.
- `MANUTENCAO.md`, com a data de cada lista de vícios e de fontes e o que revisar nela. Fica fora de `skills/`, então não gasta token.
- Sumário no começo de todo arquivo das partes com mais de 100 linhas.

### Modificado

- A fonte vai sempre junto com o projeto, em `woff2` e só nos pesos usados. Antes, isso só valia para sistema sem internet. Fonte puxada de CDN manda o IP do visitante para outra empresa. CDN só entra se a pessoa pedir. A revisão confere isso.
- O `SKILL.md` lista cada arquivo das partes pelo caminho, com a hora de ler cada um.
- As partes deixam de se chamar "skill" no texto. Skill agora é só o `/offpilot:criar`.
- A descrição do comando foi escrita para a pessoa, que é quem a vê na lista de comandos. O Claude não recebe essa descrição.
- README: o custo agora é o medido. Parado, quase nada; numa criação completa, cerca de 40 mil tokens de instrução.

### Removido

- As datas de revisão de dentro das listas. Estão no `MANUTENCAO.md`.

## [0.3.0] - 2026-10-20

**Muda o jeito de chamar.** O comando `/offpilot` passou a ser `/offpilot:criar`. Para migrar, atualize o plugin (`claude plugin update offpilot@offpilot`) e troque `/offpilot` por `/offpilot:criar` onde você o tiver anotado.

### Modificado

- A skill saiu de `skills/offpilot/` para `skills/criar/`, e o comando virou `/offpilot:criar`.

## [0.2.0] - 2026-10-20

**Muda o jeito de chamar.** Os seis comandos das partes saíram: `/plano-visual`, `/fontes`, `/informacao`, `/estrutura-de-pagina`, `/textos` e `/revisao` (na forma completa, `/offpilot:fontes` e assim por diante). Para usar uma parte só, peça ao `/offpilot`: "troca a fonte", "revisa essa tela".

### Modificado

- Um comando só, o `/offpilot`. As seis skills viraram partes internas dele, em `skills/offpilot/partes/<nome>/parte.md`, lidas pelo caminho.

## [0.1.0] - 2026-10-20

### Adicionado

- Primeira versão como plugin do Claude Code, com manifesto do plugin e da loja e licença MIT.
- O comando `/offpilot`: perguntas uma vez só, uma aprovação antes do código e revisão do próprio trabalho.
- Seis skills, cada uma com o seu comando: `plano-visual`, `fontes` (acervo de 167 fontes e lista de queimadas), `informacao`, `estrutura-de-pagina` (24 formatos), `textos` e `revisao` (com a qualidade mínima).
- Nenhuma skill entra sozinha: todas só rodam quando a pessoa chama.
