const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const User = require('../models/User');

function createPost(req, res) {
    const p = new Post();
    const body = req.body;
    p.text = body.text;
    p.image = 'null';
    p.created_at = moment().unix();
    p.user = req.user;

    /* **** En caso de que no haya iniciado sesion el usuario, no dejaremos
            que cree una publicacion en la plataforma. **** */
    if (!req.user) {
        return res.status(400).send({ message: 'No has iniciado sesión' });
    }

    p.save((err, post) => {
        if (err) throw err;
        if (!post) return res.status(404).send({ message: 'No puedes crear el post' });
        return res.status(200).send({ post });
    });
}

function getUserPost(req, res){
    const id = req.params.id;
    /* **** Buscamos al usuario por su id y obtenemos sus publicaciones **** */

}

module.exports = {
    createPost
}
