const bcrypt=require('bcryptjs');

var password='abc123!'

bcrypt.genSalt(10,(err,salt)=>{
    if(err)
    {
        return console.log(err);
    }

    bcrypt.hash(password,salt,(err,hash)=>{
        if(err)
        {
             return console.log(err);
        }

        console.log(hash);
    })
})

var hashedPassword='$2a$10$PBbSS1zzyChc07nKhwc1T.fKM.IQhYflalfaQtA0dYjbqICTm0qRK';

bcrypt.compare(password,hashedPassword,(err,res)=>{

    console.log(res);

});