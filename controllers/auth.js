var express = require('express')
var router = express.Router()

var User = require('../models/user');

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var { onlyAuthenticated } = require('../middlewares/auth');

router.post('/created', onlyAuthenticated, async(req,res)=>{
    const userID= req.cookies.userID;
    const { code }=req.body;
    let user= await User.findOne({userID: userID}).exec();
    user.created.push(code);
    User.findOneAndUpdate({userID: userID}, user, (err,doc)=>{
        if(err){
            console.log(err);
            res.send(500).json("user db update error");
        }
        console.log("code has been added for creator user");
        res.status(200).json("creator code added");
    });
});

router.post('/voted', onlyAuthenticated, async(req,res)=>{
    const userID= req.cookies.userID;
    // console.log("req.body: ",req.body);
    const { code }=req.body;
    let user= await User.findOne({userID: userID}).exec();
    user.voted.push(code);
    console.log(`voted user ${code}:`,user);
    User.findOneAndUpdate({userID: userID}, user, (err,doc)=>{
        if(err){
            console.log(err);
            res.send(500).json("user db update error");
        }
        console.log("code has been added for user");
        res.status(200).json("code has been added");
    });
});

router.post('/checkvoted', onlyAuthenticated, async(req,res)=>{
    const userID= req.cookies.userID;
    const { code } = req.body;
    let user= await User.findOne({userID: userID}).exec();
    console.log(`check voted user ${code}:`,user)
    if(user.voted.includes(code)){
        // Already Voted
        res.status(200).json("VOTED");
    }
    else{
        // Hasnt voted
        res.status(200).json("NOT VOTED");
    }
});


router.post('/signup',async (req,res)=>{
    const { userID, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ userID, password: hashedPassword});
    try {
    await user.save();
    res.status(200).json("user created");
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/login',async(req,res)=>{
    try {
        const { userID, password } = req.body;
        // console.log(req.body);
        let userresult = await User.findOne({userID}).exec();
        const hashedPassword = userresult.password;
        const result = await bcrypt.compare(password, hashedPassword);
        if(result === true) {
            res.cookie('userID', userID);
            res.status('200').json('Authenticated');
            // console.log(userID, req.cookies);
        } else {
            res.status('401').json('Bad Authentication');
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/logout', onlyAuthenticated , async (req, res) => {
    try {
        res.clearCookie('userID');
        res.status(200).json("logged out");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;