const connectToMongo = require("./db")
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')


connectToMongo();
app.use(cors())
app.use(express.json())
app.use('/auth', require('./routes/routs-for-user'))
app.use('/note', require('./routes/routs-for-notes'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
