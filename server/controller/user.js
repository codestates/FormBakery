const User = require('../models/user/user')();

module.exports ={
    login(req,res){
        res.send('login page');
    }
}