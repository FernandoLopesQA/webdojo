// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-real-events'
import './actions/consultancy.actions'

Cypress.Commands.add('start', () => {
    // cy.viewport(1920, 1080)
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
})

// Função para logar no sistema
Cypress.Commands.add('submitLoginForm', (email, senha) => {
    cy.get('#email').type(email)
    cy.get('#password').type(senha)

    cy.contains('button', 'Entrar').click()
    //cy.get('//button[text()="Entrar"]') - não funciona pois cypress não tem suporte xpath 
})

// Função para acessar menus
Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

    cy.contains('h1', pageTitle)
        .should('be.visible')
})

function getTodayDate() {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    return `${day}/${month}/${year}`
}

// Helper login
Cypress.Commands.add('login', (ui = false) => {

    if (ui == true) {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
    }
    else {
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = getTodayDate()

        cy.setCookie('login_date', loginDate)

        cy.visit('http://localhost:3000/dashboard', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })
    }
})