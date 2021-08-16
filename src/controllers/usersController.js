const db = require('../database/models');

//const User = require('../../models/User');
const bcryptjs = require('bcryptjs');

const fs = require('fs');
const path = require('path');
//const usersFilePath = path.join(__dirname, '../dataBase/usersDb.json');
//const totalUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
            db.Usuario.findOne({
                where:{
                    email: req.body.email
                }
            })
            
            .then(function(userInDB){

            // db.Usuario.findByField('email',req.body.email) //ESTO ES PARA QUE DETECTE USUARIOS CON EMAIL IDENTICOS.
            // .then(function(userInDB){

                if (userInDB){     //ESTO ES PARA QUE MANDE UN ERROR QUE EL USUARIO ESTÁ REGISTRADO
                    res.render('users/registro',{
                        errors: {
                            email: {
                            msg: 'Este email ya está registrado'
                            }
                            },
                        oldData: old
                    })
                }
                else{  //ESTO ES PARA CREAR USUARIO
                    db.Usuario.create({
                        userAdmin: 0,
                        nombre: req.body.nombre,          //nombre del campo en BD: "name" del Form
                        apellido: req.body.apellido,
                        email: req.body.email,
                        telefono: req.body.telefono,
                        domicilio: req.body.domicilio,
                        localidad: req.body.localidad,
                        usuario: req.body.usuario,
                        claveUsuario: bcryptjs.hashSync(req.body.claveUsuario,10),
                        imagen: req.body.fotoDePerfil
                    })
                }
            })
                    .then(function(create){
                    res.render('index')
                    })

                //         let userToCreate = {   //ESTO ES PARA CREAR USUARIO
                //             ...req.body,
                //             claveUsuario: bcryptjs.hashSync(req.body.claveUsuario,10),
                //             imagen: req.file.filename
                //         };
                
                //         User.create(userToCreate); 
                //         return res.redirect('login');
                //     }  
                //     }   
                // )}
        }
    },

    login: (req,res) => {
    res.render ('users/login');             
    },

    loginProcess: (req,res) => {
        db.Usuario.findOne({
            where: {
                usuario:req.body.usuario
            }
        })
        .then(function(userToLogin){
    
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
    }
    )},

    profile: (req,res) => {
        let infoUser = req.session.userLogged;
        if (infoUser && infoUser.userAdmin == 0){
            return res.render('users/profileUser', {
                user: req.session.userLogged
            })
        }else{
            return res.render ('users/profileAdmin',{
                user: req.session.userLogged
            });
        }
    },

    profileAdmin: (req,res) => {
        res.render ('users/profileAdmin');
    },

    profileUser: (req,res) => {
        res.render ('users/profileUser');
    },

    // profileEdicion: (req,res)=>{
    //     db.Usuario.findByPk(req.params.id)
    //         .then(function(usuario){
               
    //             res.render('users/registroActualizar',{usuarioEncontrado:usuario});
    //         })
    // },

    // profileActualizar: (req,res)=>{
    //     db.Usuario.update({
    //         userAdmin: 0,
    //         nombre: req.body.nombre,          //nombre del campo en BD: "name" del Form
    //         apellido: req.body.apellido,
    //         email: req.body.email,
    //         telefono: req.body.telefono,
    //         domicilio: req.body.domicilio,
    //         localidad: req.body.localidad,
    //         usuario: req.body.usuario,
    //         claveUsuario: bcryptjs.hashSync(req.body.claveUsuario,10),
    //         imagen: req.body.fotoDePerfil
    //     }, {
    //         where:{
    //             id: req.params.id
    //         }
    //         }
    //     )
    //         .then(function(update){
    //         res.render ('users/profileUser');
    //         })
    // },

    logout: (req,res) => {
        req.session.destroy();
        return res.redirect('/');
    },
    
    profileEdicion: (req,res)=>{
            
             db.Usuario.findByPk(req.params.id)
                .then(function(usuario){
                   
                   res.render('users/registroActualizar',{usuarioEncontrado:usuario})
                
               })
         },
         // Sin probar, es lo que armo Hernan  -- Verificar!!!!!!
    profileActualizar: (req,res)=>{
        db.Usuario.update({
            userAdmin: 0,
            nombre: req.body.nombre,          //nombre del campo en BD: "name" del Form
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
            localidad: req.body.localidad,
            usuario: req.body.usuario,
            claveUsuario: bcryptjs.hashSync(req.body.claveUsuario,10),
            imagen: req.body.fotoDePerfil
        }, {
            where:{
                id: req.params.id
            }
            }
        )
            .then(function(update){
            res.render ('users/profileUser');
            })
    }
}

module.exports = usersController;