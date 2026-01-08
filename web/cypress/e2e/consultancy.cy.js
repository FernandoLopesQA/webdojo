// import consultancyData from '../fixtures/consultancy.json'
import {personal, company } from '../fixtures/consultancy.json'

describe('Formulário de consultoria', () => {

    before(() => {
        cy.log('Isso acontece antes de todos os testes uma única vez')
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

        //cy.fixture('consultancy.json').as('consultancyData')
    })

    it('Deve solicitar consultoria individual', () => {

        // const consultancyForm = {
        //     name: 'Fernando Papito',
        //     email: 'papito@teste.com.br',
        //     phone: '11 99999-1000',
        //     consultanceType: 'Individual',
        //     personType: 'cpf',
        //     document: '65602530070',
        //     discoveryChannels: [
        //         'Instagram',
        //         'LinkedIn',
        //         'Udemy',
        //         'YouTube',
        //         'Indicação de Amigo'
        //     ],
        //     file: './cypress/fixtures/document.pdf',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        //     techs: [
        //         'Cypress',
        //         'Selenium',
        //         'WebDriverIO',
        //         'Playwright',
        //         'Robot Framework'
        //     ],
        //     terms: true
        // }

        // const consultancyForm = consultancyData.personal

        cy.get('#name').type(personal.name)
        cy.get('input[placeholder="Digite seu email"]').type(personal.email)
        cy.get('#phone').type(personal.phone)
        // .should('have.value', '(11) 99999-1000')

        // Seleciona valor em dropdown list
        cy.get('#consultancyType').select(personal.consultanceType)

        if (personal.personType === 'cpf') {
            //span[text()="Pessoa Física"]/..//input
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            // Preenchendo valor de CPF
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (personal.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            // Preenchendo valor de CPF
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(personal.document)
        // .should('have.value', '656.025.300-70')

        // Selecionando mais de um checkbox
        // const discoveryChannels = [
        //     'Instagram',
        //     'LinkedIn',
        //     'Udemy',
        //     'YouTube',
        //     'Indicação de Amigo'
        // ]

        personal.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(personal.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)

        // const techs = [
        //     'Cypress',
        //     'Selenium',
        //     'WebDriverIO',
        //     'Playwright',
        //     'Robot Framework'
        // ]

        personal.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (personal.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        // Declarando timedout explícito
        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve solicitar consultoria In Company', () => {

        // const consultancyForm = {
        //     name: 'Fernando Papito',
        //     email: 'papito@teste.com.br',
        //     phone: '11 99999-1000',
        //     consultanceType: 'In Company',
        //     personType: 'cnpj',
        //     document: '33810761000168',
        //     discoveryChannels: [
        //         'LinkedIn'
        //     ],
        //     file: './cypress/fixtures/document.pdf',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        //     techs: [
        //         'Cypress'
        //     ],
        //     terms: true
        // }

        // const consultancyForm = consultancyData.company

        cy.get('#name').type(company.name)
        cy.get('input[placeholder="Digite seu email"]').type(company.email)
        cy.get('#phone').type(company.phone)
        // .should('have.value', '(11) 99999-1000')

        // Seleciona valor em dropdown list
        cy.get('#consultancyType').select(company.consultanceType)

        if (company.personType === 'cpf') {
            //span[text()="Pessoa Física"]/..//input
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            // Preenchendo valor de CPF
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (company.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            // Preenchendo valor de CPF
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(company.document)
        // .should('have.value', '656.025.300-70')

        // Selecionando mais de um checkbox
        // const discoveryChannels = [
        //     'Instagram',
        //     'LinkedIn',
        //     'Udemy',
        //     'YouTube',
        //     'Indicação de Amigo'
        // ]

        company.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(company.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(company.description)

        // const techs = [
        //     'Cypress',
        //     'Selenium',
        //     'WebDriverIO',
        //     'Playwright',
        //     'Robot Framework'
        // ]

        company.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (company.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        // Declarando timedout explícito
        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.contains('button', 'Enviar formulário')
            .click()

        // Validando texto e estilização
        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

    })

    afterEach(() => {
        cy.log('Isso acontece depois de cada teste')
    })

    after(() => {
        cy.log('Isso acontece depois de todos os testes uma única vez')
    })

})

