const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const logged = require('../middlewares/logged');
const notLogged = require('../middlewares/notLogged');
const upload = require('../middlewares/multer');

router.get('/', usersController.index);

router.get('/login', logged, usersController.login);
router.post('/login', usersController.loginProcess);

router.get('/register', logged, usersController.register);
router.post('/register', upload.single('avatar'),usersController.registerProcess);

router.get('/profile', notLogged, usersController.profile);

router.get('/logout', usersController.logout);


module.exports=router; 