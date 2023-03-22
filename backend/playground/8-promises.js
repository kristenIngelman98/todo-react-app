// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1,2,3,4])
//         reject('things went wrong!')

const { response } = require("express")


//     }, 2000)

// })

// // only gets excecuted when things go well
// doWorkPromise
//     .then((result) => console.log(`success! ${result}`))
//     .catch((error) => console.log(`error! ${error}`))

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum)
//     // nesting gets messy and super complicated!!
//     add(sum, 5).then((sum2) => {
//         console.log(sum2)
//     })
// }).catch((error) => {
//     console.log(error)
// })

// Promise Chaining
add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})