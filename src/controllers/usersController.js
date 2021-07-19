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
        let errors = validationResult(req); //errors es un Objeto literal, que tiene una propiedad "errors" que es un array
        let old = req.body
        if (errors.isEmpty()){
            return res.render('index');
        }else{
            return res.render('users/registro', {errors:errors.mapped(), oldData:old});  // si fuese un array, utilizo array()
            //  return res.send (errors) 
        }
    },
    profileAdmin: (req,res) => {
        res.render ('/profileAdmin');
    },
    profileUser: (req,res) => {
        res.render ('users/profileUser');
    }
};

module.exports = usersController; 