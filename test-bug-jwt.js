const jwt = require('jsonwebtoken')
const privateKey = 'bug'

const obj1 = {
    teste: 'obj1',
    name: 'Diego Dantas',
    username: 'diego.dantas',
    especial: 'mãe 1'
}

const token = jwt.sign(obj1, privateKey);
// console.log('token: ' + token);

const obj2 = {
    teste: 'obj2',
    especial: 'mãe 2',
    token
}

const token2 = jwt.sign(obj2, privateKey);
// console.log('token2: ' + token2);

jwt.verify(token2, privateKey, function(err, decoded) {
    if (err)
        return console.error(err)
    
    console.log(decoded)

    jwt.verify(decoded.token, privateKey, function(err, decoded) {
        if (err)
            return console.error(err)
        
        console.log(decoded)
    })
})