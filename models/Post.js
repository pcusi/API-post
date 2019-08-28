const mongo = require('mongoose');
const Model = mongo.Schema;

const postModel = Model({
    text: String,
    image: String,
    created_at: String,
    user: { type: Model.ObjectId, ref: 'Users' }
})

module.exports = mongo.model('Posts', postModel);