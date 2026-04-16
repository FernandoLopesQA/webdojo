// Describe para agrupar testes automatizados
// it para definir um caso de teste
/// <reference types="cypress"/>
describe('Login', () => {

  function getTodayDate() {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    return `${day}/${month}/${year}`
  }

  it.only('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    //Validando que cookie foi criado
    cy.getCookie('login_date').should('exist')

    //Validando dados gravados no cookie
    cy.getCookie('login_date').should((cookie) => {
      //Manipulando a data
      expect(cookie.value).to.eq(getTodayDate())
    })

    //Validando que gerou token e armazenou no local storage e o formato MD5 do exemplo
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })

  })

  it('Não deve logar com senha inválida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com e-mail não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

})