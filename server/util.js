import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,

    }, config.JWT_SECRET, {
        expiresIn: '48h'
    });
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decodedInfo) => {
        if(error){
            return res.status(401).send({msg: "Invalid Token"});
        }
        if(decodedInfo){
            req.user = decodedInfo;
            return next();
        }else{
            return res.status(401).send({ msg: "token is not provided" });
        }
    });
    
}

const isAdmin = (req, res, next) => {
    //console.log(req.user);
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({ msg: "Admin token is not valid"});
}

export { getToken, isAuth, isAdmin }