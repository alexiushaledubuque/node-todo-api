// const MongodbClient = require('mongodb').MongoClient // connects to mongodb server
// object destructing
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// db.collection('Todos').find({
	// 	_id: new ObjectID("5907eff99459ac5ff513a3d8")
	// }).toArray().then((docs) => {
	// 	console.log('Todos')
	// 	console.log(JSON.stringify(docs, null, 4))
	// }, (err) => {
	// 	console.log('Unable to fetch Todos: ', err)
	// })

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`)
	// }, (err) => {
	// 	console.log('Unable to fetch Todos: ', err)
	// })

	db.collection('Users').find({name: 'Alexius'}).toArray().then((docs) => {
		console.log(`Users found: ${JSON.stringify(docs, null, 4)}`)
	}, (err) => {
		console.log('Unable to fetch Users: ', err)
	})
	// db.close()
})