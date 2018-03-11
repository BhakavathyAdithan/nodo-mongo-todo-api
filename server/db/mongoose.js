const mongoose = require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let db=mongoose.connection;

db.once('open',()=>
{
    console.log('Connected to MongoDB');
});

db.on('error', (err)=>{
    console.log('Unable to Start MongoDB',err);
});

module.exports={
    mongoose
}