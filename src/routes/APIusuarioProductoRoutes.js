const express = require('express');
const router = express.Router();


const APIusuarioProducto = require('../Apis/APIusuario_producto');


router.get('/',APIusuarioProducto.lista);
router.get('/:id',APIusuarioProducto.uno);


module.exports = router;