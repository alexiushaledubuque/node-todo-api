// const MongodbClient = require('mongodb').MongoClient // connects to mongodb server
// object destructing
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// add new record to the collection
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo: ', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops, null, 4))
	// })

	// Insert new doc into Users (name: Alexius, age: 46, location: Brooklyn)

	// db.collection('Users').insertOne({
	// 	name: 'Alexius',
	// 	age: 46,
	// 	location: 'Bay Ridge, Brooklyn'
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert into user: ', err)
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp())
	// })

	db.close()
})