require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('635c5dc9d5d29c6070a41ae3').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTaskAndCount = async (id, status) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: status })
    return count
}

deleteTaskAndCount('635c5d706dfc5c55f5886434', false).then((result) => {
    console.log(result)
}).catch((error) => console.log(error))