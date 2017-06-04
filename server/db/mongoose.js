const mongoose = require('mongoose')


mongoose.Promise = global.Promise 	// use native Promises
mongoose.connect(process.env.MONGODB_URI)

module.exports = {
	mongoose
} 