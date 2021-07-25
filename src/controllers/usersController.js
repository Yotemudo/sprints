
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../dataBase/usersDb.json');
const totalUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const {validationResult} = require ('express-validator')

const usersController = {

    registro: (req,res) => {
        res.render ('users/registro');
    },

    procesarRegistro: (req,res) => {
        const errResults = validationResult(req); //errors es un Objeto literal, que tiene una propiedad "errors" que es un array
        const old = req.body
    
        if (!errResults.isEmpty()){     //PRIMERO DEBEMOS FIJARNOS SI HAY ERRORES, LUEGO CARGAR
            res.render('users/registro',{
            errors: errResults.mapped(),
            oldData:old
            });
        }
        else{
            const userInDB = User.findByField('email',req.body.email) //ESTO ES PARA QUE DETECTE USUARIOS CON EMAIL IDENTICOS.
            if (userInDB){     //ESTO ES PARA QUE MANDE UN ERROR QUE EL USUARIO ESTÁ REGISTRADO
                 res.render('users/registro',{
                    errors: {
                        email: {
                        msg: 'Este email ya está registrado'
                        }
                        },
                    oldData: old
                    }
                )
            }
        else{
            let userToCreate = {   //ESTO ES PARA CREAR USUARIO
                ...req.body,
                claveUsuario: bcryptjs.hashSync(req.body.claveUsuario,10),
                imagen: req.file.filename
            };
    
            User.create(userToCreate); 
            return res.redirect('login');
        }  
    }   
    },

    login: (req,res) => {
     res.render ('users/login');             
    },

    loginProcess: (req,res) => {
        let userToLogin = User.findByField('usuario', req.body.usuario);
    
        if (userToLogin){
            let isOkLaClave = bcryptjs.compareSync(req.body.claveUsuario,userToLogin.claveUsuario)

            if (isOkLaClave) {
                delete userToLogin.claveUsuario;
                req.session.userLogged = userToLogin;
                return res.redirect('profileUser');
            }

            return res.render('users/login', {
                errors: {
                    usuario: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }

        return res.render('users/login', {
            errors: {
                usuario: {
                    msg: 'No se encuentra este usuario'
                }
            }
        });
    },

    profile: (req,res) => {
        let infoUser = req.session.userLogged;
        return res.render('users/profileUser', {
            user: req.session.userLogged
        })
    },
    
    /* accesoAdmin: (req,res)=>{
        res.render('users/profileAdmin')
         // res.send(totalUsers[0].nombre);
         // logica: si el pass es correcto , 
         // validar si el usuario es admin
         // y ahi renderizas una pagina u otra y listo!

         // for (let i=0; i<totalUsers.length; i++){
         //     if(totalUsers[i].usuario== req.body.usuario){     //el mail coincide con lo que trae del formulario?
         //         if(bcrypt.compareSync(req.body.contraseña, totalUsers[i].contraseña)){   // la contraseña traida del formulario, es igual a la almacenada en el Json?
         //             let usuarioidentificado = totalUsers[i];    // si se dan estas condic., guardame el usuario a logearse.
 
         //             if (usuarioidentificado[i].profile == 'admin'){
         //                 res.render ('users/profileAdmin');
         //             }else if(usuarioidentificado[i].profile == 'user'){
         //                 res.render ('users/profileUser');
         //             }else {
         //                 res.render ('/login');
         //                 }
         //         } 
         //     }
         // }
    },*/

    profileAdmin: (req,res) => {
        res.render ('users/profileAdmin');
    },

    profileUser: (req,res) => {
        res.render ('users/profileUser');
    }
}

module.exports = usersController;