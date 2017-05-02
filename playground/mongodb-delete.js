// const MongodbClient = require('mongodb').MongoClient // connects to mongodb server
// object destructing
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// DELETE METHODS
	// deleteMany - target many documents & remove them
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result)
	// })

	// deleteOne - targets 1 document & remove it - deletes the 1st item that satisfys criteria
		// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
		// 	console.log(result)
		// })	

	// findOneAndDelete - target 1 document, remove it, and return those values
		// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		// 	console.log(result)
		// })

	// CHALLENGE
	// deleteMany to remove duplicates (name: 'Alexius')
	db.collection('Users').deleteMany({name: 'Alexius'}).then((result) => {
		console.log(result)
	})

	// findAndDelete 1 document by _id ("5907f368f014a16019d75863")
	//_id: new ObjectID("5907eff99459ac5ff513a3d8"
	db.collection('Users').findOneAndDelete({_id: new ObjectID("5907f368f014a16019d75863")}).then((result) => {
		console.log(result)
	})

	// db.close()
})