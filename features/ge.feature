Feature: Página inicial do GE

  @noticias @luis_gimenez
  Scenario: Exibir no mínimo 10 notícias
    Given o usuário acessa a página inicial
    Then devem ser exibidas no mínimo 10 notícias com título, imagem e resumo

  @noticia_especifica @luis_gimenez
  Scenario: Redirecionamento para matéria
    Given o usuário acessa a página inicial
    When ele clica em uma notícia
    Then ele deve ver a matéria completa

  @times  @luis_gimenez
  Scenario Outline: Acesso à página de um time da Série A
    Given o usuário acessa a página inicial
    When ele seleciona o time "<clube>"
    Then ele deve ver notícias relacionadas ao time

    Examples:
      | clube    |
      | Santos   |
      | Flamengo |