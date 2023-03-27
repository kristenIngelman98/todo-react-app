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
        unique: true, // ensure email is unique (no duplicate email sign ups)
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
    // array of objects -> each object is a token -> a new token is created on each login/signup submission
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// VIRTUAL PROPERTY -> not actual data stored in the database, but a relationship between 2 entitites E.g. between a user & tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // associated with the users id
    foreignField: 'owner' // name of the field on the task -> set that up to be the owner - also an ID
})

// returning an obj with JUST user data (without password & all tokens)
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject() // converts mongoose obj into reg js object
    delete userObject.password // removing password from response to client
    delete userObject.tokens // removing tokens from response to client
    return userObject
}

// generating auth token for user --> for signup & login
userSchema.methods.generateAuthToken = async function () { // new method
    const user = this

    // id and secret - use .sign() to provide payload and secret -> uniquely identify the user with their unique id
    const token = jwt.sign({ _id: user._id.toString()}, 'mysecret') // jwt.sign() creates a token --> takes 2 args, an object and a string
    // object includes the data that will be embedded in our token, for us all we need to store in here is a unique identifier (so _id!)
    // second arg is the secret, make sure it wasn't tampered or changed in any way

    user.tokens = user.tokens.concat({ token }) // add new token to the tokens array
    user.save() // save token to the database
    return token
}

// attempt to find the user by specific pieces of info (email/password)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }) // first find by email

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

// do this before we save -> must call next() when we are done or the funct will hang and the user will NOT be saved - middleware (pre-save hook)
userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// delete user tasks when user is removed - middleware 
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id }) // delete all tasks where the owner id is set to something specific
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;