const express = require('express');
const app = express();
const bp = require('body-parser');

/* **** MIDDLEWARES PARA LAS PETICIONES POST A NUESTRO BACKEND**** */
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

/* **** RUTAS ESPECIFICAS DE LA API PARA QUE SEAN CONSUMIDAS DESDE EL FRONT END **** */
const userR = require('../routes/user.routes');
const postR = require('../routes/post.routes');
app.use('/api/post-v1', [userR, postR]);

module.exports = app;