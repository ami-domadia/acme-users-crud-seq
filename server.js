const app = require('./app.js')
const db = require('./db.js')

const PORT = process.env.PORT || 3000
app.listen(PORT, async ()=>{
    console.log('Server is listening on port:', PORT)
    await db.sync()
})

