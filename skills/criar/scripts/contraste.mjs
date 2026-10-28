import { readFileSync, existsSync, statSync } from "node:fs";
import { extname, basename } from "node:path";

const USO = "uso: node contraste.mjs <arquivo.css ou .html> [--fundo <cor ou --variavel>]";

function sair(codigo, mensagem) {
  (codigo === 0 ? console.log : console.error)(mensagem);
  process.exit(codigo);
}

const versao = Number(process.versions.node.split(".")[0]);
if (versao < 16) sair(2, `contraste.mjs precisa do Node 16 ou mais novo; este é o ${process.versions.node}.`);

const argumentos = process.argv.slice(2);
let arquivo = null;
let fundoInformado = null;
for (let i = 0; i < argumentos.length; i++) {
  const arg = argumentos[i];
  if (arg === "--fundo") {
    fundoInformado = argumentos[++i];
    if (!fundoInformado) sair(2, `faltou a cor depois de --fundo.\n${USO}`);
  } else if (arg.startsWith("--fundo=")) {
    fundoInformado = arg.slice("--fundo=".length);
  } else if (arg === "-h" || arg === "--help") {
    sair(0, USO);
  } else if (!arquivo) {
    arquivo = arg;
  } else {
    sair(2, `argumento a mais: ${arg}\n${USO}`);
  }
}

if (!arquivo) sair(2, USO);
if (!existsSync(arquivo)) sair(2, `o arquivo não existe: ${arquivo}`);
if (statSync(arquivo).isDirectory()) sair(2, `é uma pasta, não um arquivo: ${arquivo}`);

const bruto = readFileSync(arquivo, "utf8");
const ehHtml = [".html", ".htm"].includes(extname(arquivo).toLowerCase());
const css = semComentarios(ehHtml ? soEstilos(bruto) : bruto);
if (!css.trim()) sair(2, ehHtml ? `nenhum <style> com CSS em ${arquivo}` : `o CSS está vazio: ${arquivo}`);

function soEstilos(html) {
  let saida = html.replace(/[^\n]/g, " ");
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const inicio = m.index + m[0].indexOf(">") + 1;
    saida = saida.slice(0, inicio) + m[1] + saida.slice(inicio + m[1].length);
  }
  return saida;
}

function semComentarios(texto) {
  return texto.replace(/\/\*[\s\S]*?\*\//g, (trecho) => trecho.replace(/[^\n]/g, " "));
}

function linhaDe(posicao) {
  let linha = 1;
  for (let i = 0; i < posicao; i++) if (css.charCodeAt(i) === 10) linha++;
  return linha;
}

function lerRegras(texto) {
  const regras = [];
  const pilha = [];
  let inicio = 0;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (c === "{") {
      pilha.push({ cabeca: texto.slice(inicio, i).trim(), corpoInicio: i + 1 });
      inicio = i + 1;
    } else if (c === "}") {
      const aberto = pilha.pop();
      if (!aberto) {
        inicio = i + 1;
        continue;
      }
      const corpo = texto.slice(aberto.corpoInicio, i);
      const contexto = pilha.map((p) => p.cabeca);
      if (!aberto.cabeca.startsWith("@") && !/[{}]/.test(corpo)) {
        regras.push({ seletor: aberto.cabeca.replace(/\s+/g, " "), corpo, contexto, posicao: aberto.corpoInicio });
      } else if (!aberto.cabeca.startsWith("@")) {
        const declaracoesSoltas = corpo.replace(/[^{};]*\{[^{}]*\}/g, "");
        if (declaracoesSoltas.trim()) regras.push({ seletor: aberto.cabeca.replace(/\s+/g, " "), corpo: declaracoesSoltas, contexto, posicao: aberto.corpoInicio });
      }
      inicio = i + 1;
    } else if (c === ";" && pilha.length === 0) {
      inicio = i + 1;
    }
  }
  for (const regra of regras) {
    regra.declaracoes = new Map();
    for (const pedaco of regra.corpo.split(";")) {
      const dois = pedaco.indexOf(":");
      if (dois < 0) continue;
      const nome = pedaco.slice(0, dois).trim().toLowerCase();
      const valor = pedaco.slice(dois + 1).replace(/!important/i, "").trim();
      if (nome && valor) regra.declaracoes.set(nome.startsWith("--") ? pedaco.slice(0, dois).trim() : nome, valor);
    }
  }
  return regras;
}

