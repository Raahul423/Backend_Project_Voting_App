const express = require('express');
const router = express();
const bodyparser = require('body-parser');
router.use(bodyparser.json())
const Candidate = require('../Module/Candidate')
const {jwtauth} = require('../jwt');
const User = require('../Module/UserSchema');


const checkadmin = async(userId)=>{
    try {
         const user = await User.findById(userId);
    if(user.role === "admin"){
        return true
    }
    } catch (error) {
        return false
    }
   
}



router.post('/',jwtauth,async(req,res)=>{
    try {
        if(!await checkadmin(req.Userpayload.id)){
            return res.status(403).json({message:"User Have not Admin role"})
        }
        const {adhaar}=req.body
        const checkingcandidate = await Candidate.findOne({adhaar:adhaar})
        if(checkingcandidate){
            return res.status(401).json({message:"User already exist"});
        }
        const candidatedata = new Candidate(req.body)// Take Information from user 
         const response = await candidatedata.save();
        console.log("Data received Sucessfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
});


router.put('/:candidateID',jwtauth,async(req,res)=>{
    try {
         if(!await checkadmin(req.Userpayload.id)){
            return res.status(403).json({message:"User Have not Admin role"})
        }
        const candidateid = req.params.candidateID;
        const candidatedata = req.body;

        const updatecandidate = await Candidate.findByIdAndUpdate(candidateid,candidatedata,{
            new:true,
            runValidators:true
        })
        console.log("Upadate Sucessfull");
        res.status(200).json(updatecandidate);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.delete('/:candidateID',jwtauth,async(req,res)=>{
    try {
         if(!await checkadmin(req.Userpayload.id)){
            return res.status(403).json({message:"User Have not Admin role"})
        }
        const candidateid = req.params.candidateID;
        const deletecandidate = await Candidate.findByIdAndDelete(candidateid);
        console.log("Candidate sucessfully deleted");
        res.status(200).json({message:"Candidate deleted sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal"})
    }
})

module.exports = router;