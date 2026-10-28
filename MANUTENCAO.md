# Manutenção

Notas para quem mantém o Off Pilot. Este arquivo fica fora de `skills/` de propósito: o Claude nunca lê nada daqui quando alguém roda o `/offpilot:criar`.

## Listas com data

As listas de vícios e de fontes envelhecem. Cada correção que vira moda vira vício na rodada seguinte. Revise cada lista a cada seis meses e, ao revisar, troque a data nesta tabela. A data não volta para dentro da parte: lá ela só gasta token.

| Lista | Arquivo | Conferida em | O que revisar |
|---|---|---|---|
| Fontes queimadas | `skills/criar/partes/fontes/queimadas.md` | 2026-10 | Toda fonte que vira a "alternativa ao Inter" acaba entrando aqui. Use os critérios de "Como identificar uma nova", no fim do arquivo. |
| Acervo de fontes | `skills/criar/partes/fontes/acervo.md` | 2026-10 | Conferido na base pública do Google Fonts. Veja se cada fonte ainda existe, ainda tem `latin-ext`, tem os pesos da tabela e não foi para `queimadas.md`. Se o total mudar, troque o "167" no acervo e no README. |
| Vícios visuais | `skills/criar/partes/plano-visual/vicios.md` | 2026-10 | Procure a correção que virou moda, como foi o creme com terracota. |
| Vícios de painel | `skills/criar/partes/informacao/vicios-de-painel.md` | 2026-10 | Peças e ordens de bloco que passaram a sair em toda tela. |
| Vícios de texto de tela | `skills/criar/partes/textos/vicios-de-tela.md` | 2026-10 | Frases de botão, erro e tela vazia que passaram a sair em toda tela. |
| Vícios de texto corrido | `skills/criar/partes/textos/vicios-de-prosa.md` | 2026-10 | As palavras da moda mudam, as estruturas ficam. Revise sobretudo a lista de palavras infladas. |

## Como publicar

Rode tudo na raiz do repositório, nesta ordem. Pule um passo só se souber por quê.

1. **Suba a `version` no `.claude-plugin/plugin.json`.** Sem isso, ninguém recebe a atualização: com a versão fixa no manifesto, o Claude Code só troca a cópia instalada quando a versão muda. Troque também o selo de versão no topo do `README.md`.
2. **Atualize o `CHANGELOG.md`.** A seção `[Não publicado]` vira `[x.y.z] - AAAA-MM-DD`, e uma `[Não publicado]` vazia volta para o topo. Se a versão muda o jeito de usar (comando novo, comando que sai, arquivo que muda de lugar), escreva no começo da versão o que mudou e o que a pessoa precisa fazer.
3. **Valide:** `claude plugin validate .` precisa terminar em `Validation passed`.
4. **Rode os evals,** como manda a seção "Evals" abaixo. Cada execução é paga. Compare com a rodada anterior (o relatório de cada rodada fica em `evals/results/<data>/report.html`) e não publique com caso que piorou sem saber por quê.
5. **Confira a tag:** `claude plugin tag . --dry-run` mostra a tag que seria criada (`offpilot--vx.y.z`) e confere se o `plugin.json` e a loja concordam.
6. **Só então crie a tag:** `claude plugin tag . --push` cria a tag e a envia ao GitHub. Antes, envie os commits com `git push`.

## Evals

Os casos ficam em `evals/`, um por pasta, para o `claude plugin eval`. Cada execução e cada juiz é uma chamada paga.

