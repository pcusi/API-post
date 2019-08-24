const mongo = require('mongoose');
const Model = mongo.Schema;

const userModel = Model({
    nickname: String,
    email: { type: String, unique: true },
    password: String,
    age: String,
    created_at: String,
    names: String,
    lastnames: String,
    rol: String,
    avatar: String
});

module.exports = mongo.model('Users', userModel);