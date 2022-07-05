const express = require('express')
const app = express()
const PORT = 5000


app.use(express.json())
app.use('/', require('./router/routes'))

// listening to
app.listen(PORT, () => console.log('connected to', PORT))
