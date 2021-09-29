const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    lista: (req, res) => {
        db.Seleccion
            .findAll({
                limit: 1,
                order: [
                    ["id", "DESC"]
                ]
            })
            .then(seleccion => {
                return res.status(200).json({
                    total: seleccion.length,
                    data: seleccion,
                    status: 200
                })
            })
            .catch(function (e) {
                return res.send(e)
            })
    },

    uno: (req, res) => {

        db.Seleccion
            .findByPk(req.params.id)
            .then(seleccion => {
                return res.status(200).json({
                    data: seleccion,
                    status: 200
                })
            })
            .catch(function (e) {
                return res.send(e)
            })
    }
}