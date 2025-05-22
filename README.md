# Automação da Página Inicial - GE.globo.com

Projeto de automação com foco na validação da página inicial do portal [ge.globo.com](https://ge.globo.com), utilizando Playwright + Cucumber (BDD) + JavaScript.

---

## Tecnologias Utilizadas

- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://cucumber.io/)
- Node.js 20+
- JavaScript ES6+
- Page Object Model

---

## Estrutura do Projeto

```
.
├── features/
│   ├── ge.feature                  # Cenários BDD
│   ├── step_definitions/
│   │   └── GeSteps.js              # Mapeamento dos steps
│   └── support/
│       └── hooks.js                # Hooks globais (Before/After)
├── pages/
│   └── GePage.js                   # Page Object com ações e locators
├── utils/
│   ├── browserManager.js          # Gerencia abertura/fechamento do navegador
│   └── helpers.js                 # Funções utilitárias como scroll e validações
```

---

## 🚀 Como Executar os Testes

```bash
# Instalar dependências
npm install

# Rodar todos os testes
npx cucumber-js

# Rodar com navegador visível para debug
PWDEBUG=1 npx cucumber-js

# Rodar testes específicos com tag (ex: times)
npx cucumber-js --tags @times
```

---

## Cenários de Teste Automatizados

- ✅ Validação de exibição de no mínimo 10 notícias
- ✅ Validação de título, imagem e resumo
- ✅ Redirecionamento correto para matéria
- ✅ Seleção de time da Série A via escudo
- ✅ Validação de conteúdo na página do clube

---

## Cobertura Manual Recomendada

- Destaque visual das manchetes principais
- Organização por categorias de esportes
- Responsividade (mobile/tablet)
- Acessibilidade via teclado e leitores de tela
- Validação de imagens carregadas corretamente
- Atualização de notícias com conteúdo recente

---

## Requisitos

- Node.js 20 ou superior
- npm instalado

---

## Autor

Luis Felipe Gimenez  
QA | Automação de Testes
