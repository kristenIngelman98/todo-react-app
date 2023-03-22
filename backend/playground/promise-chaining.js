require('../src/db/mongoose'); //connect to db
const User = require('../src/models/user');

// User.findByIdAndUpdate('63601c482d5e1ca479e8c7e1', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('63601c482d5e1ca479e8c7e1', 24).then((count) => {
    console.log(count)
}).catch((error) => console.log(error))