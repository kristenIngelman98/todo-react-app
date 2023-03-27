const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

// create task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body, //copy all of the properties from body into this object
        owner: req.user._id // get the owner from the person we just - newly added property to connect to User
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete( { _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// read all tasks for authenticated user
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// read single task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id }) // find single task
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// update task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body) // will return an array of strings where each is a property on that object
    const allowedUpdates = ['description', 'completed']

    // every() array method will run for every item in the updates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router