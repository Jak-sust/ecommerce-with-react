import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post("/register", async (req, res) => {
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    }else{
        res.status(401).send({msg: "Invalid User Data"});
    }
});

router.post("/signin", async (req, res) => {
    const signedInUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signedInUser){
        res.send({
            _id: signedInUser._id,
            name: signedInUser.name,
            email: signedInUser.email,
            isAdmin: signedInUser.isAdmin,
            //token: getToken(signedInUser.toObject())  //need to make plain object, it can be done using toJSON() function.
            token: getToken(signedInUser)
        });
    }else{
        res.status(401).send({msg: "Invalid Email or Password"});
    }
});

router.get("/create-admin", async (req, res) => {

    try{
        const user = new User({
            name: 'Jakir',
            email: 'jakir.sust@gmail.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    }catch(e){
        res.send({msg: e.message});
    }
    
});

export default router;