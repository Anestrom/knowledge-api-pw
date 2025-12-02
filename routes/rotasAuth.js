const { Router } = require('express');
const { login, register } = require('../controllers/authController');

const rotasAuth = new Router();

rotasAuth.post('/auth/login', login);
rotasAuth.post('/auth/register', register);

module.exports = { rotasAuth };
