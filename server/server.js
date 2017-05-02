// Library imports
const express = require('express')
const bodyParser = require('body-parser')

// Local imports
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

// configure middleware
app.use(bodyParser.json())

// POST - add new todos
app.post('/todos', (req, res) => {
	// console.log(req.body) // body is stored by body-parser in app.use
	const todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
})

app.listen(3000, () => {
	console.log('Started on port 3000')
})

module.exports = {
	app
}