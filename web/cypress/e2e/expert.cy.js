/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'
import _ from 'lodash' //Recurso nativo do Cypress

describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', () => {
        cy.log('todo')

        cy.get('#email').invoke('val', 'papito@teste.com.br')

        // Alterando o atributo
        cy.get('#password').invoke('attr', 'name', 'text')
            .type('senha123')

        //Removendo o atributo
        // cy.get('#password').invoke('removeAttr', 'class')
        //     .type('senha123')

        // Ocultando um atributo visível
        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        // Exibindo um atributo oculto
        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    it('Não deve logar com senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'katana321')

        // // aguarda 2s e meio para exibir o toast
        // cy.wait(2500)

        // // Acessando o DOM do HTML e gravando o DOM no arquivo daquele momento
        // cy.document().then((doc) => {
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        // })

        // Estratégia combinando localizador com texto, garante que o texto está no toast e não em outro local da página
        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast') // Cria alias para o toaster para evitar repetir o localizador

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        // Falha porque o componente não existe mais na página
        // cy.get('[data-sonner-toaster=true]')
        //     .should('not.be.visible')

        //Estratégia correta é usar not.be.exist porque uma vez o toast oculto ele não existe mais no DOM
        cy.get('@toast')
            .should('not.be.exist')
    })

    it('Simulando a tecla TAB com cy.press', () => {

        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')
    })

    it('Simulando press tecla enter', () => {

        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('sacasdc{Enter}') // Passando o comando de enter

        // Estratégia combinando localizador com texto, garante que o texto está no toast e não em outro local da página
        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast') // Cria alias para o toaster para evitar repetir o localizador

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        // Falha porque o componente não existe mais na página
        // cy.get('[data-sonner-toaster=true]')
        //     .should('not.be.visible')

        //Estratégia correta é usar not.be.exist porque uma vez o toast oculto ele não existe mais no DOM
        cy.get('@toast')
            .should('not.be.exist')
    })

    it.only('Deve realizar uma carga de dados fake', () => {

        _.times(5, () => { //Chama a função do lodash e passa por parâmetro quantidade de execuções tudo que estiver no bloco
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.log(name)
            cy.log(email)
            cy.log(password)
        })

    })

})