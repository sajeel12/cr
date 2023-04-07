const config = require('config');
const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    // const token = req.header('x-auth-token');
    const  token = req.cookies.auth_token;
    
    //check for token
    if (!token)
        return res.status(401).json({ msg: ' NO token, authorize denied' });

    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode;
        next();

    } catch (e) {
        res.status(400).json({ msg: 'this token is invalid' });
    }
}

module.exports = auth;