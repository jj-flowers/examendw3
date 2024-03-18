const mongoose = require('mongoose'); // incorporar mongoose al proyecto
const readline = require('readline'); // incorporar readline al proyecto

require('./esquema_users'); // incorporar el esquema de mongoose al proyecto DW3

// escuchar el evento SIGINT de windows y emitirlo a través de node
if (process.platform === 'win32') {
    console.log('Plataforma: ', process.platform);
    const rl = readline.createInterface(
        {
            input: process.stdin,
            output: process.stdout
        }
    );
    rl.on('SIGINT', () => {
        console.log('Emitiendo: SIGINT');
        process.emit('SIGINT'); // emitir el evento
    });
}

let dbURI = 'mongodb://localhost/dw3_202320_users';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI,  {
    family: 4, // el controlador MongoDB probará IPv6 primero y luego IPv4 si IPv6 falla
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log('Se presentó un error de conexión: ', err.reason));

// mensajes de eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB :', dbURI);
});

mongoose.connection.on('error', err => {
    console.log('Error de conexión a MongoDB: ', err);
});

mongoose.connection.on('disconnected',  () => {
    console.log('Desconectado de MongoDB ');
});

// // conexión a otra DB mediante conexión nombrada
// const dbURIlog = 'mongodb://localhost/dw3_202320_users_log';

// const logDB = mongoose.createConnection(dbURIlog,  {
//     family: 4, // el controlador MongoDB probará IPv6 primero y luego IPv4 si IPv6 falla
//     serverSelectionTimeoutMS: 5000
// });

// // mensajes de eventos de conexión
// logDB.on('connected', () => {
//     console.log('Conectado a MongoDB :', dbURIlog);
// });

// logDB.on('error', err => {
//     console.log('Error de conexión a MongoDB: ', err);
// });

// logDB.on('disconnected',  () => {
//     console.log('Desconectado de MongoDB ');
// });


// proceso para cerrar la conexión MongoDB (mongoose)
const procShutdown = (msg) => {
    mongoose.connection.close(
        console.log(`Mongoose se desconectó a través de: ${msg}` )
    );
}

// señales / eventos de terminación de proceso
// windows: SIGINT
// nodemon: SIGUSR2
//  heroku: SIGTERM

// llamadas a procShutdown
// windows: SIGINT
process.on('SIGINT', () => {
    procShutdown('Aplicación terminada por windows');
    process.exit(0);
});

// nodemon: SIGUSR2
process.on('SIGUSR2', () => {
    procShutdown('Aplicación reiniciada por nodemon');
    process.kill(process.pid, 'SIGUSR2');
    
});

//  heroku: SIGTERM
process.once('SIGTERM', () => {
    procShutdown('Aplicación terminada por heroku');
    process.exit(0);
});

