const express = require('express');
const router = express.Router();

const APIservicios_adicionales = require('../Apis/APIservicios_adicionales');

router.get('/',APIservicios_adicionales.lista);
router.get('/:id', APIservicios_adicionales.uno);

module.exports = router;