const express = require('express')
const app = express();
const path = require('path');
const morgan = require('morgan');

//configuracion del puerto localhost y vistas archivos iniciales, motor de plantilla
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//funcionamiento morgan , y conversion tipo json
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// Routes
app.use(require('./routes/index'));

// enrutamiento carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler en caso de no encontrar el recurso
app.use((req, res, next) => {
    res.status(404).send('404 Not found ');
})

module.exports = app;