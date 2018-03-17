const {SHA256}=require('crypto-js');


var message='Hi, I am bucks';
var hash=SHA256(message).toString();

console.log('Message',message);
console.log('Hash',hash);

var data={
    id:4
};

var token={
    data,
    hash:SHA256(JSON.stringify(data)+'mysecret').toString()
}

//Man in the middle may change data value & hash which is avoided due to salting
token.data.id=5;
token.hash=SHA256(JSON.stringify(token.data)).toString();

var resultHash=SHA256(JSON.stringify(token.data)+'mysecret').toString();

if(resultHash===token.hash)
{
    console.log('Data has not changed');
}
else{
    console.log('Data has changed...');
}