const NOMEADAS = {
  black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000", blue: "#0000ff", yellow: "#ffff00",
  orange: "#ffa500", purple: "#800080", gray: "#808080", grey: "#808080", silver: "#c0c0c0", maroon: "#800000",
  navy: "#000080", teal: "#008080", olive: "#808000", lime: "#00ff00", aqua: "#00ffff", cyan: "#00ffff",
  fuchsia: "#ff00ff", magenta: "#ff00ff", pink: "#ffc0cb", brown: "#a52a2a", gold: "#ffd700", indigo: "#4b0082",
  violet: "#ee82ee", crimson: "#dc143c", coral: "#ff7f50", tomato: "#ff6347", salmon: "#fa8072", khaki: "#f0e68c",
  beige: "#f5f5dc", ivory: "#fffff0", linen: "#faf0e6", tan: "#d2b48c", chocolate: "#d2691e", darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9", lightgray: "#d3d3d3", lightgrey: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969",
  gainsboro: "#dcdcdc", whitesmoke: "#f5f5f5", snow: "#fffafa", darkblue: "#00008b", darkgreen: "#006400",
  darkred: "#8b0000", firebrick: "#b22222", forestgreen: "#228b22", seagreen: "#2e8b57", slategray: "#708090",
  slategrey: "#708090", steelblue: "#4682b4", royalblue: "#4169e1", midnightblue: "#191970", rebeccapurple: "#663399",
};

function numero(texto, escala = 1) {
  const t = texto.trim();
  if (t.endsWith("%")) return (parseFloat(t) / 100) * escala;
  return parseFloat(t);
}

