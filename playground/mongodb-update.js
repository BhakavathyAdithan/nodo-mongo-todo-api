const {MongoClient,ObjectID} = require('mongodb') // //ES-6 De-Structuring

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{

    if(err)
    {
       return console.log('Unable to connect to MongoDB server'+err);
    }

    console.log('Connected to Mongo DB successfully');

    const db=client.db('TodoApp')

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5aa3b8e67160aae0902de92e')
    },{
        $set:{
            completed:true
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log('Updated Value',result);
    },(err)=>{
        console.log('Failed to Update with the error',err);
    });

    client.close();
});