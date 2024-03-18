const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/users');

// definir las rutas para las acciones sobre la colección users
router
    .route('/users')
    .post(ctrlUser.userCreate)     // crear un nuevo usuario
    .get(ctrlUser.userList);       // obtener todos los usuarios

router
    .route('/users/:userid')
    .get(ctrlUser.userRead)       // obtener un usuario por su userid
    .put(ctrlUser.userUpdate)     // actualizar un usuario
    .delete(ctrlUser.userDelete); // borrar un usuario

router
    .route('/search/:identificacion')
    .get(ctrlUser.userFindName); // buscar un usuario por su nombre/identificación

module.exports = router;