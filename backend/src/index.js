const express = require('express')
const Mongoose = require('./db/mongoose')
// require('./db/mongoose') // this ensures that mongoose file will be run and connects to the db - side effect import - bad practice
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const cors = require('cors')

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

// with middleware: new request --> do something --> run route handler

app.use('/', function(req, res) {
    res.render('User')
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port );
})

const Task = require('./models/task')
const User = require('./models/user')

// const main = async () => {
//     // find task and get find its specific user

//     // const task = await Task.findById('6419de9466bbdeb6be92b816')
//     // await task.populate('owner') // aloows us to populate data from a relationshop
//     // // await task.populate('owner').execPopulate() 
//     // console.log(task.owner) // now have a relationship between users and tasks

//     // find user by ID and get all of their tasks
//     const user = await User.findById('6419ddcd57505fee8cc9d759')
//     await user.populate('tasks')
//     console.log(user.tasks) // stores all tasks for specific user - this is virtual - not actual being stored in the database
    
// }

// main()