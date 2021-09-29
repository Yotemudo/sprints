const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
 
    compra:   (req, res) => {
       db.Usuario_producto
            .findAll({
                limit: 1,
                order: [
                    ["id", "DESC"]
                ]
            })
            .then(function(info){
                    return res.send(info);            
            })
        
    }

}   


