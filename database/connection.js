var mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/restauranttablebookingapi';
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

connect.then((db) => {
	console.log("Connection Successfull" + db);
},(err) => {
	console.log(err);
});