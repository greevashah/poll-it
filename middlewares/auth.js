const onlyAuthenticated = (req,res,next)=>{
    if(req.cookies.userID) {
        next();
    } else {
        res.send(401).json('only authenticated users allowed');
    }
}

module.exports = { 
    onlyAuthenticated
}