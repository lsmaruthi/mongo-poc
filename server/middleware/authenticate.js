const {User} = require('./../models/user');
var authenticate = (req, res, next) => {
	var token = req.header('x-auth');
	User.findByToken(token).then((doc) => {
		if(!doc)
			return res.status(401).send(doc)
		req.user = doc;
		req.token = token;
		next();
	}).catch((e) => res.status(401).send(e))
}

module.exports = {authenticate};