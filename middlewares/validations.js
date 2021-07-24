const {body} = require ('express-validator');
const validations = [
    body('nombre').notEmpty().withMessage('Ingresa tu nombre'),
    body('apellido').notEmpty() .withMessage('Ingresa tu apellido'),
    body('usuario').notEmpty() .withMessage('Ingresa un usuario'),
    body('email')
        .notEmpty() .withMessage('Ingresa un email') .bail()
        .isEmail() .withMessage('Ingresa un email válido'),
    body('telefono').notEmpty() .withMessage('Ingresa un teléfono válido'),
    body('domicilio').notEmpty() .withMessage('Ingresa tu domicilio'),
    body('localidad').notEmpty() .withMessage('Ingresa tu localidad'),
    body('fotoDePerfil').custom((value,{req})=>{
        let file = req.file
        if(file == null){
            throw new Error ('Debes subir una imagen de perfil');
        }
    })
]
module.exports = validations;