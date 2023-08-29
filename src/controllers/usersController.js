const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const usersController = {
    index: (req, res) => {
        res.render('index');
    },
    register: (req, res) => {
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

            if (!req.file) {
                errors.avatar = new Error('Selecione uma imagem para realizar o cadastro.')
            }

            if (Object.keys(errors).length === 0) {
                Users.create(req);
                res.redirect('/login'); // Redireciona para a página de login após o registro bem-sucedido
            } else {
                res.render('register', {
                    errors: errors, // Passe os erros para a página
                    oldData: req.body,
                    oldFile: req.file
                });
            }
        } catch (error) {
            console.log(error);
            res.render('register', {
                Errors: error.message,
                oldData: req.body
            });
        }
    },
    login: (req, res) => {
        res.render('login');
    },
    loginProcess: (req, res) => {
        const errors = {}
        try {
            const userValidad = Users.findUserByfield('email', req.body.email);

            if (!req.body.email ||
                (!req.body.email.includes("@") ||
                    (!req.body.email.includes(".com") && !req.body.email.includes(".com.br")))) {
                errors.email = new Error('Insira um email válido');
            }
            if (!req.body.password) {
                errors.password = new Error('Insira sua senha');
            }
            if (userValidad && bcrypt.compareSync(req.body.password, userValidad.password)) {
                delete userValidad.password;
                req.session.user = userValidad;
                if (req.body.remember_user) {
                    res.cookie('logMail', userValidad.email, { maxAge: 1000 * 60 * 60 });
                }
                res.redirect('/');
            } else {
                errors.geral = new Error('Email ou senha incorretos.')
                res.render('login', {
                    errors: errors,
                    oldData: req.body
                });
            }

        } catch (errors) {
            res.render('login', {
                errors: errors,
                oldData: req.body
            });
        }
    },
    profile: (req, res) => {
        res.render('profile');
    },
    editInfo: (req, res) => {
        const errors = {};
        try {
            const userId = req.session.user.id;
            const newData = req.body;

            Users.editAccount(userId, newData);
            res.redirect('/profile')
        } catch {
            console.log('tedas')
        }


    },

    editPass: (req, res) => {
        const errors = {};
        const userId = req.session.user.id;
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const confirmNewPass = req.body.confirmNewPassword;

        try {
            if (currentPassword || newPassword || confirmNewPass) {
                if (!currentPassword) {
                    errors.currentPassword = new Error('Insira sua senha atual.')

                } 
                if (!newPassword) {
                    errors.newPassword = new Error('Insira a sua nova senha.')
                }else if(newPassword.length <= 6){
                    throw new Error('A senha precisa possuir no minímo 6 digítos')
                }
                if (!confirmNewPass) {
                    errors.confirmNewPass = new Error('É necessário confirmar sua nova senha.')
                }else if(newPassword !== confirmNewPass){
                    throw new Error('Confirmação de senha incorreta.')
                }
                if (Object.keys(errors).length === 0) {
                    const att = Users.editPassword(userId, currentPassword, newPassword);
                    if (att) {
                        res.redirect('/profile');
                    } 
                }else {
                    res.render('profile',{errors: errors});
                }
            } else {
                throw new Error('É necessário preencher todo o formulário.')
            }

        } catch (err) {
            res.render('profile', {
                error: err.message,
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('logMail')
        res.redirect('/')
    }

}

module.exports = usersController;