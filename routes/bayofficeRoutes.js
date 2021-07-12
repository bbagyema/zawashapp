const express = require('express');
const router = express.Router();
//washer routes
router.get('/washer', (req,res)=>{
    res.render('reg_washer',{title:"Register Car Washer"})
})
router.post('/washer',(req,res)=>{
	console.log(req.body)
	const washer=newWasher(req.body);
	washer.save()
		.then(()=>{
		res.send('Washer successfully registered.');})
		.catch((err)=>{
		console.log(err);
		res.send('Sorry something went wrong.');});

})
//vehicle/customer routes
router.get('/vehicle', (req,res)=>{
    res.render('reg_vehicle', {title:"Register Vehicle"})
})
//manager routes
router.get('/manager', (req,res)=>{
    res.render('add_manager', {title:"Add Manager"})
})
router.post('/manager',(req,res)=>{
	console.log(req.body)
	const manager=newManager(req.body);
	manager.save()
		.then(()=>{
		res.send('New Manager now has access to Bayoffice');})
		.catch((err)=>{
		console.log(err);
		res.send('Sorry something went wrong');});

		})
	res.send("Manager now has access to Bayoffice.")
})
//expenses/inventory routes
router.get("/expenses", (req,res)=>{
    res.render('add_expenses', {title:"Add Expenses"})
})
//payout routes
router.get('/payments',(req,res)=>{
    res.render('payments',{title:"Payments"})
})


module.exports = router;