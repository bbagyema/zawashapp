const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const registrationSchema=new mongoose.Schema({
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
	},
	username:{
		type:String,
		trim:true,
	},
	password:{
		type:String,
		trim:true,
	},
	password_confirm:{
		type:String,
		trim:true,
	},
	origin:{
		type:String,
		trim:true,
	},
	nin:{
		type:Number,
		trim:true,
	},
	

})
registrationSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Registration',registrationSchema);
