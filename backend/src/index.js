const express = require('express')
const Mongoose = require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const cors = require('cors') // cross-origin resource sharing

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())

// configure express to automatically parse incoming JSON to an Obj
app.use(express.json())

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'src/views') //specifying views folder relative path location

// register user & task routers with express application
app.use(userRouter)
app.use(taskRouter)

// without middleware: new request --> run route handler


app.use('/', function(req, res) {
    res.render('User') // ejs file
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port );
})

// const Task = require('./models/task')
// const User = require('./models/user')