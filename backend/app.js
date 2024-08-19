const express = require('express');
const cors = require('cors');
require('dotenv').config()
// const auth = require('./routes/auth');
const login = require('./routes/login')
const task = require('./routes/task')
const { sequelize } = require('./database/models')

const app = express()

app.use(cors());
app.use(express.json());
// app.use(auth)
app.use('/api', login)
app.use('/api', task)

port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World')
})



app.listen(port, () => {
    const date = new Date()
    console.log(`${date} - listening on port ${port}`)
})