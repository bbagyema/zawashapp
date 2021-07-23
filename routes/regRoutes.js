router.get('/register', (req,res)=>{
    res.render('registration', 
    	{title:"Create Bayoffice",
    	alert:req.query.alert})
})
router.post('/register',async(req,res)=>{
	const manager= new Manager(req.body);
	await Manager.register(manager, req.body.password, (err)=>{
		if(err){
			res.status(400).render('registration',
				{title:'Create Bayoffice',
				alert:'error'})
			console.log(err)
		}else{
			res.render('bayoffice')
		}
	})
})