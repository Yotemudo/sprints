const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    lista: (req,res) => {

        db.Usuario
            .findAll()
            .then(usuarios => {
                return res.status(200).json ({
                    data: usuarios,
                    total: usuarios.length,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    },

    uno: (req,res) => {

        db.Usuario
            .findByPk(req.params.id)
            .then(usuario => {
                return res.status(200).json ({
                    data: usuario,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    }
}

