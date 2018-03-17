const jwt=require('jsonwebtoken');

var data={
    id:10
}

var token=jwt.sign(data,'abc123!');
console.log('Token',token);

var decoded=jwt.verify(token,'abc123!');
console.log('Decoded',decoded);