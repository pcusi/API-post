const express = require('express');
const router = express.Router();
const postC = require('../controllers/post');
const auth = require('../middlewares/auth');

router.post('/new-post', auth.ensureAuth, postC.createPost);

module.exports = router;