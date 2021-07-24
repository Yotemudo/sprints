
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../dataBase/usersDb.json');
const totalUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const {validationResult} = require ('express-validator')

const usersController = {

    login: (req,res) => {
       res.render ('users/login');
    },

    accesoAdmin: (req,res)=>{
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
    },

    registro: (req,res) => {
        res.render ('users/registro');
    },

    ProcesarRegistro: (req,res) => {
        const errResults = validationResult(req); //errors es un Objeto literal, que tiene una propiedad "errors" que es un array
        let old = req.body
        // if (errors.isEmpty()){
        //     let newUser = {
        //         imagen: req.file.filename,
        //         id: totalUsers[totalUsers.length-1].id + 1,
        //         nombre: req.body.nombre,
        //         apellido: req.body.apellido,
        //         usuario: req.body.usuario,
        //         contraseña: req.body.contraseña,
        //         email: req.body.email,
        //         telefono: req.body.telefono,
        //         domicilio: req.body.domicilio,
        //         localidad: req.body.localidad,
        //         userAdmin: 0
        //     }
        
        // totalUsers.push(newUser)
        // fs.writeFileSync(usersFilePath, JSON.stringify(totalUsers,null, ' '));
        // res.send ('El usuario ha sido creado');
        
        // }else{
        //     res.render('users/registro', {errors:errors.mapped(), oldData:old});  // si fuese un array, utilizo array()
        //     //  return res.send (errors) 
        // }
        /*if (errResults.errors.length>0){
            res.render('.users/registro',{
            errors: errResults.mapped(),
            oldData:old
            });
        }else{   */
        
            let userToCreate = {
            ...req.body,
            claveUsuario: bcryptjs.hashSync(req.body.claveUsuario,10),
            imagen: req.file.filename
            };
            
            User.create(userToCreate); /*ESTO ERA POR SI QUERÍAMOS USAR EL MODELS (No se puede incluir el nombre de la foto) */
            return res.send ('El usuario ha sido creado');
      //  }
    },
    profileAdmin: (req,res) => {
        res.render ('users/profileAdmin');
    },
    profileUser: (req,res) => {
        res.render ('users/profileUser');
    }
}

module.exports = usersController;