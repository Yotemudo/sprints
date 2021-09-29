const express = require('express');
const router = express.Router();
const ApiSeleccion = require('../Apis/ApiSeleccion');
const ApiConfirmaCompra = require('../Apis/ApiConfirmaCompra');

router.get('/', ApiSeleccion.lista);
router.get('/:id', ApiSeleccion.uno);
router.post('/compra', ApiConfirmaCompra.compra)


module.exports = router;