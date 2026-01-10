describe('Gerenciamento de perfis no Github', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do Github', () => {

        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('qapapito')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Fernando Papito')
        cy.get('#username').type('papitodev')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'papitodev')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Fernando Papito')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')
    })

    it('Deve poder remover um perfil do Github', () => {

        const profile = {
            name: 'Fernando Papito',
            userName: 'papito123',
            description: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.userName)
        cy.get('#profile').type(profile.description)

        cy.contains('button', 'Adicionar Perfil').click()
        cy.contains('table tbody tr', profile.userName)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()

        cy.contains('table tbody', profile.userName)
            .should('not.exist')

    })

    it('ADeve validar link do github', () => {

        const profile = {
            name: 'Fernando Papito',
            userName: 'papitodev',
            description: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.userName)
        cy.get('#profile').type(profile.description)

        cy.contains('button', 'Adicionar Perfil').click()
        cy.contains('table tbody tr', profile.userName)
            .should('be.visible')
            .as('trProfile')

        // cy.get('@trProfile').find('a[href="https://github.com/papitodev"]').click()
        cy.get('@trProfile').find('a')
        .should('have.attr', 'href', 'https://github.com/' + profile.userName)
        .and('have.attr', 'target', '_blank')

    })

})