const jwt = require('jsonwebtoken')
const privateKey = 'bug'

const obj1 = {
    name: 'Diego Dantas',
    username: 'diego.dantas'
}

const token = jwt.sign(obj1, privateKey);
// console.log('token: ' + token);

const obj2 = {
    test: 'token2',
    obj1
}

const token2 = jwt.sign(obj2, privateKey);
// console.log('token2: ' + token2);

jwt.verify(token2, privateKey, function(err, decoded) {
    if (err)
        return console.error(err)
    
    console.log(decoded)
})