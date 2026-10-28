---
type: llm
---

Conte os itens de pergunta da resposta. Um item é um bloco numerado ou um parágrafo que pergunta algo à pessoa; perguntas dentro do mesmo item contam como um item só. O convite final para responder "vai" ou "decide você" não é item.
Em cada item, procure o palpite: o que o Claude supõe ("Imagino...", "Palpite:", "Suponho...", "Assumo...", "Proponho...") ou o que ele vai fazer se a pessoa não tiver a resposta ("Se não tiver logo, eu crio uma cara própria").
PASS se há de 2 a 4 itens, cada item tem um palpite desse tipo, e a resposta ainda não traz o plano visual, as opções de fonte nem código.
FAIL se há menos de 2 ou mais de 4 itens, se algum item é só pergunta, sem palpite nenhum, se a resposta já traz plano visual, opções de fonte ou código, ou se diz que começou a construir.
