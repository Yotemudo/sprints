const express = require ('express');
const router = express.Router();

const path = require ('path');
const multer = require('multer'); // Requiero el multer para poder luego subir las imagenes y tratarlas.
const {body} = require ('express-validator');

// CONTROLLER
const usersController = require ('../controllers/usersController');

// MIDLEWARES
const validations = require ('../../middlewares/validations');
const multerUsersDiskStorage = require ('../../middlewares/multerUsersDiskStorage')
// Tratamiento de Imagenes


// Multer

const uploadFile = multer({ storage: multerUsersDiskStorage });

// RUTAS

// Formulario de el login
router.get('/login', usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// [ check('email').isEmail().withMessage('Email invalido')
//     check('contraseña').islenght({min:8}).withMessage('la contraseña debe contener 8 caractereses'),
// ], 

//Formulario de Registro
router.get('/registro', usersController.registro);

//Procesar el Registro
router.post('/registro', uploadFile.single('fotoDePerfil'), validations, usersController.ProcesarRegistro);


router.get('/profileAdmin',usersController.profileAdmin);
router.get('/profileUser',usersController.profileUser);



module.exports = router;