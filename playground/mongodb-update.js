// const MongodbClient = require('mongodb').MongoClient // connects to mongodb server
// object destructing
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// findOneAndUpdate - similar to findOneAndDelete
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5933066af6d635447e4b7a94")
	// }, {
	// 	$set: {				// MUST USE MONGODB UPDATE OPERATORS!!!
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result)
	// })

	// CHALLENGE
	// update a record in Users (name) & increment (age) - use $inc from docs
	// findOneAndUpdate takes 3 objects(filter, update, options)

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5933072af6d635447e4b7ad3") // filter object
	}, {
		$set: {									// update object with 2 items to update (name & age)
			name: 'Alexius'
		},
		$inc: {
			age: -1
		}	
	}, {
		returnOriginal: false 		// options - return new document
	}).then((result) => {
		console.log(JSON.stringify(result, null, 4))
	})

	// db.close()
})