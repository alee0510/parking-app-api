// import module
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const database = require('./database')

// setup app framework
const app = express()

// url logger middleware
const urlLogger = (req, res, next) => {
    console.log(req.method + ' : ' + req.url)
    next() // execute next middleware
}


// apply middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
// cors option
const option = { exposedHeaders : 'Auth-Token', }
app.use(cors(option))
app.use(urlLogger)

// set public folder to save or access all assets
app.use(express.static('public'))

// setup database
database.connect(err => {
    if (err) return console.log('error connecting : ', err.stack)
    console.log('connected as id : ', database.threadId)
})

// home route
app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Parking-App APIs</h1>')
})

// connect our router
const { adminRouter, userRouter, profileRouter, historyRouter } = require('./routers')
app.use('/api/admin/', adminRouter)
app.use('/api/history/', historyRouter)
app.use('/api/user/', userRouter)
app.use('/api/user/', profileRouter)


console.log('secret token : ', process.env.SECRET_TOKEN)
console.log('pass', process.env.PASS)

// binding our server to port
const PORT = process.env.PORT || 2000
app.listen(PORT, _ => console.log(`APIs running at port : ${PORT}`))