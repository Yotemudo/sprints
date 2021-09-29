const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    lista: (req,res) => {

        db.Usuario_producto
            .findAll({include:[{association:'servicio_adicional'}]},{
                order: [
                    ['id','ASC']
                    
                ]
            })
            .then(usuario_producto => {
                return res.status(200).json ({
                    data: usuario_producto,
                    total: usuario_producto.length,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    },
    uno: (req,res) => {

        db.Usuario_producto
            .findByPk(req.params.id)
            .then(usuario_producto => {
                return res.status(200).json ({
                    data: usuario_producto,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    }

}

