// Dependecies
const express = require("express")
const passport=require('passport')
const mongoose=require('mongoose')
const moment=require('moment')
const path=require('path')
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/loginRoutes');
const regRoutes=require('./routes/regRoutes')
const bayofficeRoutes = require('./routes/bayofficeRoutes');
const payoutRoutes=require('./routes/payoutRoutes')
const Manager=require('./model/Manager')

const expressSession =require('express-session')({
secret:'secret',
resave: false,
saveUninitialized:false	
});
require('dotenv').config();
//instantiations
const app = express()
//mongodb connection
mongoose.connect(process.env.DATABASE,{
	useNewUrlParser:true,
	useUnifiedTopology:true
});
mongoose.connection.on('open',()=>{
console.log('Mongoose connection open');
})
.on ('error',(err)=>{
	console.log('Connection error: ${err.message');
});
//configurations
app.locals.moment=moment
app.set('view engine', 'pug');
app.set('views', './views');

// middle ware
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(passport.initialize());
app.use(expressSession);
app.use(passport.session());

passport.use(Manager.createStrategy());
passport.serializeUser(Manager.serializeUser());
passport.deserializeUser(Manager.deserializeUser());

 /*var loginChecker=function(req,res,next){
if(req.path != '/home/login'&&
   req.path !='/'&& 
   req.path !='/register'&&
   !req.session.user){
		res.redirect('/home/login')
	}
	next()
}
app.use(loginChecker)*/
// routes
app.use('/', homeRoutes);
app.use('/register', regRoutes);
app.use('/home', loginRoutes);
app.use('/bayoffice', bayofficeRoutes);
app.use('/payout', payoutRoutes);


// handle non existing routes
app.get('*', (req, res)=> {
    res.status(404).send('This is an invalid URL')
})

// server
app.listen(8080, ()=> console.log("Listening on Port 8080")); 