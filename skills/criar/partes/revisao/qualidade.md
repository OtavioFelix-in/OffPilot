# Qualidade mínima

O que toda tela precisa cumprir, seja qual for a cara dela. Não é o que faz uma tela ser boa; é o que impede que ela seja ruim. Vale para construir (skills `plano-visual`, `informacao`, `estrutura-de-pagina`) e para revisar (skill `revisao`).

## Contraste e cor

- Texto comum com contraste de pelo menos 4,5:1 com o fundo. Texto grande (a partir de uns 24 px, ou 19 px em negrito) e bordas de campo e de botão, pelo menos 3:1.
- Texto em cima de cor usa um tom da própria cor ou o texto principal, não um cinza qualquer.
- Informação nunca depende só de cor: o status tem palavra ou marca além da cor, e o gráfico tem rótulo, não só legenda colorida.

## Teclado e foco

- Tudo que é clicável se alcança com a tecla Tab, na mesma ordem em que aparece na tela.
- O foco sempre aparece, bem visível. Se o estilo padrão do navegador sair, outro entra no lugar.
- Esc fecha janela e menu aberto, e o foco volta para onde estava.
- O foco nunca fica preso num lugar de onde não se sai.

## Estrutura do código

- Botão é `<button>`, link é `<a>`. Nada de `<div>` clicável.
- Um título principal por tela, e os outros em ordem (`h1`, `h2`, `h3`), sem pular nível.
- Todo campo tem rótulo ligado a ele.
- Imagem com texto alternativo que diz o que ela mostra. Imagem só de enfeite tem texto alternativo vazio.
- Botão que é só ícone tem um nome para leitor de tela ("Fechar", "Excluir abastecimento").
- A página declara o idioma (`lang="pt-BR"`) e tem um título que diz onde a pessoa está.

## Toque e celular

- Área de toque de pelo menos 44 × 44 px, com espaço entre um alvo e outro.
- Nada funciona só passando o mouse por cima.
- Arrastar sempre tem outro jeito de fazer a mesma coisa.
- Campo de número abre teclado de número; e-mail abre teclado de e-mail; telefone, de telefone.

## Larguras e zoom

- A tela funciona de 320 px a 1920 px de largura, sem rolagem para o lado.
- Com o zoom em 200%, nada some nem se sobrepõe.
- O zoom do celular nunca é travado.
- Teste com o conteúdo real e com o conteúdo mais longo possível, não só com o exemplo curto.

## Movimento

- Quem desliga animação no aparelho (`prefers-reduced-motion`) continua vendo a mudança acontecer, só que sem o deslocamento.
- Nada pisca mais de três vezes por segundo.
- Transições curtas, de 150 a 300 ms, usando só posição, escala e transparência.
- Nenhuma tarefa espera uma animação terminar.

## Formulários

- Rótulo visível em cima do campo.
- Campo obrigatório ou opcional marcado de um jeito só, em todo o sistema.
- Erro embaixo do campo, dizendo como corrigir. O que a pessoa digitou não se perde depois do erro.
- O navegador pode preencher sozinho o que já sabe (nome, e-mail, endereço), com o `autocomplete` certo.
- O botão de enviar não manda duas vezes com clique duplo.

## Retorno e estados

- Todo botão e link tem os estados: normal, passando o mouse, com foco, pressionado, desabilitado e, se demora, carregando.
- Ação que demora mais de um segundo mostra que está acontecendo.
- Toda tela pensa no vazio, no carregando, no erro e no com muitos dados, não só no estado bonito.

## Desempenho básico

- Imagens no tamanho em que aparecem, com largura e altura declaradas, para a tela não pular quando carregam.
- O que está fora da primeira tela carrega depois.
- Fontes só nos pesos usados, com `font-display: swap`.
- Nada pesado bloqueia a primeira tela de aparecer.

## Navegação

- O botão de voltar do navegador faz o que a pessoa espera.
- Cada tela importante tem um endereço próprio, que dá para salvar e mandar.
- O item do menu da tela atual aparece marcado.

## Tema escuro (se houver)

- O contraste é conferido no tema escuro também.
- Sem branco puro em fundo preto puro.
- As cores de alerta, sucesso e erro são ajustadas para o fundo escuro, não reaproveitadas do claro.
