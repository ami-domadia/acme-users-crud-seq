const Sequelize = require('sequelize')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/acme_crud'
const orm = new Sequelize(DATABASE_URL, {logging: false})

const User = orm.define('user', {
    first: {
        type: Sequelize.STRING,
        validate: {
            is: ["^[a-z ]+$",'i']   //case-insensitive requirement of letters
        }
    },
    last: {
        type: Sequelize.STRING,
        validate: {
            is: ["^[a-z ]+$",'i']   //case-insensitive requirement of letters
        }
    }
})

async function sync(){
    try{
        await orm.sync({force: true})
        const a = User.create({
            first: 'Ruth Bader',
            last: 'Ginsberg'
        })
    }
    catch(error){console.log('Error connecting to the database!')}
}

module.exports = {User, sync}