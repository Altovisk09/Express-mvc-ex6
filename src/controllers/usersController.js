const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const usersController = {
    index:(req, res)=>{
        res.render('index');
    },
    register:(req, res)=>{
        res.render('register');
    },
    registerProcess: (req, res) => {
        const errors = {};
        try {
            if (!req.body) {
                throw new Error('Todos os campos precisam ser preenchidos.');
            }

            if (!req.body.name) {
                errors.name = new Error('É necessário preencher o seu nome.');
            }
    
            if (!req.body.lastName) {
                errors.lastName = new Error('É necessário preencher o seu sobrenome.');
            }
    
            if (!req.body.email) {
                errors.email = new Error('É necessário inserir o seu email.');
            } else if (Users.findUserByfield('email', req.body.email)) {
                errors.email = new Error('Esse email já está sendo utilizado.');
            }
    
            if (!req.body.password) {
                errors.password = new Error('É necessário inserir uma senha.');
            } else if (req.body.password.length < 6) {
                errors.password = new Error('A senha deve ter pelo menos 6 caracteres.');
            }
    
            // Validar o avatar, se necessário
    
            if (Object.keys(errors).length === 0) {
                Users.create(req);
                res.redirect('/login'); // Redireciona para a página de login após o registro bem-sucedido
            }
        } catch(err) {
            console.log();
            res.render('register', {
                Error: err.message,
                oldData: req.body
            });
        }
    },    
    login:(req, res)=>{
        res.render('login');
    },
    loginProcess: (req, res) => {
        try {
            const userValidad = Users.findUserByfield('email', req.body.email);
    
            if (!req.body.email || 
                (!req.body.email.includes("@") || 
                 (!req.body.email.includes(".com") && !req.body.email.includes(".com.br")))) {
                throw new Error('Insira um email válido');
            }
            if (!req.body.password) {
                throw new Error('Insira sua senha');
            }
            if (userValidad && bcrypt.compareSync(req.body.password, userValidad.password)) {
                delete userValidad.password;
                req.session.user = userValidad;
                console.log(userValidad)
                if (req.body.remember_user) {
                    res.cookie('logMail', userValidad.email, { maxAge: 1000 * 60 * 60 });
                }
                res.redirect('/');
            } else {
                throw new Error('As informações inseridas são inválidas');
            }
        } catch (error) {
            res.render('login', {
                errors: error.message,
                oldData: req.body
            });
        }
    },
    profile:(req, res)=>{
        res.render('profile');
    },

}

module.exports = usersController;