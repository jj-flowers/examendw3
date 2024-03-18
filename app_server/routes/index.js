// Desarrollo web 3 - Examen de medio semestre - 202320
const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main.js');


/* GET home page. */
router.get('/', ctrlMain.index);


module.exports = router;