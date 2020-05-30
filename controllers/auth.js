var express = require('express')
var router = express.Router()

var User = require('../models/user');

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var { onlyAuthenticated } = require('../middlewares/auth');




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
        console.log(req.body);
        let userresult = await User.findOne({userID}).exec();
        const hashedPassword = userresult.password;
        const result = await bcrypt.compare(password, hashedPassword);
        if(result === true) {
            res.cookie('userID', userID);
            res.status('200').json('Authenticated');
            // res.status('200').json('Authenticated');
            console.log(userID, req.cookies);
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
        res.status(200).json('logged out')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;