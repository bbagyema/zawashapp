const mongoose=require('mongoose');
const expensesSchema= new mongoose.Schema({
	item:{
		type:String,
		trim:true
	},
	doe:{
		type:Date
	},
	amount:{
		type:Number,
	},
});
module.exports=mongoose.model('Expenses',expensesSchema);