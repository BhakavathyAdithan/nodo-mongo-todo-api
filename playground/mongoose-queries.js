const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');

var id='5aa54c72cbbb15446c232f24]';

if(!ObjectID.isValid(id))
{
    console.log('Object ID is not valid');
}

//Mongoose accepts String ObjectID and converts it for us unlike native mongo library
Todo.find({
    _id:id
}).then((todos)=>{
    console.log('FindTodo',todos);
},(err)=>{
    console.log(err);
});

Todo.findOne({
    _id:id
}).then((todos)=>{
    console.log('findOne',todos);
},(err)=>{
    console.log(err);
});

Todo.findById(id).then((todos)=>{
    if(!todos)
    {
        return console.log('Id is not Valid');
    }
    console.log('findById',todos);
},(err)=>{
    console.log(err);
}).catch((e)=>{
     console.log(e);
});

