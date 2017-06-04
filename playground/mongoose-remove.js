const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

//Todo.remove({query}) - can be empty - add an empty object to remove all records

// Todo.remove({}).then((result) => {
// 	console.log(result)
// })

// Better method
//Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '5934513af6d635447e4b8ac7'}).then((todo) => {
	console.log(todo)
})

//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5934513af6d635447e4b8ac7').then((todo) => {
	console.log(todo)
})