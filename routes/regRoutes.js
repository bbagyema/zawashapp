const express=require('express')
const mongoose=require('mongoose')
const Registration=require('../model/Registration')

const router=express.Router()

router.get('/', (req,res)=>{
    res.render('registration', 
    	{title:"Create Bayoffice",
    	alert:req.query.alert})
})
router.post('/',async(req,res)=>{
	try{
	const admin= new Registration(req.body);
	await admin.save()
	console.log(admin)
 	res.render('bay_office',{title:'Bay Office',alert:'success'})
}
	catch(err) {
		res.status(400).render('registration', {title:'Create Bayoffice',
			alert:'error'})
			console.log(err)
	}
})
module.exports=router;