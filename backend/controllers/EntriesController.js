const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Entries = require('../models/Entries')


//New Entry
router.post("/", async (req, res)=>{
    try{
   
        const newEntry = await Entries.create(req.body);
    
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





module.exports = router;