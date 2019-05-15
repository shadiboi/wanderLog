const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Entries = require('../models/Entries')
const User = require('../models/User')


//New Entry
router.post("/", async (req, res)=>{
    try{
   
        const newEntry = await Entries.create(req.body);
        

        const foundUser = await User.findById(req.session.username)
       //console.log(foundUser, 'found user hereeee')

      foundUser.entries.push(newEntry)
    
        res.json({
            status: 200,
            data: newEntry
        })

    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
})

//ALL ENTIRES
router.get('/', async (req, res, next) => {
    try  {
       const foundEntries = await Entries.find({});
        //console.log(foundEntries)
       res.json({
         status: 200,
         data: foundEntries
       });

     } catch (err){
       res.send(err);
     }
});

//USERS ENTRIES
router.get('/:id', async (req, res, next) => {
    try  {
   const foundUserEntries = await Entries.find({ owner: { $in: [ req.params.id]}})
//({ owner: { $in: [ foundUser._id]}});
        console.log(foundUserEntries, "users entriessssssss>>>>>>>>.")
       res.json({
         status: 200,
         data: foundUserEntries
       });

     } catch (err){
       res.send(err);
     }
});




module.exports = router;