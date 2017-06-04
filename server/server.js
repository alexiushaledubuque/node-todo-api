// Library imports
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

// Local imports
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

// configure middleware - getting called as a function
app.use(bodyParser.json())

// POST - add new todos
app.post('/todos', (req, res) => {
	// console.log(req.body) // body is stored by body-parser in app.use
	const todo = new Todo({
		text: req.body.text
	})

	// save todo to the collection
	todo.save().then((doc) => { 
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
})

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos})
	}, (e) => {
		res.status(400).send(e)
	})
})

// GET /todos/1234324
// url parameters ':<name>'
app.get('/todos/:id', (req, res) => {

	var id = req.params.id;
	
// CHALLENGE - 
	// VALIDATE ID using isValid
	if (!ObjectID.isValid(id)) {	// Validate IDverify if id is valid or not before query
		return res.status(404).send() // return 404 & empty body
	} 
	
		// NOT VALID - respond with 404 & send back empty send
		// VALID - QUERY using findById
			// success
				// if todo - send it back
			// failed
				// if no todo - send back a 404 with an empty body
			// error 
			  // 400 send back empty body back
	// Test in Postman passing a valid id from todos in robomongo

		Todo.findById(id).then((todo) => {
			if (!todo) {
				return res.status(404).send()
			}
			res.send({todo})
		}).catch((e) => {
			res.status(400).send()
		})
})

app.listen(port, () => {
	console.log(`Started up at port ${port}`)
})

// exported for testing purposes
module.exports = {
	app
}