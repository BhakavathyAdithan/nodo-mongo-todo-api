const {ObjectID}=require('mongodb');
const jwt=require('jsonwebtoken');

const {Todo}=require('./../../models/todo');
const {User}=require('./../../models/user');

var userOne=new ObjectID();
var userTwo=new ObjectID();

const users=[{
    _id:userOne,
    email:'adithan2007@gmail.com',
    password:'abc123#',
    tokens:[
            {
                access:'auth',
                token: jwt.sign({_id:userOne, access:'auth'},'abc123!').toString()
            }
        ]
    },
    {
    _id:userTwo,
    email:'adithan2007@yahoo.com',
    password:'abc123$',
   
    }
];

const todos=[{
    _id: new ObjectID(),
    text:'First todo for the day'
},
{
    _id: new ObjectID(),
    text:'Second todo for the day',
    completed:true,
    completedAt:333
}];

const populateTodos=(done)=>{
    Todo.remove({}).then(()=>{
         Todo.insertMany(todos);
         done();
    });
};

const populateUsers=(done)=>{
    User.remove({}).then(()=>{ 
        var user_1=new User(users[0]).save();
        var user_2=new User(users[1]).save();
        done();
        return Promise.all([user_1,user_2]);
    }).catch((e)=>{
        console.log('Error',e);
        done(e);
    })
};

module.exports={todos,populateTodos,users,populateUsers};