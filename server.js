const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/notes', require('./routes/notes.routes'))

const PORT = config.get('port')

const start = async () => {
    try{
        await mongoose.connect(config.get('mongoUri'), {
        })
        app.listen(PORT, () => console.log(`app has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()


