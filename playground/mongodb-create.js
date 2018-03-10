//const MongoClient=require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb') // //ES-6 De-Structuring

//ES-6 De-Structuring
var user={name:'Adithan', age:28};
var{name}=user;
console.log(name);

var objID=new ObjectID();
console.log(objID);

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{

    if(err)
    {
       return console.log('Unable to connect to MongoDB server'+err);
    }

    console.log('Connected to Mongo DB successfully');

    const db=client.db('TodoApp')

    db.collection('Todos').insertOne({
        text: 'Book train tickets',
        completed: false
    },(err,result)=>{

        if(err)
        {
            return console.log('Unable to insert Todo');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});