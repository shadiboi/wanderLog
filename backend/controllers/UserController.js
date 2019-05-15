const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Register-Create
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

//SHOW
router.get('/current', async (req, res, next) => {
    try  {
       const foundUser = await User.findById(req.session.username);
        //console.log(foundUser)
       res.json({
         status: 200,
         data: foundUser
       });

     } catch (err){
       res.send(err);
     }
});

//GET ALL
router.get('/all', async (req,res,next) => {
  try {
    const allUsers = await User.find({});
    //console.log(allUsers, 'all usersssssssssssssss')
    res.json({
      status: 200,
      data: allUsers
    });

  } catch (err){
    res.send(err)
  }

})


//Delete 

router.delete('/:id', async (req, res) => {
  console.log('deleting user')
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json({
            status: 200,
            data: deletedUser
        })

    } catch (err) {
        res.send(err)
    }
})



  






module.exports = router;

