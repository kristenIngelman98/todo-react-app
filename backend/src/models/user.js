const { BatchType } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true   
    },
    email: {
        type: String,
        required: true,
        unique: true, //make sure multiple people don't sign up with same email. guarantee uniqueness
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot include "password"')
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// setup a VIRTUAL PROPERTY
// not actual data stored in the database, its a relationship between 2 entitites E.g. between User and tasks

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // associated with the users ID
    foreignField: 'owner' // name of the field on the task -> set that up to be the owner - also an ID
})

// we want back an obj with JUST user data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    // removing password and token from response to the client**
    delete userObject.password
    delete userObject.tokens
    return userObject
}
// generating auth token for user --> for signup and login
userSchema.methods.generateAuthToken = async function () {
    const user = this

    // id and secret - use .sign() to provide payload and secret
    // uniquely identify the user with their unique id
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    // save token to the database
    user.save()
    
    return token
}

// can access on the model
// attempt to find the user by those peices on info
userSchema.statics.findByCredentials = async (email, password) => {
    // first find by email
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    // then verify by password (plain text password, hashed password)
    const isMatch = await bcrypt.compare(password, user.password)

    // if not a match, throw error
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user

}

// do this before we save
// "next", must call next() when we are done
// if we don't call next() the function will hang and the use rwill not be saved
userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})
// delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id }) // delete all tasks where the owner ID is set to something specific
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;