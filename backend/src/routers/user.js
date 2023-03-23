const express = require('express')

const User = require('../models/user')
const auth = require('../middleware/auth')
// defining new router
const router = new express.Router()

// creating user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        // generate token for a specific user
        const token = await user.generateAuthToken()
        res.send({ user, token })
        // res.send({ user: user.getPublicProfile(), token})
    } catch (e) {
        res.status(400).send('unable to login')
    }
})

// this endpoint will requrie authentication - need token to logout
router.post('/users/logout', auth, async (req, res) => {
    // need access to token that was used to login - only want to logout on certain device
    console.log("ALL TOKENS", req.user.tokens) // uncomment this after test

    try  {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token // if not eqyal, return true otherwise remove from obj
        })
        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

// will wipe all tokens from a user - so if logged in on multiple devices, will be logged out EVERYWHERE
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()

    }
})

// read all users
// added middleware to /users route - auth
// get my OWN user info
router.get('/users/me', auth, async (req, res) => {
    // this will only run if the user is actually authenticated
    res.send(req.user)
    // try {
    //     // mongoose gets all users from the db
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }
})

// read user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("Can't find user")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send("server error?!") // need better error messages!
    }
})

// updating user
// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body) // will return an array of strings where each is a property on that object
//     const allowedUpdates = ['name', 'email', 'password', 'age']

//     // every() array method will run for every item in updates array
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }
//     try {
//         const user = await User.findById(req.params.id)

//         user.name = 'Something else'

//         updates.forEach((update) => user[update] = req.body[update])

//         await user.save()

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) // will return an array of strings where each is a property on that object
    const allowedUpdates = ['name', 'email', 'password', 'age']

    // every() array method will run for every item in updates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


// deleting user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;