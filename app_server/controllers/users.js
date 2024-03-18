// Desarrollo web 3 - Examen de medio semestre - 202320
const request = require('request'); // llamada al módulo request

// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // servidor local - desarrollo
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://dw3-202320.herokuapp.com'; // servidor remoto - producción
}


//Renderizar la vista usuarios
const renderUsuarios = (req, res, responseBody) => {
  res.render('usuarios', {title: 'Listado de usuarios', parameters: responseBody});
}

const usuarios = (req, res, next) => {
  const path = '/api/users/';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions, // opciones de request
    (err, response, body) => { // callback: error, respuesta, cuerpo

    if(err) {
      console.log('Error: ', err);
    } else if (response.statusCode === 200) {
      console.log('Cuerpo: ', body);
      renderUsuarios(req, res, body); // llamar a la función renderUsuarios
    } else {
      console.log(response.statusCode);
      console.log(response.statusMessage);
      console.log(body);
    }
  });
}

module.exports = {
  usuarios,
};