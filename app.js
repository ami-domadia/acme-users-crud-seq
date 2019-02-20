const express = require('express')
const morgan = require('morgan')
const {main, individual} = require('./view.js')
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
    try{
        const allusers = await User.findAll()
        res.send(main(allusers, myHitCounter))
    }
    catch(error){next('Could not get all users!')}
    
})

app.get('/:userid', async(req, res, next)=>{
    try{
        const user = await User.findOne({where: {id: req.params.userid*1}})
        res.send(individual(user, myHitCounter))
    }
    catch(error){next('Could not get this user!')}
    
})

app.put('/:userid', async(req, res, next)=>{
    try{
        const user = await User.findOne({where: {id: req.params.userid*1}})
        await user.update({first: req.body.first, last: req.body.last})
        res.send(individual(user, myHitCounter))
    }
    catch(error){next('Could not update this user!')}
    
})

app.post('/', async(req, res, next)=>{
    try{
        const newuser =  {first: req.body.first, last: req.body.last}
        await User.create(newuser)
        res.redirect('/')
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
        res.redirect('/')
    }
    catch(error){next(error)}
})

module.exports = app