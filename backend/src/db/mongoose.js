const mongoose = require('mongoose');

// connect to db w/ db url & db name
const Mongoose = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

module.exports = Mongoose;