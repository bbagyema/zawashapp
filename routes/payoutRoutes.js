const express=require('express')
const mongoose=require('mongoose')
const moment=require('moment')
const Washer=require('../model/Washer')
const Vehicle=require('../model/Vehicle')
const Expenses=require('../model/Expenses')

const router=express.Router();
 router.get('/', async(req,res)=>{
 	try{
 		let selectedDate=moment().format('YYYY-MM-DD')
 		if (req.query.searchdate)
 			selectedDate=moment(req.query.searchdate).format('YYYY-MM-DD')


 		let washedVehicles=await Vehicle.aggregate(
 			[{$match: {date: new Date(selectedDate)} },
 			{ $group:{_id:'$washer',count:{$sum:1}, totalPayout:{$sum:'$washerFee'}}  },
 			{$lookup:{from:'washers', localField:'_id', foreignField:'_id', as:'details'}}
 			]);

 		//total payout for all washers according to selected date.

 		let totalPayoutDaily=await Vehicle.aggregate(
 			[{$match:{date:new Date(selectedDate)} },
 			{ $group:{_id:'$date',totalPayoutDaily:{$sum:'$washerFee'}} }
 			]);
 		res.render('payout', {washers:washedVehicles, title:'Payout',
 			defaultDate:selectedDate,sumPayout:totalPayoutDaily[0]})
 	}
 	catch(err){
 		console.log(err)
 		res.send('Failed to retrieve payout details.')
 	}
 })
module.exports=router;