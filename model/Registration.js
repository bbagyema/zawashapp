const mongoose=require('mongoose');
const managerSchema=new mongoose.Schema({
	fname:{
		type: String,
		trim: true,
	},
	lname:{
		type: String,
		trim: true,
	},
	phone:{
		type:Number,
		trim: true,
	},
	email:{
		type:String,
		trim:true,
	}
	pass:{
		type:String,
		trim:true,
	}
	pass_confirm:{
		type:String,
		trim:true,
	}
	origin:{
		type:String,
		trim:true,
	}
	nin:{
		type:Number,
		trim:true,
	}
	

})
module.exports=mongoose.model('registration',regSchema);
