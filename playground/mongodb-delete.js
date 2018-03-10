const {MongoClient,ObjectID} = require('mongodb') // //ES-6 De-Structuring

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{

    if(err)
    {
       return console.log('Unable to connect to MongoDB server'+err);
    }

    console.log('Connected to Mongo DB successfully');

    const db=client.db('TodoApp')

    //deleteOne

    // db.collection('Todos').deleteOne({text:'Book train tickets'}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log('Unable to Delete Todos',err);
    // })

    //deleteMany

    // db.collection('Todos').deleteMany({text:'Book train tickets'}).then((result)=>{

    //     console.log(result);
    // },(err)=>{
    //     console.log('Unable to Delete Todos',err);
    // })

    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({text:'Book train tickets'}).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log('Unable to Delete Todos',err);
    })


    client.close();
});