const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')  //For To enable cors policy warning 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())  //For to disable cors policy warning

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/file', require('./routes/file'))
app.use('/api/course', require('./routes/course'))
app.use('/api/publication', require('./routes/publication'))
app.use('/api/introduction', require('./routes/introduction'))



app.listen(port, () => {
  console.log(`Evalue content portal listening ${port}`)
})