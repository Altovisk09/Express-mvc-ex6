const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const usersController = {
    index:(req, res)=>{
        res.render('index');
    },
    resgister:(req, res)=>{
        res.render('register');
    },
    registerProcess: (req, res) => {
        const errors = {};
    
        try {
            if (!req.body) {
                throw new Error('Todos os campos precisam ser preenchidos.');
            }
    
            if (!req.body.name) {
                errors.nome = 'É necessário preencher o seu nome.';
            }
    
            if (!req.body.lastName) {
                errors.lastName = 'É necessário preencher o seu Sobrenome.';
            }
    
            if (!req.body.email) {
                errors.email = 'É necessário inserir o seu email.';
            } else if (Users.findUserByfield('email', req.body.email)) {
                errors.email = 'Esse email já está sendo utilizado.';
            }
    
            if (!req.body.password) {
                errors.password = 'É necessário inserir uma senha.';
            } else if (req.body.password.length < 6) {
                errors.password = 'A senha precisa possuir no mínimo 6 caracteres.';
            }
    
            // if (!req.file) {
            //     errors.avatar = 'Selecione um avatar válido.';
            // }
            if(errors){
                console.log(errors)
            }
            if (Object.keys(errors).length === 0) {
                Users.create(req);
                res.redirect('/login'); // Redireciona para a página de login após o registro bem-sucedido
            }else{
                throw new Error('Não foi possível registrar seu usuario')
            }
        } catch (error) {
            res.render('register', { errors });
        }
    },
    
    login:(req, res)=>{
        res.render('login');
    },
    loginProcess: (req, res) => {
        try {
            const userFound = Users.findUserByfield('email', req.body.email);

            if(!req.body){
                throw new Error('Todos os campos precisam ser preenchidos')
            }
            if(!req.body.email){
                throw new Error('Insira um email valido')
            }
            if(!req.body.password){
                throw new Error('Insira sua senha')
            }
            if (userFound && bcrypt.compareSync(req.body.password, userFound.password)) {
                res.redirect('/profile');
            } else {
                throw new Error('As informações inseridas são inválidas');
            }
        } catch (error) {
            res.render('login', { errors: { login: error.message } });
        }
    },
    
    profile:(req, res)=>{
        res.render('profile');
    },

}

module.exports = usersController;