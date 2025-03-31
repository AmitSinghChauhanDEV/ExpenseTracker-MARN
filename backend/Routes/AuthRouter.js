const { signup, login } = require('../Controllers/AuthController');

const { signupValidaton, loginValidaton } = require('../Middlewares/AuthValidation');

const router =  require('express').Router();

// const express = require('express');
// const router = express.Router();


router.post('/login', loginValidaton, login);

router.post('/signup', signupValidaton, signup);

module.exports = router;



