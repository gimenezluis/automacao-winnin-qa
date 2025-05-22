const { Given, When, Then } = require("@cucumber/cucumber");

Given("o usuário acessa a página inicial", async function () {
  await this.gePage.goto();
});

Then(
  "devem ser exibidas no mínimo 10 notícias com título, imagem e resumo",
  async function () {
    await this.gePage.validarNoticias();
  }
);

When("ele clica em uma notícia", async function () {
  this.tituloClicado = await this.gePage.capturarTituloPrimeiraNoticia();
  console.log(`Título capturado da noticia: ${this.tituloClicado}`);
  await this.gePage.clicarNoticia();
});

Then("ele deve ver a matéria completa", async function () {
  await this.gePage.validarTituloMateria(this.tituloClicado);
});

When("ele seleciona o time {string}", async function (teamName) {
  await this.gePage.selecionarTime(teamName);
});

Then("ele deve ver notícias relacionadas ao time", async function () {
  await this.gePage.validarPaginaTime();
});
