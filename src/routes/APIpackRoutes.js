const express = require('express');
const router = express.Router();


const APIpack = require('../Apis/APIpack');


router.get('/',APIpack.lista);
router.get('/:id',APIpack.uno);


module.exports = router;