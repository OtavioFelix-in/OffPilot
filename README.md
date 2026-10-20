# Off Pilot

Tira o Claude Code do piloto automático.

Peça dez sistemas diferentes ao Claude Code e eles saem com a mesma cara: as mesmas cores, a mesma fonte, tudo arredondado, a informação organizada do mesmo jeito. Um sistema de mercado e um de posto de combustível ficam iguais. Além disso, aparecem na tela textos que não dizem nada, dados que não deviam estar ali e o importante no lugar errado.

O Off Pilot é um plugin para o Claude Code, formado por várias skills, que faz o Claude:

- **perguntar** o que muda o sistema antes de começar, em vez de assumir;
- **criar uma direção visual própria** para cada projeto, a partir do que ele é e de quem usa;
- **distribuir a informação** pelo que importa para quem olha a tela: o que vem primeiro, o que é secundário e o que sai.

## Status

Em construção. Ainda não há plugin para instalar.

- [skills/plano-visual/](skills/plano-visual/): decide a cara do projeto antes do código. Pergunta o que muda o visual, separa tela de vender, operar e ler, tira cor, forma e detalhe do mundo do produto e mostra o plano para aprovação. Tem a lista de vícios.
- [skills/fontes/](skills/fontes/): escolhe a fonte pelo mundo do produto e mostra 3 combinações para a pessoa escolher. Acervo de 167 fontes gratuitas, fora as queimadas.
- [skills/textos/](skills/textos/): escreve e revisa os textos da tela em português do Brasil. Corta o que não precisa estar ali, usa as palavras do ramo e tem regras para botão, erro, tela vazia, confirmação e números.
- [skills/estrutura-de-pagina/](skills/estrutura-de-pagina/): escolhe o formato de uma página de site pelo conteúdo real e pelas perguntas de quem visita. Tem 24 formatos, mostra 3 opções desenhadas e estuda sites de referência sem copiar.
- [skills/informacao/](skills/informacao/): decide o que aparece numa tela de sistema, em que ordem e tamanho, e o que sai. Parte da pergunta da tela, põe o achado do dia no topo, apaga bloco sem pergunta e deixa a tarefa comum a um clique.
- [skills/revisao/](skills/revisao/): revisa uma tela pronta com o olhar do Off Pilot: cara de IA e informação primeiro, depois texto, plano, qualidade mínima e casos extremos. Lista por gravidade, corrige só o aprovado e mostra antes e depois.

## Licença

MIT (a definir).
