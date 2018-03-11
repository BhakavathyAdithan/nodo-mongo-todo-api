const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');

//Express Initialization
var app=express();

//Middleware for Body Parser
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
//console.log(req.body);
var todo=new Todo({
    text: req.body.text
});

todo.save().then((doc)=>{
    res.status(200).send({doc});
},(err)=>{
    res.status(400).send(err);
});
});

app.listen(3000,()=>{
    console.log('Connected to Server @ Port number 3000 !');
});

// var newTodo=new Todo({
//     text:'Lunch time'
// });

// newTodo.save().then((doc)=>{
//     console.log('Saved Doc',doc);
//     },(err)=>{
//     console.log('Error saving Doc',err);
//     });

// var othertodo=new Todo({
//     text:'Feed Dog',
//     completed: true,
//     completedAt: 123
// });

// othertodo.save().then((doc)=>{
//     console.log('Saved Doc',doc);
//     },(err)=>{
//     console.log('Error saving Doc',err);
//     });



