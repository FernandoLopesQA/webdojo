const pgp =  require('pg-promise')()

const db = pgp({
    host: 'localhost',
    post: 5432,
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
})

function deleteUserByEmail(email) {
    return db.none('delete from public."users" where email = $1', [email])
}

module.exports = {
    deleteUserByEmail
}