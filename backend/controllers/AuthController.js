const express = require('express');
const router = express.Router();
const User   = require('../models/User');
const bcrypt = require('bcryptjs');



//Register
router.post("/", async (req, res)=>{
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body)
        newUser.password = null;
        req.session.userId = newUser._id;
        res.json({
            status: 200,
            data: newUser
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
})

//Login
router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({username : req.body.username});
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
                req.session.logged = true;
                req.session.username = foundUser._id 
                res.json({
                           status: 200,
                           data: foundUser
                })         
            }
        }
        console.log(req.session, 'sessions here<<<<<<<<<<<,')

        res.send({
            status: 500,
            data: "No such user or password"
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
})

module.exports = router;
