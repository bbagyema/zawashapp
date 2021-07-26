const express = require('express');
const passport=require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: "Log In", alert:req.query.alert})
})
//checks username and password using passport.
router.post('/login', passport.authenticate('local',
	{ failureRedirect:'home/login?alert=error'}),
	 (req, res) => {
	req.session.user=req.user
    res.redirect('/');
})
router.get('/logout',(req,res)=>{
	req.session.destroy(()=>{
		res.redirect('home/login')
	})
})
module.exports = router;