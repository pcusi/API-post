const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '$%&/&/""#$%%#"#"#_2K19_PASS';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().days(30, 'days').unix()
    };
    /* **** 
            Codificamos el token con nuestro payload, que almacenara los datos del usuario
            logueado, y el metodo secreto de las cuentas que accedan a la plataforma.
            
    **** */
    return jwt.encode(payload, secret);
}

