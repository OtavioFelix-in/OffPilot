import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const USO = 'uso: node fontes-queimadas.mjs <pasta> [--permitir "Inter,Roboto"]';
const EXTENSOES = new Set([".css", ".scss", ".sass", ".less", ".html", ".htm", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".vue", ".svelte", ".astro"]);
const PASTAS_IGNORADAS = new Set(["node_modules", ".git", ".offpilot", ".next", ".nuxt", ".svelte-kit", ".output", "coverage"]);
const GENERICAS = new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "math", "emoji", "fangsong", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "inherit", "initial", "unset", "revert", "revert-layer"]);

function sair(codigo, mensagem) {
  (codigo === 0 ? console.log : console.error)(mensagem);
  process.exit(codigo);
}

const versao = Number(process.versions.node.split(".")[0]);
if (versao < 16) sair(2, `fontes-queimadas.mjs precisa do Node 16 ou mais novo; este é o ${process.versions.node}.`);

const argumentos = process.argv.slice(2);
let pasta = null;
const permitidas = new Set();
for (let i = 0; i < argumentos.length; i++) {
  const arg = argumentos[i];
  if (arg === "--permitir") {
    const lista = argumentos[++i];
    if (!lista) sair(2, `faltou a lista depois de --permitir.\n${USO}`);
    for (const nome of lista.split(",")) if (nome.trim()) permitidas.add(normalizar(nome));
  } else if (arg.startsWith("--permitir=")) {
    for (const nome of arg.slice("--permitir=".length).split(",")) if (nome.trim()) permitidas.add(normalizar(nome));
  } else if (arg === "-h" || arg === "--help") {
    sair(0, USO);
  } else if (!pasta) {
    pasta = arg;
  } else {
    sair(2, `argumento a mais: ${arg}\n${USO}`);
  }
}

if (!pasta) sair(2, USO);
if (!existsSync(pasta)) sair(2, `a pasta não existe: ${pasta}`);
if (!statSync(pasta).isDirectory()) sair(2, `não é uma pasta: ${pasta}`);