function deLinear(v) {
  const c = Math.min(1, Math.max(0, v));
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function deOklab(L, a, b, alfa) {
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const z = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return { r: deLinear(r) * 255, g: deLinear(g) * 255, b: deLinear(z) * 255, a: alfa };
}

function partesDaFuncao(dentro) {
  const [cores, alfa] = dentro.split("/").map((s) => s.trim());
  const valores = cores.includes(",") ? cores.split(",").map((s) => s.trim()) : cores.split(/\s+/);
  if (valores.length === 4 && alfa === undefined) return { valores: valores.slice(0, 3), alfa: numero(valores[3]) };
  return { valores, alfa: alfa === undefined ? 1 : numero(alfa) };
}

function matiz(texto) {
  const t = texto.trim().toLowerCase();
  if (t.endsWith("turn")) return parseFloat(t) * 360;
  if (t.endsWith("rad")) return (parseFloat(t) * 180) / Math.PI;
  if (t.endsWith("grad")) return parseFloat(t) * 0.9;
  return parseFloat(t);
}

function lerCor(texto) {
  const t = texto.trim().toLowerCase();
  if (t === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  if (NOMEADAS[t]) return lerCor(NOMEADAS[t]);
  let m = t.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length !== 6 && h.length !== 8) return null;
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a };
  }
  m = t.match(/^rgba?\((.+)\)$/);
  if (m) {
    const { valores, alfa } = partesDaFuncao(m[1]);
    if (valores.length !== 3) return null;
    const [r, g, b] = valores.map((v) => numero(v, 255));
    return [r, g, b, alfa].some(Number.isNaN) ? null : { r, g, b, a: alfa };
  }
  m = t.match(/^hsla?\((.+)\)$/);
  if (m) {
    const { valores, alfa } = partesDaFuncao(m[1]);
    if (valores.length !== 3) return null;
    const h = (((matiz(valores[0]) % 360) + 360) % 360) / 360;
    const s = numero(valores[1], 1) > 1 ? numero(valores[1]) / 100 : numero(valores[1], 1);
    const l = numero(valores[2], 1) > 1 ? numero(valores[2]) / 100 : numero(valores[2], 1);
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const canal = (x) => {
      const k = x < 0 ? x + 1 : x > 1 ? x - 1 : x;
      if (k < 1 / 6) return p + (q - p) * 6 * k;
      if (k < 1 / 2) return q;
      if (k < 2 / 3) return p + (q - p) * (2 / 3 - k) * 6;
      return p;
    };
    const cor = { r: canal(h + 1 / 3) * 255, g: canal(h) * 255, b: canal(h - 1 / 3) * 255, a: alfa };
    return [cor.r, cor.g, cor.b, cor.a].some(Number.isNaN) ? null : cor;
  }
  m = t.match(/^oklch\((.+)\)$/);
  if (m) {
    const { valores, alfa } = partesDaFuncao(m[1]);
    if (valores.length !== 3) return null;
    const L = valores[0].endsWith("%") ? parseFloat(valores[0]) / 100 : parseFloat(valores[0]);
    const C = valores[1].endsWith("%") ? (parseFloat(valores[1]) / 100) * 0.4 : parseFloat(valores[1]);
    const H = valores[2] === "none" ? 0 : (matiz(valores[2]) * Math.PI) / 180;
    const cor = deOklab(L, C * Math.cos(H), C * Math.sin(H), alfa);
    return [cor.r, cor.g, cor.b, cor.a].some(Number.isNaN) ? null : cor;
  }
  m = t.match(/^oklab\((.+)\)$/);
  if (m) {
    const { valores, alfa } = partesDaFuncao(m[1]);
    if (valores.length !== 3) return null;
    const L = valores[0].endsWith("%") ? parseFloat(valores[0]) / 100 : parseFloat(valores[0]);
    const cor = deOklab(L, numero(valores[1], 0.4), numero(valores[2], 0.4), alfa);
    return [cor.r, cor.g, cor.b, cor.a].some(Number.isNaN) ? null : cor;
  }
  return null;
}

