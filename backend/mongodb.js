// CRUD - create, read, update, delete

// const mongodb = require('mongodb');

// MongoClient will give us access to the func neccessary to connect to the db, so we can perform 4 basic CRUD operations
// const MongoClient = mongodb.MongoClient;

// const ObjectId = mongodb.ObjectId;

// destructuring instead
const { MongoClient, ObjectId, Db } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // update documents
//     const updatePromise = db.collection('users').updateOne({ 
//         _id: new ObjectId('635c17f601859f2192306b59')
//     }, {
//         $set: { //name value will be updated
//             name: 'Matthew'
//         }
//     })

//     updatePromise.then((result) => {
//         console.log(result)
//     }).catch((error) => console.log(error))


//  db.collection('tasks').updateMany({ 
//         completed: false },
//         { 
//             $set: {
//             completed: true
//         }
//     }).then((result) => {
//             console.log(result)
//         }).catch((error) => console.log(error))


// delete documents

    // const deletePromise = db.collection('users').deleteMany({ 
    //     age: 28}).then((result) => {
    //         console.log(result)
    //     }).catch((error) => console.log(error))

    // db.collection('tasks').deleteOne({ 
    //     description: 'clean kitchen'}).then((result) => console.log(result)).catch((error) => console.log(error))



    // inserting 1st document into the 'users' collection
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Eliot',
    //     age: 28
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Spencer',
    //         age: 29
    //     }
    // ])

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'clean kitchen',
    //         completed: false
    //     },
    //     {
    //         description: 'take out trash',
    //         completed: true
    //     },
    //     {
    //         description: 'grocery shopping',
    //         completed: false
    //     }
    // ])

    // FETCHING data out of the db
    // db.collection('users').findOne({ name: 'Kristen' })

    // db.collection('users').find({ age: 27 })

    db.collection('tasks').findOne({ _id: new ObjectId('635c1a9efb766ff086101bf3')})

    db.collection('tasks').find({ completed: true })


})