| Etapa | Casos | O que confere |
|---|---|---|
| A. Pergunta antes | `a-posto`, `a-estoque`, `a-clinica`, `a-contabilidade`, `a-academia`, `a-extrato`, `sem-pedido` | nenhum arquivo de código criado; de 2 a 4 perguntas, cada uma com palpite |
| Linha de base | `base-posto`, `base-contabilidade` | o mesmo pedido da etapa A sem o comando, com os mesmos graders |
| B. Plano | `b-posto`, `b-contabilidade` | o plano com 3 fontes e o desenho; nenhuma fonte queimada; ainda sem código; o contexto gravado |
| C. Construir | `c-posto` | `direcao.md` antes da tela; sem fonte queimada, Lorem ipsum, emoji nem CDN de fonte; `tabular-nums` |
| Decide você | `decide-voce` | não pergunta de novo e diz o que assumiu |
| O pedido vence | `pedido-vence` | usa a Inter e o roxo pedidos e avisa no máximo uma vez |
| Revisar | `revisar-extrato` | lista por gravidade e não mexe na tela sem perguntar |

### Como rodar

```bash
claude plugin eval . --runs 1 --ablation none --model claude-sonnet-5-5 --judge-model sonnet \
  --allow-tools Write Edit --scaffold --max-cost-usd 5 --no-publish
```

- `--ablation none`: sem o plugin, `/offpilot:criar` é um comando que não existe, e o Claude só responde que ele não está instalado. A comparação com o Claude sem o Off Pilot vem dos casos `base-*`. Com `disable-model-invocation: true`, o plugin carregado não entra num pedido feito sem o comando.
- `--judge-model sonnet`: com o juiz padrão (Haiku), as rubricas das perguntas deram resultado diferente para respostas iguais.
- `--scaffold`: o caso `revisar-extrato` copia a tela de exemplo para a área de trabalho com `preparar.sh`.
- Sem Bash: no Windows nativo, o eval recusa a execução que tem shell, porque não há sandbox. Por isso os verificadores de `skills/criar/scripts/` não rodam dentro dos evals.
- Enquanto um eval roda, não edite nada em `skills/`: o plugin é lido direto desta pasta, e a execução lê as partes no meio do caminho.
- Para iterar num caso só: `--case <nome>`.

### Histórico gravado

Os casos `b-*` e `c-*` continuam uma conversa gravada em `historico.jsonl`. Esse histórico tem dentro o `SKILL.md` do dia em que foi gravado. **Se o `SKILL.md` ou uma parte mudar, grave os históricos de novo**, senão o caso testa a versão velha. Ele também guarda o caminho do plugin na máquina que gravou. Em outra máquina, grave de novo.

Para gravar:

1. Etapa B: rode o caso da etapa A com `--keep-temp` (por exemplo `--case a-posto`). O comando mostra a pasta temporária de cada execução, e a sessão fica em `<pasta temporária>/config/projects/*/<id>.jsonl`. Limpe com `node evals/limpar-historico.mjs <sessao.jsonl> evals/b-posto/historico.jsonl`.
2. Etapa C: rode o caso B. Ao retomar um histórico, o próprio eval grava a sessão inteira, A e B juntos, em `evals/b-posto/<id>.jsonl`. Limpe com `node evals/limpar-historico.mjs evals/b-posto/<id>.jsonl evals/c-posto/historico.jsonl`.
3. O `limpar-historico.mjs` guarda só a conversa, sem o raciocínio interno, e se recusa a gravar se sobrar e-mail, caminho de pasta temporária ou dado da conta.
4. **A sessão crua tem o e-mail da conta, o código da organização e o prompt de sistema inteiro.** O `.gitignore` já ignora os `evals/*/<id>.jsonl` que o eval grava, mas apague esses arquivos e as pastas temporárias depois de usar.

### Lista de fontes copiada

Os graders `evals/b-*/graders/sem-fonte-queimada.md` e `evals/c-posto/graders/sem-fonte-queimada.md` têm a lista de `skills/criar/partes/fontes/queimadas.md` copiada dentro da regex, porque o grader não lê arquivo. **Mudou a lista, mude os graders.** O verificador `skills/criar/scripts/fontes-queimadas.mjs` não tem esse problema: ele lê o `queimadas.md` toda vez.
