const mongo = require('mongoose');
const port = process.env.PORT || 3000;
const app = require('./middlewares/app');

mongo.Promise = global.Promise;

mongo.connect('mongodb://localhost:27017/db-posts', 
    { useNewUrlParser: true, useCreateIndex: false, useFindAndModify: false }, (err, connection) => {
        /* **** MONGODB CONEXION **** */
        if (err) throw err;
        if (connection) {
            console.log('MongoDB connected');
            /* **** ESCUCHANDO EL SERVIDOR DE EXPRESS O DE NUESTRO PROVEEDOR **** */
            app.listen(port, () => {
                console.log(`http://localhost:${port}/api/post-v1/`);
            });
        }
});
