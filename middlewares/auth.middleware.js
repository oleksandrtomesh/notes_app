const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try {
        
        //get authorised user token from frontend
        const token = req.headers.authorization.split(' ')[1]
        
        //if no token, send error message back
        if(!token){
            return res.status(401).json({message: 'User does not authorised'})
        }
        //decod jwt token with help of jsonwebtoken library
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //put decoded data into req object
        req.user = decoded
        next()

    } catch(e){
        res.status(401).json({message: 'User does not authorised'})
    }
}