const { Router } = require('express');

const { rotasAuth } = require('./rotasAuth');
const { rotasUsuario } = require('./rotasUsuario');
const { rotasChamado } = require('./rotasChamado');
const { rotasMateria } = require('./rotasMateria');
const { rotasUsuarioMateria } = require('./rotasUsuarioMateria');

const rotas = new Router();

rotas.use(rotasAuth); // Rotas públicas de autenticação
rotas.use(rotasUsuario);
rotas.use(rotasChamado);
rotas.use(rotasMateria);
rotas.use(rotasUsuarioMateria);

module.exports = rotas;
