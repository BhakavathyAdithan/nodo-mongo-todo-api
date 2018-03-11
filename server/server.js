const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');

//Express Initialization
var app=express();

//Middleware for Body Parser
app.use(bodyParser.json());

//POST Route
app.post('/todos',(req,res)=>{
var todo=new Todo({
    text: req.body.text
});

todo.save().then((todo)=>{
    res.status(200).send({todo});
},(err)=>{
    res.status(400).send(err);
});
});

//GET Route
app.get('/todos',(req,res)=>{

    Todo.find().then((todos)=>{
        res.status(200).send({todos});
    },(err)=>{
        res.status(400).send(err);
    });

});

//Server Start-Up
app.listen(3000,()=>{
    console.log('Connected to Server @ Port number 3000 !');
});

module.exports={app};

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



