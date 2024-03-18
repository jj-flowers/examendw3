// Uso mongoose y el modelo compilado 
const mongoose = require('mongoose'); // incorporar mongoose al proyecto
const users = mongoose.model('user'); // importar el modelo compilado de usuarios

// controladores
// crear un nuevo usuario
const userCreate = (req, res) => {
    users
    .create({ // req.body.xxxx hace referencia al contenido que viene desde un formulario
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        materias: {
            tipo: req.body.tipo,
            nombres: req.body.nombres // ya que viene en formato arreglo desde la vista (formulario)
        },
        carrera: req.body.carrera
    })
    .then((objetoUsuario) => {
        res
            .status(201)
            .json(objetoUsuario);
    })
    .catch((err) => {
        res
            .status(400)
            .json(err);
    });
}

// obtener todos los usuarios
const userList = (req, res) => {
    users
    
    // .find({
    // 'apellido': 'Guerra'
    // }) //obtiene todos los documentos de la colección users que cumplen con el criterio del filtro
    
    .find() //obtiene todos los documentos de la colección users
    //.select('nombre apellido') //muestra solo los paths (campos) especificados
    .exec()
    .then((objetoUsuario) => {
        if (objetoUsuario.length == 0) { // valido la existencia de documentos en la colección
            console.log(`No existen documentos en la colección ${users}`);
            return res // no existen documentos en la colección users
                .status(404)
                .json({
                    "Mensaje": "Usuarios no encontrados"
                });
        } else
            res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
                .status(200)
                .json(objetoUsuario);
    })
    .catch((err) => { //find encontró un error
        res
            .status(404)
            .json(err);
        console.log(`Se encontró un error en la colección ${users}`);
    })
}

// obtener un usuario por su userid
const userRead = (req, res) => {
    users
        .findById(req.params.userid)
        .exec()
        .then((objetoUsuario)=>{ // ejecución exitosa de findById
            res
                .status(200)
                .json(objetoUsuario);
        })
        .catch((err)=>{ // ejecución exitosa de findById
            res
                .status(404)
                .json(err);

            console.log(`Error al buscar el usuario con userid: ${req.params.userid}`);
        });
}

// Buscar un usuario por su nombre/apellido/identificación
const userFindName = (req, res) => {
    const buscar = new RegExp(req.params.identificacion); //permitir buscar la ocurrencia de un valor en una cadena
    console.log('Buscar usuario con apellido: ', buscar);
    users
        // .find({'apellido': buscar}) // búsqueda por ocurrencia
        .find({'identificacion': req.params.identificacion}) // búsqueda exacta
        .exec()
        .then((objetoUsuario)=>{ // ejecución exitosa de find
            res
                .status(200)
                .json(objetoUsuario);
        })
        .catch((err)=>{ // ejecución NO exitosa de find
            res
                .status(404)
                .json(err);

            console.log(`Error al buscar el usuario con patrón: ${buscar}`);
        });
}
// actualizar un usuario
const userUpdate = (req, res) => {
    users
        .findById(req.params.userid)
        .exec()
        .then((objetoUsuario)=>{ // ejecución exitosa de findById
            objetoUsuario.nombre = req.body.nombre; //modificar el path nombre
            objetoUsuario.apellido = req.body.apellido;
            objetoUsuario.identificacion = req.body.identificacion;
            objetoUsuario.direccion = req.body.direccion;
            objetoUsuario.telefono = req.body.telefono;
            objetoUsuario.edad = req.body.edad;
            objetoUsuario.materias.tipo = req.body.tipo;
            objetoUsuario.materias.nombres = req.body.nombres;
            objetoUsuario.carrera = req.body.carrera; 

            objetoUsuario
                .save() //guardar el objeto modificado
                .then((usuario)=>{
                    res
                    .status(200)
                    .json(usuario);
                })
                .catch((err)=>{
                    res
                    .status(400)
                    .json(err);
                });
            })
        .catch((err)=>{ // ejecución exitosa de findById
            res
                .status(404)
                .json(err);

            console.log(`Error al buscar el usuario con userid: ${req.params.userid}`);
        });
}

// borrar un usuario
const userDelete = (req, res) => {
    if (req.params.userid) {
        users
            .findByIdAndDelete(req.params.userid)
            .exec()
            .then((objetoUsuario) => {
                if (!objetoUsuario) { // findByIdAndDelete no encontró un documento que cumpla con userid
                    console.log(`Usuario con el userid: ${req.params.userid} no encontrado`);
                    return res 
                        .status(404)
                        .json({"mensaje": "Usuario no encontrado"});
                } 
                res
                    .status(204)
                    .json(null);
            })
            .catch((err) => {
                res
                    .status(404)
                    .json(err);
                console.log(`Usuario con el userid: ${req.params.userid} con error`);
            })
    }
};
module.exports = {
    userCreate,      // crear un nuevo usuario
    userList,        // obtener todos los usuarios
    userRead,        // obtener un usuario por su userid
    userUpdate,      // actualizar un usuario
    userDelete,      // borrar un usuario
    userFindName     // Buscar un usuario por su nombre/apellido/identificación
}