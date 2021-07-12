// Dependecies
const express = require("express")
const mongoose=require('mongoose')
const homeRoutes = require('./routes/homeRoutes');
const regRoutes = require('./routes/regRoutes');
const loginRoutes = require('./routes/loginRoutes');
const bayofficeRoutes = require('./routes/bayofficeRoutes');
require('dotenv').config()
//instantiations
const app = express()
//mongodb connection
/*mongoose.connect(process.env.DATABASE, {
	useNewUrlParser:true,
	useUnifiedTopology:true
});
mongoose.connection('open',()=>{
console.log('Mongoose connection open');
})*/
.on ('error',(err)=>{
	console.log('Connection error: ${err.message');
});
//configurations
app.set('view engine', 'pug');
app.set('views', './views');

// middle ware
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
// routes
app.use('/', homeRoutes);
app.use('/register', regRoutes);
app.use('/home/login', loginRoutes);
app.use('/bayoffice', bayofficeRoutes);


// handle non existing routes
app.get('*', (req, res)=> {
    res.status(404).send('This is an invalid URL')
})

// server
app.listen(8080, ()=> console.log("Listening on Port 8080"));