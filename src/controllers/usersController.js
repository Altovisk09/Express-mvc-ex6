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
                console.log(userValidad)
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
        try {
            const userId = req.session.userValidad.id; // Obter o ID do usuário logado
            const newData = req.body;

            const updatedUser = Users.editAccount(userId, newData);

            if (updatedUser) {
                req.session.userValidad = updatedUser; // Atualizar os dados na sessão

                res.redirect('/profile'); // Redirecionar para a página de perfil após a edição
            } else {
                return (alert('Usúario não encontrado'))
            }
        } catch (error) {
            res.render('profile', {
                errors: error.message

            });
        }
    },

    editPass: async (req, res) => {
        try {
            const userId = req.session.user.id; // Obter o ID do usuário logado
            const newPassword = req.body.newPassword;

            // Validar a nova senha, se necessário

            const updatedUser = await Users.editPassword(userId, newPassword);

            if (updatedUser) {
                res.redirect('/profile'); // Redirecionar para a página de perfil após a edição
            } else {
                throw new Error('Usuário não encontrado');
            }
        } catch (error) {
            res.render('profile', {
                errors: error.message
            });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('logMail')
        res.redirect('/')
    }

}

module.exports = usersController;