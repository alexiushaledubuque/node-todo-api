// const MongodbClient = require('mongodb').MongoClient // connects to mongodb server
// object destructing - pull out properties from an object creating variables
const { MongoClient, ObjectID } = require('mongodb')


// arguments are string & a callback - in this case TodoApp database is being created
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// add new record to the Todos collection
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo: ', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops, null, 4))
	// })

	// CHALLENGE - Insert new doc into Users Collection 
	// (name: Alexius, age: 46, location: Brooklyn)
	// result.ops are all the documents that were inserted

	// db.collection('Users').insertOne({
	// 	name: 'Richard',
	// 	age: 65,
	// 	location: 'Bay Ridge, Brooklyn'
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert into user: ', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops, null, 4))
	// 	console.log(result.ops[0]._id.getTimestamp())
	// })

	 db.close()
})