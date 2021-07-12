const express=require('express')
//const mongoose=require('mongoose')

const router=express.Router()

router.get('/',(req,res)=>{
	res.render('registration',{title:'Create Bayoffice'})
})
router.post('/',(req,res)=>{
    console.log(req.body)
    res.window("The data has been submitted")
})
module.exports=router;