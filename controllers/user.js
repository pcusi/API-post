const Users = require('../models/User');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('../middlewares/jwt');

function createUser(req, res) {
    const u = new Users();
    const body = req.body;
    u.nickname = body.nickname;
    u.names = body.names;
    u.lastnames = body.lastnames;
    u.age = body.age;
    u.email = body.email;
    u.created_at = moment().unix();
    u.rol = 'Beginner';
    u.avatar = 'null';

    /* **** Condicion, en caso de que un usuario elija un nickname que ya exista en la plataforma **** */
    Users.find({
        $or: [
            { nickname: body.nickname }
        ]
    }).exec((err, result) => {
        if (err) return res.status(500).send({ message: 'Error Interno' });
        /* **** Nos botará el mensaje, de que el nick esta usado **** */
        if (result && result.length >= 1) {
            return res.status(200).send({ message: 'Nick usado' });
        } else {
            /* **** Encriptamos la contraseña del usuario que se unirá **** */
            bcrypt.hash(body.password, 10, (err, hash) => {
                u.password = hash;
                u.save((err, user) => {
                    if (err) return res.status(400).send({ message: 'Este correo electronico, ya esta siendo usado' });
                    if (!user) return res.status(404).send({ message: 'No se puede crear al usuario' });
                    return res.status(200).send({ user: user });
                });
            });
        }
    });
}

function userLogIn(req, res) {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    /* **** Buscamos el campo email para poder iniciar sesion **** */
    Users.findOne({ email: email }, (err, user) => {
        if (err) res.status(500).send({ message: 'Este correo, no existe' });
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    return res.status(200).send({
                        token: jwt.createToken(user)
                    })
                } else {
                    user.password = null;
                    return res.status(200).send({ user });
                }
            });
        } else {
            return res.status(400).send({ message: 'Este usuario no esta disponible' });
        }
    });
}

module.exports = {
    createUser,
    userLogIn
}