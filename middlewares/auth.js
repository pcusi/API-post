const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '$%&/&/""#$%%#"#"#_2K19_PASS';

exports.ensureAuth = function(req, res, next) {
    /* **** 
        EL BACKEND RESPONDERA CON UNA CABEZERA PARA EL TOKEN, O LA AUTORIZACION ABSOLUTA PARA USAR LA PLATAFORMA 
    **** */
    if (!req.headers.authorization) {
        return res.status(400).send({ message: 'No has iniciado sesion' });
    }
    /* **** Reemplazamos cadenas en el token que se generará en el acceso **** */
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, secret);

    try {

        /* **** 
            En caso de que el payload sea menor a cuando se creo una vez que inicio sesion, 
            el token expirará y tendrá que reloguear su cuenta
        **** */
        if (payload <= moment().unix()) {
            return res.status(403).send({ message: 'Este token ha expirado' });
        } 

    } catch (err) {
        return res.status(400).send({ message: 'Este token, no existe. Inicia Sesión' });

    }

    req.user = payload.sub;
    next();
}