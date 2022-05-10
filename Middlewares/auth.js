const jwt = require('jsonwebtoken');
// compare header's userId and body's userId if incoming request
// if don't match, send errorMessage
// else execute the next middleware
module.exports = (req, res, next) => {
    try {
        // Extracts token from incoming request's headers
        const authorizationData = req.headers.authorization.split(' ');
        const token = authorizationData[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extracts userId from token
        const userId = decodedToken.userId;
        if(!userId){
            throw 'Without userId';
        }else {
            next();
        }
       
    } catch {
        // in error case , send errorMessage
        res.status(400).json({ message: 'request invalid !' })
    }

}