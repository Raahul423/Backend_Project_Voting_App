const express = require('express');
const router = express();
const bodyparser = require('body-parser');
router.use(bodyparser.json())
const User = require('../Module/UserSchema')
const {jwtauth,generatetoken} = require('../jwt');


router.post('/signup',async(req,res)=>{
    try {
        const {adhaar}=req.body
        const checkinguser = await User.findOne({adhaar:adhaar})
        if(checkinguser){
            return res.status(401).json({message:"User already exist"});
        }
        const Userdata = new User(req.body)// Take Information from user 
         const response = await Userdata.save();
        const payload = {
            id:response.id
        }
        const token = generatetoken(payload);
        console.log("Data received Sucessfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
});


router.post('/login',async(req,res)=>{
    try {
        const {adhaar,password} = req.body
        const user = await User.findOne({adhaar:adhaar})
        if (!user || !(await user.compared(password))) {
        return res.status(401).json({error:"Username Or Password Invalid"});
    }
    const payload = {
            id:user.id
        }
        const token = generatetoken(payload);
    res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.get('/profile',jwtauth,async(req,res)=>{
    try {
        const Userdata = req.Userpayload;
        const id = Userdata.id;
        const user = await User.findById(id);
        res.status(200).json(user);
        console.log("User mil gya");
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal"})
    }
})

module.exports = router;