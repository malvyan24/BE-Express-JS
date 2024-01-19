const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    //mengambnil header authorization
    const authorization = req.get("Authorization");
    //menagmbil nilai token : bearer token
    const token = authorization && authorization.split(" ")[1] ;
    //jika token tidak ada
    if (!authorization) {
        const response = {
            message: "please provide token",
        };

        return res.status(401).json(response);
    }

    try {
        //cek jika token valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        const response = {
            message: "Invalid Token",
        };

        return res.status(401).json(response);
    }
};

module.exports =  auth;