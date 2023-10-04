const router=require('express').Router();
const User=require('../models/Users');
const bcrypt=require('bcrypt');


//register
router.post('/register', async (req,res)=>{

try{
    const salt=await bcrypt.genSalt(10);
    const hushedPass=await bcrypt.hash(req.body.password,salt);


    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hushedPass,
        description:req.body.description,
        city:req.body.city,
        from:req.body.from,
        relationship:req.body.relationship
    });


    const user=await newUser.save();
    res.status(200).json(user);



}catch(err){
    res.status(500).json(err);
}
})


//logIn


router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const validPass = await bcrypt.compare(req.body.password, user.password);
  
      if (!validPass) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




module.exports=router;