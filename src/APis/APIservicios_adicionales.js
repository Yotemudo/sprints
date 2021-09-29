const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    lista: (req,res) => {

        db.Servicio_adicional
            .findAll({include:[{association:'pack'}]},{
                order: [
                    ['id','ASC']
                    
                ]
            })
            .then(servicios => {
                return res.status(200).json ({
                    data: servicios,
                    total: servicios.length,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    },

    uno: (req,res) => {
        console.log(req.params);
        db.Servicio_adicional
            .findOne({
                where:{
                    pack_id: req.params.id
                }
            })
            .then(servicios => {
                return res.json(servicios)
            })
        }
}
