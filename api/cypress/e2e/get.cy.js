describe('GET /api/users', () => {

    const fighters = [
        {
            name: 'Liu Kang',
            email: 'liu.kang@mk.com',
            password: 'pwd123'
        },
        {
            name: 'Sub-Zero',
            email: 'subzero@mk.com',
            password: 'pwd123'
        },
        {
            name: 'Scorpion',
            email: 'scorpion@mk.com',
            password: 'pwd123'
        },
        {
            name: 'Raiden',
            email: 'raiden@mk.com',
            password: 'pwd123'
        },
        {
            name: 'Kitana',
            email: 'kitana@mk.com',
            password: 'pwd123'
        }
    ]

    before(() => {
        fighters.forEach((fighter) => {
            cy.postUser(fighter)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            fighters.forEach((fighter) => {
                const found = response.body.find((user) => user.email === fighter.email)
                expect(found.name).to.eq(fighter.name)
                expect(found.email).to.eq(fighter.email)
                expect(found).to.have.property('id')
            })
        })
    })

})