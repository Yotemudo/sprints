const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    lista: (req,res) => {

        db.Pack.findAll({include:[{association:'servicio_adicional'}]},{
            order: [
                ['numeroPack','ASC']
                
            ]
        })
        .then(pack => {
            return res.status(200).json ({
                data: pack,
                total: pack.length,
                status: 200
            })
        })
        .catch(function (e){
            return res.send(e)
        })    
    },

    uno: (req,res) => {

        db.Pack
            .findByPk(req.params.id)
            .then(pack => {
                return res.status(200).json ({
                    data: pack,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    }
}
