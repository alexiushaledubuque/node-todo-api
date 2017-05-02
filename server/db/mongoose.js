const mongoose = require('mongoose')


mongoose.Promise = global.Promise 	// use native Promises
mongoose.connect('mongodb://localhost:27017/TodoApp')

module.exports = {
	mongoose
} 