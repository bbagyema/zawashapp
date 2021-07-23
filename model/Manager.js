const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const managerSchema= new mongoose.Schema({
	fname:{
		type:String,
		trim:true
	},
	lname:{
		type:String,
		trim:true
	},
	phone:{
		type:Number,
	},
	email:{
		type:String,
		trim:true
	},
	username:{
		type:String,
		trim:true
	},
	password:{
		type:String,
	},
});

managerSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Manager',managerSchema);