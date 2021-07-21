const express = require ('express');
const router = express.Router();

const mainController = require ('../controllers/mainController')
//hoy  const productController = require ('../controllers/productController')
//hoy  const usersController = require ('../controllers/usersController')
const path = require ('path');
const multer = require('multer'); // Requiero el multer para poder luego subir las imagenes y tratarlas.
const {body} = require ('express-validator');

// HOY // Tratamiento de Imagenes

// const multerUsersDiskStorage = multer.diskStorage({
//     destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
//      cb(null, path.join(__dirname,'../../public/img/img_users'));    // Ruta donde almacenamos el archivo
//     },
//     filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
//      let fileName = 'img_user' + '-' + file.originalname;   // milisegundos y extensión de archivo original
//      cb(null, fileName);         
//     }
// });


// const uploadFile = multer({ storage: multerUsersDiskStorage });

// const validations = [
//     body('nombre').notEmpty().withMessage('Ingresa tu nombre'),
//     body('apellido').notEmpty() .withMessage('Ingresa tu apellido'),
//     body('usuario').notEmpty() .withMessage('Ingresa un usuario'),
//     body('email')
//         .notEmpty() .withMessage('Ingresa un email') .bail()
//         .isEmail() .withMessage('Ingresa un email válido'),
//     body('telefono').notEmpty() .withMessage('Ingresa un teléfono válido'),
//     body('domicilio').notEmpty() .withMessage('Ingresa tu domicilio'),
//     body('localidad').notEmpty() .withMessage('Ingresa tu localidad'),
//     body('fotoDePerfil') .custom((value,{req})=>{
//         let file = req.file
//         if(file == null){
//             throw new Error ('Debes subir una imagen de perfil');
//         }
//     })
// HOY ]

router.get('/', mainController.index);
router.get('/quienesSomos',mainController.quienesSomos);

//hoy  router.get('/login', usersController.login);
//hoy  router.post('/login', usersController.accesoAdmin);
// [ check('email').isEmail().withMessage('Email invalido')
//     check('contraseña').islenght({min:8}).withMessage('la contraseña debe contener 8 caractereses'),
// ], 

//Formulario de Registro
//hoy  router.get('/registro', usersController.registro);

//Procesar el Registro
//hoy  router.post('/registro', uploadFile.single('fotoDePerfil'), validations, usersController.ProcesarRegistro);


//hoy  router.get('/profileAdmin',usersController.profileAdmin);
//hoy  router.get('/profileUser',usersController.profileUser);



module.exports = router;