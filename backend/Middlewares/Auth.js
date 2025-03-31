const jwt = require('jsonwebtoken');


const ensureAuthenticated = (req, res, next)=> {
    const auth = req.header('authorization');//token we receved from authorizationheader
    if(!auth){
        return res.status(403).json({
            message : 'Unauthorized, JWT token is reqired'
        });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);//it check whater token is correct or expired or not
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message : 'Unauthorized, JWT token wrong or expired'
        });
    }


}


module.exports = ensureAuthenticated;