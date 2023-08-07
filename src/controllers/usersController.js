const Users = require('../models/Users');


const usersController = {
    index:(req, res)=>{
        res.render('index');
    },
    resgister:(req, res)=>{
        res.render('register');
    },
    login:(req, res)=>{
        res.render('login');
    },
    profile:(req, res)=>{
        res.render('profile');
    },

}

module.exports = usersController;