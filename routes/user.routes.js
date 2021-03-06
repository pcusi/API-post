const express = require('express');
const router = express.Router();
const userC = require('../controllers/user');

router.post('/new-user', userC.createUser);
router.post('/logIn', userC.userLogIn);

module.exports = router;