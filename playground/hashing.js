const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var password = "abc123";
/*bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hashVal) => {
		console.log(hashVal)
	})
}); */

bcrypt.compare(password, '$2a$10$nEZZAkIgpgclu.JKrnx2QObHoTu7bgGGUJyqxnfdWHN8NmJED/fDW', (err, res) => {
	console.log(res)
})
/*
var data = {
	id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token)

var decoded = jwt.verify(token, '123abc');
console.log(decoded)*/