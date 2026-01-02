describe('Silumando Mouseover', () => {
    it('Deve mostrar um texto com mouseover link Instagram', () => {
        cy.login()

        cy.contains('Isso é Mouseover!')
            .should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!')
            .should('exist')
    })
})