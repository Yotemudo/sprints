const express = require('express');
const router = express.Router();


const APIusuario = require('../Apis/APIusuario');


router.get('/',APIusuario.lista);
router.get('/:id',APIusuario.uno);


module.exports = router;