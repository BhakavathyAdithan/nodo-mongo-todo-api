require('./config/config');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const _=require('lodash');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');

//Configure port for Heroku Deployment & Local Deployment
const port=process.env.PORT;

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

//GET By Id Route

app.get('/todos/:id',(req,res)=>{

var id= req.params.id;

if(!ObjectID.isValid(id))
{
   return res.status(404).send();
}

Todo.findById(id).then((todo)=>{
    
    if(!todo)
    {
        return res.status(404).send();
    }
    return res.status(200).send({todo});
},(err)=>{
    return res.status(400).send();
}).catch((e)=>{
    res.status(400).send();
});


});


//DELETE By Id Route

app.delete('/todos/:id',(req,res)=>{

    var id= req.params.id;
    
    if(!ObjectID.isValid(id))
    {
       return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todo)=>{
        
        if(!todo)
        {
            return res.status(404).send();
        }
        return res.status(200).send({todo});
    },(err)=>{
        return res.status(400).send();
    }).catch((e)=>{
        res.status(400).send();
    });

    
    });

    //PATCH Route

    app.patch('/todos/:id',(req,res)=>{

        var id=req.params.id;
        
        if(!ObjectID.isValid(id))
        {
            return res.status(404).send();
        }

        var body=_.pick(req.body,['text','completed']);

        if(_.isBoolean(body.completed) && body.completed)
        {
            body.completedAt=new Date().getTime();
        }
        else{
            body.completedAt=null;
            body.completed=false;
        }

        Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
            if(!todo)
            {
                return res.status(404).send();
            }

            return res.send({todo});
        }).catch((e)=>{
            res.status(400).send();
        })
    })

//Server Start-Up
app.listen(port,()=>{
    console.log(`Connected to Server @ Port number ${port} !`);
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



