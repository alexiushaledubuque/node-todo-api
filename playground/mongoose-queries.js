const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

const id = '5908ed32d844b76e5fc156b2'
// const id = '59090fd457443372421c85cd11'

// if (!ObjectID.isValid()) {	// Validate IDverify if id is valid or not before query
// 	console.log('ID not valid')
// }

// Todo.find({
// 	_id: id // because of the assignment above, mongoose will convert to string to 
// 	        // object id then run the query.
// }).then((todos) => {
// 	console.log('Todos: ', todos)
// })

// Todo.findOne({	// use findOne when only looking for 1 document. Document returned not array
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo: ', todo)
// })

// Todo.findById(id).then((todo) => {
// 	if(!todo) {
// 		return console.log('Id not found')
// 	}
// 	console.log('Todo By Id: ', todo)
// }).catch((e) => {
// 	console.log(e)
// })

// CHALLENGE - QUERY USERS COLLECTION (grab an id), load User model, User.findById
// 3 cases - 1. query works; but, no user 2. User found - print to screen
// 3. error handling

User.findById('5908ed32d844b76e5fc156b2').then((user) => {
	if (!user) {
		return console.log('Id not found! ', user)
	}
	console.log('User by Id: ', JSON.stringify(user, null, 4))
}).catch((e) => {
	console.log(e)
})

