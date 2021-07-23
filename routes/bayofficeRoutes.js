const express = require('express');
const mongoose=require('mongoose');
const Manager=require('../model/Manager');
const Vehicle=require('../model/Vehicle');
const Washer=require('../model/Washer');
const Expenses=require('../model/Expenses');


const router = express.Router();


washPackages = {
	smallcars: {washerFee:3000,packagePrice:10000},
	medium:{washerFee:4000,packagePrice:15000},
	fullwash:{washerFee:5000,packagePrice:20000},
	bodaboda:{washerFee:1500,packagePrice:5000},
	engine:{washerFee:2000,packagePrice:10000}
}
router.get('/', (req,res)=>{
    res.render("bay_office",{title:"Bay Office"}) 
   })
//washer routes
router.get('/washer', (req,res)=>{
    res.render("reg_washer",{title:"Register Washer",
    	alert:req.query.alert
	})
})
router.post('/washer',async(req,res)=>{
	try{
	const washer= new Washer(req.body);
	await washer.save()
 	res.redirect('washer?alert=success')
}
	catch(err) {
		res.status(400).render('reg_washer', {title:'Register Washer',
			alert:'error'})
			console.log(err)
	}
})
//vehicle/customer routes
router.get('/vehicle', async(req,res)=>{
	let washerlist= await Washer.find();
    res.render('reg_vehicle', {title:"Register Vehicle", 
    	washers:washerlist,
    	alert:req.query.alert
	})
})
router.post('/vehicle', async(req,res)=>{
	try{
		//combine date and time
		let data=req.body
		let datetimeArrival=Date.parse(data.doa +'T'+data.toa)
			data.datetimeArrival=datetimeArrival
		//derive package price and washer fee
		let packageDetails=washPackages[data.package]

		data.packagePrice=packageDetails['packagePrice']
		data.washerFee=packageDetails['washerFee']

		const vehicle= new Vehicle(data);
		await vehicle.save()
		res.redirect('vehicle?alert=success')
		}
	catch(err){
		res.status(400).render('reg_vehicle',
			{title:'Register Vehicle',
			alert:'error'})
			console.log(err)
		}
	})
//manager routes
router.get('/manager', (req,res)=>{
    res.render('add_manager', 
    	{title:"Add Manager",
    	alert:req.query.alert})
})
router.post('/manager',async(req,res)=>{
	const manager= new Manager(req.body);
	await Manager.register(manager, req.body.password, (err)=>{
		if(err){
			res.status(400).render('reg_manager',
				{title:'Add Manager',
				alert:'error'})
			console.log(err)
		}else{
			res.redirect('manager?alert=success')
		}
	})
})
//expenses/inventory routes
router.get("/expenses", (req,res)=>{
    res.render('add_expenses', {title:"Add Expenses",alert:req.query.alert})
})
    router.post('/expenses',async(req,res)=>{
    	try{
    		const expense= new Expense(req.body);
    		await expense.save()
    		res.redirect('expenses?alert=success')
    	}
    	catch (err){
    		res.status(400).render('add_expenses',{title:'Add Expenses',alert:'error'})
    		console.log(err)
    	}
    })
    router.post('/delete-washer',async(req,res)=>{
    	try{
    		await Washer.deleteOne({_id:req.body.id})
    		res.redirect('back')

    	}
    	catch(err){
    		res.status(400).send('Unable to delete item');
    	}  

 	})
module.exports=router;