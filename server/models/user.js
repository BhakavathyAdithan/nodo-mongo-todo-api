const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _ =require('lodash');

//User model structure
// {
//     email:'adithan2007@gmail.com',
//     password:'<hashed_password>',
//     tokens:[          // Each user can have multi-tokens based on their login via different devices 
//         {
//             auth:'access',
//             token: '<hashed_token_value>'
//         }
//     ];
// }

var UserSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
        minlength:1,
        trim: true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            //OR
            // validator:(value)=>{
            //     return validator.isEmail(value);
            // },
            message:'{VALUE} is not a valid email address'
        }
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    tokens:[{

        access:{
            type:String,
            required:true,
        },

        token:{
            type:String,
            required:true,
        }

    }]

});

UserSchema.methods.toJSON=function()
{
    var user=this;
    var userObject=user.toObject(); //This converts the document to regular object

    return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken=function()
{
    var user=this;
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},'abc123!').toString();
    //user.tokens.push({access,token});
    //OR
    user.tokens=user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;
    });
};

UserSchema.statics.findByToken=function(token)
{
    var User=this;
    var decoded;

    try{

        decoded=jwt.verify(token,'abc123!')
    }
    catch(e)
    {
        // return new Promise((resolve,reject)=>{
        //     reject();
        // });
        //OR
        return Promise.reject();
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
}

var User=mongoose.model('User',UserSchema);

module.exports={User};