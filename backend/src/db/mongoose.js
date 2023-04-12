const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

// connect to db w/ db url & db name
const Mongoose = mongoose.connect(process.env.MONGOOSE_CONNECTION, {
// const Mongoose = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

module.exports = Mongoose;