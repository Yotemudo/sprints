const express = require ('express');
const router = express.Router();

const path = require ('path');
const multer = require('multer'); // Requiero el multer para poder luego subir las imagenes y tratarlas.
const {body} = require ('express-validator');

// CONTROLLER
const usersController = require ('../controllers/usersController');

// MIDLEWARES
const validations = require ('../../middlewares/validations');
const multerUsersDiskStorage = require ('../../middlewares/multerUsersDiskStorage');
const guestMiddleware = require('../../middlewares/guestMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');

// Tratamiento de Imagenes


// Multer

const uploadFile = multer({ storage: multerUsersDiskStorage });

// RUTAS

// Formulario de el login
router.get('/login',guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

//Formulario de Registro
router.get('/registro',guestMiddleware, usersController.registro);

//Procesar el Registro
router.post('/registro', uploadFile.single('fotoDePerfil'), validations, usersController.ProcesarRegistro);

//Perfil de Usuario
router.get('/profileAdmin',authMiddleware,usersController.profile);
router.get('/profileUser',authMiddleware,usersController.profile);



module.exports = router;