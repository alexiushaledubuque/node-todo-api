const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

//const id = '59336d89fa6c6013ec8f72d3'

// if (!ObjectID.isValid()) {	// Validate ID verify if id is valid or not before query
// 	console.log('ID not valid')
// }

// because of the assignment above, mongoose will convert to string to 
// object id then run the query.
// Todo.find({
// 	_id: id 
// }).then((todos) => {
// 	console.log('Todos: ', todos)
// })

// // use findOne when only looking for 1 document. Document returned not array
// Todo.findOne({	
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

User.findById('59342fbcbea3d0171b5b92a0').then((user) => {
	if (!user) {
		return console.log('Id not found! ', user)
	}
	console.log('User by Id: ', JSON.stringify(user, null, 4))
}).catch((e) => {
	console.log(e)
})