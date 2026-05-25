/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'
import _ from 'lodash' //Recurso nativo do Cypress

describe('Cadastro', () => {

    beforeEach(() => {
        cy.goToSignup()

        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Usuário cadastrado com sucesso!'
            }
        }).as('postSignup')
    })

    it('Deve cadastrar um novo usuário', () => {

        cy.get('#name').type('Fernando Papito')
        cy.get('#email').type('papito@teste.com.br')
        cy.get('#password').type('123456')
        cy.contains('button', 'Criar conta').click()

        // cy.wait('@postSignup')

        cy.contains('Conta criada com sucesso!')
            .should('be.visible')
    })

    //Java script permite colocar o lodash fora do it para repetir o cenário mais de uma vez, nao precisando ajustar a estrutura de execução do teste
    _.times(5, () => { //Chama a função do lodash e passa por parâmetro quantidade de execuções tudo que estiver no bloco
        it.only('Deve cadastrar novos usuários', () => {


            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            // cy.log(name)
            // cy.log(email)
            // cy.log(password)

            cy.get('#name').type(name)
            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.contains('button', 'Criar conta').click()

            // cy.wait('@postSignup')

            cy.contains('Conta criada com sucesso!')
                .should('be.visible')
        })
    })
})