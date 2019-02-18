const express = require('express')
const morgan = require('morgan')
const main = require('./view.js')
const {User, sync} = require('./db.js')
const methodOverride = require('method-override')

const app = express()
app.use(morgan('debug'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

let myHitCounter=0

app.all('*', function(req, res, next){
    myHitCounter++
    console.log('Views:', myHitCounter)
    next()
})
  
app.get('/', async(req, res, next)=>{
    const allusers = await User.findAll()
    await res.send(main(allusers, myHitCounter))
    next()
})

app.post('/', async(req, res, next)=>{
    try{
        const newuser =  {first: req.body.first, last: req.body.last}
        await User.create(newuser)
        await res.redirect('/')
        next()
    }
    catch(error){
        (next('Please enter first and last name!'))
    } 
})

app.delete('/:id', async(req, res, next)=>{
    try{
        await User.destroy(
            {
                where: {
                    id: req.params.id*1
                }
            })
        await res.redirect('/')
        next()
    }
    catch(error){next(error)}
})

module.exports = app