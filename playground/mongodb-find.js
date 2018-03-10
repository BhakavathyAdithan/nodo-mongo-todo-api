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

    //Pull All Objects

    db.collection('Todos').find().toArray().then((docs)=>{

        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));

    },(err)=>{

        console.log('Unable to fetch Todos',err);
    });

    //Find By Property

    db.collection('Todos').find({completed:false}).toArray().then((docs)=>{

        console.log('Todos with False Completed');
        console.log(JSON.stringify(docs,undefined,2));

    },(err)=>{

        console.log('Unable to fetch Todos',err);
    });


    //Find by ID

    db.collection('Todos').find({
        _id: new ObjectID('5aa3b8cd7160aae0902de926')
    }).toArray().then((docs)=>{

        console.log('Todo By ID');
        console.log(JSON.stringify(docs,undefined,2));

    },(err)=>{

        console.log('Unable to fetch Todos',err);
    });

    db.collection('Todos').find().count().then((count)=>{

        console.log('Todos Count',count);
        

    },(err)=>{

        console.log('Unable to fetch Todos Count',err);
    });

    client.close();
});