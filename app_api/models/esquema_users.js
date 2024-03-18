const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
   nombre: {
       type: String,
       required: true
   },
   apellido: {
       type: String,
       required: true
   },
   identificacion: {
       type: Number,
       required: true
   },
   direccion: {
       type: String
   },
   telefono: {
       type: Number,
       'default': 9999999999
   },
   edad: {
       type: Number,
       min: 1,
       max: 99,
       'default': 15
   },
   materias: {
       tipo: {
           type: String,
           enum: ['Presencial', 'Virtual']
       },
       nombres: [String]
   },
   carrera: {
       type: String
   },
   creado: {
       type: Date,
       'default': Date.now
   }
});

const Usuario = new mongoose.model('user', usersSchema);

const user = new Usuario({
    nombre: 'Juan',
    apellido: 'Luna',
    identificacion: 678901234,
    direccion: 'Loja',
    telefono: 9992221110,
    edad: 27,
    materias: {
        tipo: 'Presencial',
        nombres: ['Desarrollo Web 2', 'Tecnologías Emergentes', 'Diseño Web']
    },
    carrera: 'Diseño en Medios Interactivos - mención de la Interfaz',
    // creado: '2024/02/14'
})

// user.save();