function normalizar(nome) {
  return nome.trim().replace(/^["'`]+|["'`]+$/g, "").replace(/[-+_]+/g, " ").replace(/\s+/g, " ").toLowerCase();
}

function lerQueimadas() {
  const caminho = fileURLToPath(new URL("../partes/fontes/queimadas.md", import.meta.url));
  if (!existsSync(caminho)) sair(2, `não achei a lista de fontes queimadas em ${caminho}`);
  const nomes = new Map();
  let naLista = false;
  for (const linha of readFileSync(caminho, "utf8").split(/\r?\n/)) {
    if (linha.startsWith("## ")) {
      naLista = /^## As /.test(linha);
      continue;
    }
    if (!naLista || !linha.trim() || linha.trim().startsWith("-")) continue;
    for (const pedaco of linha.trim().replace(/\.$/, "").split(",")) {
      const codigo = pedaco.match(/`([^`]+)`/);
      const nome = (codigo ? codigo[1] : pedaco).trim();
      if (nome) nomes.set(normalizar(nome), nome);
    }
  }
  if (nomes.size < 10) sair(2, `li só ${nomes.size} fontes em ${caminho}; o formato da lista mudou?`);
  return nomes;
}

function arquivos(dir) {
  const achados = [];
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    let info;
    try {
      info = statSync(caminho);
    } catch {
      continue;
    }
    if (info.isDirectory()) {
      if (!PASTAS_IGNORADAS.has(nome)) achados.push(...arquivos(caminho));
    } else if (EXTENSOES.has(extname(nome).toLowerCase()) || /^tailwind\.config\./.test(nome)) {
      achados.push(caminho);
    }
  }
  return achados;
}

function semComentariosDeCss(texto) {
  return texto.replace(/\/\*[\s\S]*?\*\//g, (trecho) => trecho.replace(/[^\n]/g, " "));
}

function primeiraFamilia(pilha) {
  const primeira = pilha.split(",")[0].replace(/!important/i, "").trim();
  if (!primeira || /^var\(/i.test(primeira)) return null;
  return primeira;
}

function familiaDoAtalhoFont(valor) {
  const primeiroPedaco = valor.split(",")[0];
  const achado = primeiroPedaco.match(/(?:^|\s)(?:[\d.]+(?:px|r?em|%|pt|vw|vh|ch|ex)|xx?-small|x?x?-large|small|medium|large|smaller|larger)(?:\s*\/\s*\S+)?\s+(.+)$/i);
  return achado ? primeiraFamilia(achado[1] + valor.slice(primeiroPedaco.length)) : null;
}

function pareceFonte(nomeDaVariavel, valor) {
  if (/font|fonte|family|tipo/i.test(nomeDaVariavel)) return true;
  const ultima = valor.split(",").pop().trim().toLowerCase();
  return GENERICAS.has(ultima) && !["inherit", "initial", "unset"].includes(ultima);
}

function linhaDe(texto, posicao) {
  let linha = 1;
  for (let i = 0; i < posicao; i++) if (texto.charCodeAt(i) === 10) linha++;
  return linha;
}

function familiasUsadas(texto) {
  const usadas = [];
  const css = semComentariosDeCss(texto);
  for (const m of css.matchAll(/font-family\s*:\s*([^;{}"'\n]*(?:["'][^"'\n]*["'][^;{}"'\n]*)*)/gi)) {
    const familia = primeiraFamilia(m[1]);
    if (familia) usadas.push({ familia, posicao: m.index, onde: "font-family" });
  }
  for (const m of css.matchAll(/(?<![\w-])font\s*:\s*([^;{}\n]+)/gi)) {
    const familia = familiaDoAtalhoFont(m[1]);
    if (familia) usadas.push({ familia, posicao: m.index, onde: "font" });
  }
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;{}\n]+)/g)) {
    if (!pareceFonte(m[1], m[2])) continue;
    const familia = primeiraFamilia(m[2]);
    if (familia) usadas.push({ familia, posicao: m.index, onde: m[1] });
  }
  for (const m of texto.matchAll(/[?&;]family=([^&"'\s)]+)/gi)) {
    for (const pedaco of decodeURIComponent(m[1]).split("|")) {
      const familia = pedaco.split(":")[0].replace(/\+/g, " ");
      if (familia) usadas.push({ familia, posicao: m.index, onde: "link ou @import" });
    }
  }
  for (const m of texto.matchAll(/@fontsource(?:-variable)?\/([a-z0-9-]+)/gi)) {
    usadas.push({ familia: m[1].replace(/-/g, " "), posicao: m.index, onde: "@fontsource" });
  }
  for (const m of texto.matchAll(/fontFamily\s*:\s*(["'`])([^"'`]+)\1/g)) {
    const familia = primeiraFamilia(m[2]);
    if (familia) usadas.push({ familia, posicao: m.index, onde: "fontFamily" });
  }
  for (const m of texto.matchAll(/fontFamily\s*:\s*\{([^}]*)\}/g)) {
    for (const item of m[1].matchAll(/[\w"'-]+\s*:\s*\[\s*(["'`])([^"'`]+)\1/g)) {
      usadas.push({ familia: item[2], posicao: m.index + item.index, onde: "tailwind fontFamily" });
    }
  }
  return usadas;
}

const queimadas = lerQueimadas();
const lista = arquivos(pasta);
if (!lista.length) sair(0, `nenhum arquivo de interface em ${pasta} (procurei ${[...EXTENSOES].join(" ")}).`);

const achados = [];
for (const arquivo of lista) {
  let texto;
  try {
    texto = readFileSync(arquivo, "utf8");
  } catch (erro) {
    console.error(`não consegui ler ${arquivo}: ${erro.message}`);
    continue;
  }
  const vistos = new Set();
  for (const uso of familiasUsadas(texto)) {
    const chave = normalizar(uso.familia);
    if (!queimadas.has(chave) || permitidas.has(chave)) continue;
    const linha = linhaDe(texto, uso.posicao);
    const id = `${linha}|${chave}`;
    if (vistos.has(id)) continue;
    vistos.add(id);
    achados.push({ arquivo: relative(pasta, arquivo).replaceAll("\\", "/"), linha, fonte: queimadas.get(chave), onde: uso.onde });
  }
}

if (!achados.length) {
  const extra = permitidas.size ? ` (liberadas pelo --permitir: ${[...permitidas].map((n) => queimadas.get(n) ?? n).join(", ")})` : "";
  sair(0, `nenhuma fonte queimada em ${lista.length} arquivo(s)${extra}.`);
}

console.log(`Fontes queimadas em ${pasta}:`);
for (const a of achados) console.log(`${a.arquivo}:${a.linha}  ${a.fonte}  (${a.onde})`);
console.log(`\n${achados.length} uso(s) de fonte queimada. Se a pessoa pediu alguma pelo nome, rode de novo com --permitir "${[...new Set(achados.map((a) => a.fonte))].join(",")}".`);
process.exit(1);