function hex(cor) {
  const dois = (v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${dois(cor.r)}${dois(cor.g)}${dois(cor.b)}${cor.a < 1 ? dois(cor.a * 255) : ""}`;
}

function sobre(frente, fundo) {
  const a = frente.a;
  return { r: frente.r * a + fundo.r * (1 - a), g: frente.g * a + fundo.g * (1 - a), b: frente.b * a + fundo.b * (1 - a), a: 1 };
}

function luminancia(cor) {
  const canal = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * canal(cor.r) + 0.7152 * canal(cor.g) + 0.0722 * canal(cor.b);
}

function razao(a, b) {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

const regras = lerRegras(css);
if (!regras.length) sair(2, `não achei nenhuma regra de CSS em ${arquivo}`);

const ehEscuro = (texto) => /prefers-color-scheme\s*:\s*dark|\bdark\b|escuro/i.test(texto);
const seletorGlobal = (s) => /^(:root|html|body|:host|\*)(\s*,\s*(:root|html|body|:host|\*))*$/i.test(s) || /^(:root|html)\s*\[[^\]]*\]$/i.test(s) || /^(:root|html)\.[\w-]+$/i.test(s);

const variaveis = { claro: new Map(), escuro: new Map() };
for (const regra of regras) {
  const escura = ehEscuro(regra.contexto.join(" ")) || ehEscuro(regra.seletor);
  if (!seletorGlobal(regra.seletor) && !(escura && /^(:root|html|body)/i.test(regra.seletor))) continue;
  for (const [nome, valor] of regra.declaracoes) {
    if (!nome.startsWith("--")) continue;
    if (escura) variaveis.escuro.set(nome, valor);
    else variaveis.claro.set(nome, valor);
  }
}
const temEscuro = variaveis.escuro.size > 0;

function resolver(valor, tema, proprias, profundidade = 0) {
  if (profundidade > 10) return null;
  return valor.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g, (_, nome, reserva) => {
    const achado = proprias.get(nome) ?? (tema === "escuro" ? variaveis.escuro.get(nome) ?? variaveis.claro.get(nome) : variaveis.claro.get(nome));
    if (achado !== undefined) return resolver(achado, tema, proprias, profundidade + 1) ?? "§";
    if (reserva !== undefined) return resolver(reserva, tema, proprias, profundidade + 1) ?? "§";
    return "§";
  });
}

const PADRAO_COR = /#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch|oklab)\([^()]*\)|\b[a-z]+\b/gi;

function funcaoDesconhecida(valor) {
  const semConhecidas = valor.replace(/(?:rgba?|hsla?|oklch|oklab)\([^()]*\)/gi, "").replace(/(?:repeating-)?(?:linear|radial|conic)-gradient\(/gi, "");
  return /[\w-]+\(/.test(semConhecidas);
}

function corDoFundo(valor) {
  if (!valor) return null;
  if (/url\(|image\(|element\(/i.test(valor)) return { tipo: "imagem" };
  if (/§/.test(valor) || funcaoDesconhecida(valor)) return { tipo: "desconhecido" };
  if (/gradient\(/i.test(valor)) {
    const cores = (valor.match(PADRAO_COR) || []).map(lerCor).filter(Boolean);
    if (!cores.length) return { tipo: "desconhecido" };
    if (cores.some((c) => c.a < 1)) return { tipo: "transparente" };
    return { tipo: "degrade", cores };
  }
  const pedacos = valor.match(PADRAO_COR) || [];
  const cores = pedacos.map(lerCor).filter(Boolean);
  if (!cores.length) {
    if (/^(none|initial|inherit|unset|revert)$/i.test(valor.trim())) return null;
    return { tipo: "desconhecido" };
  }
  const cor = cores[cores.length - 1];
  if (cor.a === 0) return null;
  if (cor.a < 1) return { tipo: "transparente", cor };
  return { tipo: "solido", cores: [cor] };
}

function corDaBorda(declaracoes, tema, proprias) {
  const valor = declaracoes.get("border-color") ?? declaracoes.get("border") ?? declaracoes.get("outline-color");
  if (!valor) return null;
  const resolvido = resolver(valor, tema, proprias);
  if (!resolvido || /§/.test(resolvido) || /^(0|none)\b/i.test(resolvido.trim())) return null;
  const cores = (resolvido.match(PADRAO_COR) || []).map(lerCor).filter(Boolean);
  return cores.length ? cores[cores.length - 1] : null;
}

function emPx(valor) {
  if (!valor) return null;
  const m = valor.trim().match(/^([\d.]+)(px|rem|em|pt)?$/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  const unidade = (m[2] || "px").toLowerCase();
  if (unidade === "px") return n;
  if (unidade === "rem" || unidade === "em") return n * 16;
  if (unidade === "pt") return (n * 4) / 3;
  return null;
}

function tamanho(declaracoes, tema, proprias) {
  let px = emPx(resolver(declaracoes.get("font-size") ?? "", tema, proprias));
  let peso = resolver(declaracoes.get("font-weight") ?? "", tema, proprias);
  const atalho = declaracoes.get("font");
  if (atalho) {
    const r = resolver(atalho, tema, proprias) ?? "";
    const m = r.match(/(?:^|\s)([\d.]+(?:px|rem|em|pt))(?:\s*\/\s*\S+)?\s/i);
    if (m && px === null) px = emPx(m[1]);
    const w = r.match(/(?:^|\s)(\d{3}|bold|bolder)(?:\s)/i);
    if (w && !peso) peso = w[1];
  }
  const negrito = /^(bold|bolder)$/i.test(peso) || parseInt(peso, 10) >= 700;
  if (px === null) return { grande: false, descricao: "tamanho não declarado, conferido como texto normal" };
  const grande = px >= 24 || (negrito && px >= 18.66);
  return { grande, descricao: `${Math.round(px * 10) / 10} px${negrito ? " em negrito" : ""}${grande ? ", texto grande" : ""}` };
}

const virgula = (n) => (Math.floor(n * 100) / 100).toFixed(2).replace(".", ",");

function regrasDoTema(tema) {
  const porSeletor = new Map();
  const ordem = [...regras].sort((a, b) => Number(ehEscuro(a.contexto.join(" ") + a.seletor)) - Number(ehEscuro(b.contexto.join(" ") + b.seletor)));
  for (const regra of ordem) {
    const escura = ehEscuro(regra.contexto.join(" ")) || ehEscuro(regra.seletor);
    if (tema === "claro" && escura) continue;
    const seletor = regra.seletor.replace(/^:root:not\([^)]*\)\s*/i, ":root ").trim();
    const outroContexto = regra.contexto.filter((c) => !ehEscuro(c)).join(" ");
    const chave = outroContexto ? `${outroContexto} ${seletor}` : seletor;
    const base = outroContexto ? porSeletor.get(seletor) : null;
    const atual = porSeletor.get(chave) ?? { seletor: outroContexto ? `${seletor} (${outroContexto})` : seletor, declaracoes: new Map(base?.declaracoes ?? []), posicao: regra.posicao };
    for (const [nome, valor] of regra.declaracoes) atual.declaracoes.set(nome, valor);
    if (regra.declaracoes.has("color")) atual.posicao = regra.posicao;
    porSeletor.set(chave, atual);
  }
  return [...porSeletor.values()];
}

function fundoDaPagina(tema, efetivas) {
  for (const nome of ["body", "html"]) {
    const regra = efetivas.find((r) => r.seletor.toLowerCase() === nome);
    const valor = regra?.declaracoes.get("background-color") ?? regra?.declaracoes.get("background");
    if (!valor) continue;
    const fundo = corDoFundo(resolver(valor, tema, regra.declaracoes));
    if (fundo?.tipo === "solido") return fundo.cores[0];
  }
  return null;
}

function avaliar(tema) {
  const pares = [];
  const semPar = [];
  const naoLidas = [];
  const efetivas = regrasDoTema(tema);
  const pagina = fundoDaPagina(tema, efetivas);
  let informado = null;
  if (fundoInformado) {
    const valor = fundoInformado.startsWith("--") ? `var(${fundoInformado})` : fundoInformado;
    const fundo = corDoFundo(resolver(valor, tema, new Map()));
    if (fundo?.tipo !== "solido") sair(2, `não consegui ler a cor de --fundo: ${fundoInformado}`);
    informado = fundo.cores[0];
  }
  for (const regra of efetivas) {
    const d = regra.declaracoes;
    const linha = linhaDe(regra.posicao);
    if (/:disabled|\[disabled\]|\[aria-disabled|[.-]disabled\b|desabilitad|inativ/i.test(regra.seletor)) {
      isentas.add(regra.seletor);
      continue;
    }
    const textoBruto = d.get("color");
    const fundoBruto = d.get("background-color") ?? d.get("background");
    const texto = textoBruto ? resolver(textoBruto, tema, d) : null;
    const corTexto = texto && !/§/.test(texto) ? lerCor(texto) : null;
    if (textoBruto && !corTexto && !/^(inherit|currentcolor|initial|unset|revert)$/i.test(textoBruto.trim())) naoLidas.push({ seletor: regra.seletor, linha, valor: textoBruto });
    const fundo = fundoBruto ? corDoFundo(resolver(fundoBruto, tema, d)) : null;
    const medida = tamanho(d, tema, d);
    if (corTexto) {
      if (fundo?.tipo === "solido" || fundo?.tipo === "degrade") {
        const piores = fundo.cores.map((c) => ({ c, r: razao(sobre(corTexto, c), c) })).sort((a, b) => a.r - b.r);
        const pior = piores[0];
        pares.push({ seletor: regra.seletor, linha, tipo: "texto", frente: corTexto, fundo: pior.c, r: pior.r, minimo: medida.grande ? 3 : 4.5, nota: `${medida.descricao}${fundo.tipo === "degrade" ? "; degradê, pior ponto" : ""}` });
      } else if (fundo && fundo.tipo !== "solido") {
        semPar.push({ seletor: regra.seletor, linha, cor: corTexto, motivo: fundo.tipo === "imagem" ? "o fundo é uma imagem" : fundo.tipo === "transparente" ? "o fundo é transparente e não sei o que fica por baixo" : "não consegui ler a cor do fundo" });
      } else if (/^(html|body)$/i.test(regra.seletor) && pagina) {
        pares.push({ seletor: regra.seletor, linha, tipo: "texto", frente: corTexto, fundo: pagina, r: razao(sobre(corTexto, pagina), pagina), minimo: medida.grande ? 3 : 4.5, nota: medida.descricao });
      } else if (informado) {
        pares.push({ seletor: regra.seletor, linha, tipo: "texto", frente: corTexto, fundo: informado, r: razao(sobre(corTexto, informado), informado), minimo: medida.grande ? 3 : 4.5, nota: `${medida.descricao}; fundo informado com --fundo` });
      } else {
        semPar.push({ seletor: regra.seletor, linha, cor: corTexto, motivo: "o fundo não está na mesma regra" });
      }
    }
    const controle = /\b(button|input|select|textarea)\b|\.(btn|botao|button|campo|input|select)[\w-]*/i.test(regra.seletor);
    const borda = controle ? corDaBorda(d, tema, d) : null;
    if (borda && fundo?.tipo === "solido" && hex(borda) !== hex(fundo.cores[0])) {
      const c = fundo.cores[0];
      pares.push({ seletor: regra.seletor, linha, tipo: "borda", frente: borda, fundo: c, r: razao(sobre(borda, c), c), minimo: 3, nota: "borda de controle" });
    }
  }
  return { pares, semPar, naoLidas };
}

const isentas = new Set();

const temas = temEscuro ? ["claro", "escuro"] : ["claro"];
let falhas = 0;
let totalPares = 0;
let totalSemPar = 0;
console.log(`contraste.mjs: ${basename(arquivo)}, pelo cálculo da WCAG 2.2 (4,5:1 texto normal; 3:1 texto grande e borda de controle)`);
for (const tema of temas) {
  const { pares, semPar, naoLidas } = avaliar(tema);
  totalPares += pares.length;
  totalSemPar += semPar.length;
  console.log(`\nTema ${tema}${temEscuro ? "" : " (o CSS não tem tema escuro)"}`);
  if (!pares.length) console.log("  nenhum par de cores conhecido");
  for (const p of pares) {
    const passa = p.r >= p.minimo;
    if (!passa) falhas++;
    console.log(`  ${passa ? "passa" : "FALHA"}  ${virgula(p.r)}:1 (mínimo ${String(p.minimo).replace(".", ",")}:1)  ${p.seletor}  ${p.tipo} ${hex(p.frente)} sobre ${hex(p.fundo)}  [${p.nota}]  linha ${p.linha}`);
  }
  if (semPar.length) {
    console.log(`\n  Sem par conhecido: não sei sobre que fundo estas cores ficam, então não calculei.`);
    for (const s of semPar) console.log(`    ${s.seletor}  texto ${hex(s.cor)}  (${s.motivo})  linha ${s.linha}`);
  }
  if (naoLidas.length) {
    console.log(`\n  Cores que não consegui ler:`);
    for (const n of naoLidas) console.log(`    ${n.seletor}  color: ${n.valor}  linha ${n.linha}`);
  }
}
if (isentas.size) console.log(`\nFora da conta, porque a WCAG não exige contraste de controle desabilitado: ${[...isentas].join(", ")}`);
console.log(`\nResumo: ${totalPares} par(es) conferido(s), ${falhas} abaixo do mínimo, ${totalSemPar} cor(es) de texto sem fundo conhecido.`);
if (totalSemPar && !fundoInformado) console.log("Para as cores sem par, rode de novo com --fundo <cor ou --variavel> se você souber, pelo HTML, sobre que fundo elas ficam.");
process.exit(falhas ? 1 : 0);
