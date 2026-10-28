import { readFileSync, writeFileSync, existsSync } from "node:fs";

const USO = "uso: node evals/limpar-historico.mjs <sessao.jsonl> <historico.jsonl>";

function sair(codigo, mensagem) {
  (codigo === 0 ? console.log : console.error)(mensagem);
  process.exit(codigo);
}

const [entrada, saida, ...sobra] = process.argv.slice(2);
if (!entrada || !saida || sobra.length) sair(2, USO);
if (!existsSync(entrada)) sair(2, `não achei a sessão: ${entrada}`);

const registros = readFileSync(entrada, "utf8")
  .split("\n")
  .filter((linha) => linha.trim())
  .map((linha, i) => {
    try {
      return JSON.parse(linha);
    } catch {
      sair(2, `${entrada}, linha ${i + 1}: não é JSON`);
    }
  });

function semRaciocinio(registro) {
  const conteudo = registro.message?.content;
  if (registro.type !== "assistant" || !Array.isArray(conteudo)) return registro;
  return { ...registro, message: { ...registro.message, content: conteudo.filter((b) => b.type !== "thinking" && b.type !== "redacted_thinking") } };
}

const conversa = registros
  .filter((r) => r.type === "user" || r.type === "assistant")
  .map(semRaciocinio)
  .filter((r) => !(Array.isArray(r.message?.content) && r.message.content.length === 0));
if (!conversa.length) sair(2, "a sessão não tem nenhuma mensagem de conversa");

const pasta = conversa.find((r) => r.cwd && r.cwd !== ".")?.cwd ?? "";

function semPastaDaExecucao(texto) {
  if (!pasta) return texto;
  let limpo = texto;
  for (const v of [pasta, pasta.replaceAll("\\", "\\\\"), pasta.replaceAll("\\", "/")]) {
    limpo = limpo.replaceAll(v + "\\\\", "").replaceAll(v + "\\", "").replaceAll(v + "/", "").replaceAll(v, ".");
  }
  return limpo;
}

let anterior = null;
const linhas = conversa.map((registro) => {
  const { gitBranch, ...resto } = registro;
  const religado = { ...resto, parentUuid: anterior, cwd: "." };
  anterior = registro.uuid;
  return semPastaDaExecucao(JSON.stringify(religado));
});

const texto = linhas.join("\n") + "\n";
const proibidos = [
  [/[\w.+-]+@[\w-]+\.[\w.]+/, "endereço de e-mail"],
  [/AppData|[\\/]tmp[\\/]claude-eval/i, "caminho de pasta temporária"],
  [/organizationUuid|credential_org|session_context|prompt_snapshot/, "dado da conta ou do sistema"],
];
for (const [padrao, nome] of proibidos) {
  const achado = texto.match(padrao);
  if (achado) sair(1, `o histórico ainda tem ${nome}: "${achado[0]}". Nada foi gravado.`);
}

writeFileSync(saida, texto);
console.log(`${conversa.length} mensagens de ${registros.length} registros gravadas em ${saida}`);
