const mongoose = require('mongoose')


mongoose.Promise = global.Promise 	// use native Promises
mongoose.connect('mongodb://localhost:27017/TodoApp')

// create a model
const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,		// mongoose validators
		minlength: 1,
		trim: true 	// removes leading or trailing white space
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
})

// CHALLENGE - NEW USER MODEL, (EMAIL - REQUIRED & TRIM), TYPE, MINLENGTH 1
// CREATE A NEW USER WITH & WITHOUT A NEW USER
const User = mongoose.model('User', { // 1st argument is string model name
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
})

const newUser1 = new User({

})

const newUser2 = new User({
	email: 'test123@num.com'
})

newUser1.save().then((doc) => {
	console.log('Saved document: ', JSON.stringify(doc, null, 4))
}, (e) => {
	console.log('Unable to save document: ', e)
})

newUser2.save().then((doc) => {
	console.log('Saved document: ', JSON.stringify(doc, null, 4))
}, (e) => {
	console.log('Unable to save document')
})
// creating a new todo
// var newTodo = new Todo({
// 	text: 'Cook dinner'
// })

//CHALLENGE - CREATE A NEW TODO
// const newTodo2 = new Todo({
// 	text: true
// })

// save to database 
// results on terminal: Saved todo:  { __v: 0, text: 'Cook dinner', _id: 5908d975de68596674608f7a }
// newTodo.save().then((doc) => {
// 	console.log('Saved todo: ', doc)
// }, (e) => {
// 	console.log('Unable to save Todo')
// })

// newTodo2.save().then((doc) => {
// 	console.log('Saved todo: ', JSON.stringify(doc, null, 4))
// }, (e) => {
// 	console.log('Unable to save Todo')
// })
















