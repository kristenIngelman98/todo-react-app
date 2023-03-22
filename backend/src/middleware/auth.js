const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') // replace with nothing
        // ensure that the token is valid and hasn't expired
        const decoded = jwt.verify(token, 'thisismynewcourse') // thisismynewcourse is the secret used when token was created
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token // other route hand;ers will have access to this token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
    
} 

module.exports = auth