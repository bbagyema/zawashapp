const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render("home" ,{title:'Stay ahead of your Washing Bay.'})
})

module.exports = router;