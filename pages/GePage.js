const { validateMinElements, scrollToLoadMore } = require("../utils/helpers");

class GePage {
  constructor(page) {
    this.page = page;

    this.noticia = "div.feed-post-body";
    this.imagem_noticia = "div.feed-media-wrapper";
    this.resumo_noticia = "div.bstn-related";
    this.tituloNoticia = "div.feed-post-body h2";
    this.tituloMateria = "h1.content-head__title";
    this.escudoHeader = "div.icons-escudo-header";
  }

  async goto() {
    await this.page.goto("https://ge.globo.com");
    await this.page.waitForSelector(this.noticia);
  }

  async validarNoticias() {
    const totalNoticia = await scrollToLoadMore(this.page, 10, this.noticia);
    const totalImagem = await scrollToLoadMore(
      this.page,
      10,
      this.imagem_noticia
    );

    console.log(
      `Foram encontradas ${totalNoticia} notícias e ${totalImagem} imagens atreladas.`
    );

    await validateMinElements(
      this.page.locator(this.noticia),
      10,
      `Número de notícias insuficiente após scroll`
    );

    await validateMinElements(
      this.page.locator(this.imagem_noticia),
      10,
      `Número de imagens destacadas insuficiente`
    );

    if (totalImagem !== totalNoticia) {
      throw new Error(
        `Desalinhamento entre notícias (${totalNoticia}) e imagens (${totalImagem}).`
      );
    }
  }

  async clicarNoticia() {
    await scrollToLoadMore(this.page, 10, this.noticia);
    await this.page.locator(this.tituloNoticia).first().click();
  }

  async capturarTituloPrimeiraNoticia() {
    return await this.page.locator(this.tituloNoticia).first().innerText();
  }
  async validarTituloMateria(tituloEsperado) {
    await this.page.waitForSelector("h1.content-head__title");
    const tituloAtual = await this.page
      .locator("h1.content-head__title")
      .innerText();

    console.log(`Título da matéria: ${tituloAtual}`);
    console.log(`Esperado: ${tituloEsperado}`);

    // Divide em palavras
    const palavrasEsperadas = tituloEsperado.toLowerCase().split(/\s+/);
    const palavrasAtuais = tituloAtual.toLowerCase().split(/\s+/);

    // Conta quantas palavras do esperado estão no atual
    const total = palavrasEsperadas.length;
    const coincidencias = palavrasEsperadas.filter((p) =>
      palavrasAtuais.includes(p)
    ).length;

    const percentual = (coincidencias / total) * 100;

    console.log(
      `🔍 Coincidência: ${coincidencias}/${total} (${percentual.toFixed(0)}%)`
    );

    if (percentual < 70) {
      throw new Error(
        `O título da matéria não contém o suficiente do texto esperado.\nEsperado: "${tituloEsperado}"\nAtual: "${tituloAtual}"\nCoincidência: ${percentual.toFixed(
          0
        )}%`
      );
    }
  }

  async selecionarTime(nomeTime) {
    const header = this.page.locator(this.escudoHeader).first();
    const escudo = this.page.locator(`img[alt="${nomeTime}"]`).first();

    console.log(`Hover no header de escudos...`);
    await header.hover();
    await this.page.waitForTimeout(1000);

    await escudo.waitFor({ state: "visible", timeout: 5000 });
    console.log(`Clicando no escudo: ${nomeTime}`);
    await escudo.click();
  }

  async validarPaginaTime() {
    const url = this.page.url();
    console.log(`URL atual: ${url}`);
    if (!url.includes("/futebol/times/")) {
      throw new Error(`Página incorreta do time: ${url}`);
    }

    const count = await this.page.locator(this.noticia).count();
    console.log(`Página do time tem ${count} notícias.`);
    if (count < 3) {
      throw new Error(`Menos de 3 notícias na página do time.`);
    }
  }
}

module.exports = GePage;
