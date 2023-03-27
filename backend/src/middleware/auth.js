const jwt = require('jsonwebtoken')
const User = require('../models/user')

// with middleware: new request --> do something --> run route handler
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') // replace with empty string
        // ensure that the token is valid and hasn't expired
        const decoded = jwt.verify(token, 'mysecret') // mysecret is the secret used when token was created

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token // other route handlers will have access to this token
        req.user = user
        next() // if next() is not called, the actual route handler is never going to run
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
} 

module.exports = auth