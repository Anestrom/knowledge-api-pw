const { Router } = require('express');

const { getUsuarios, getUsuarioPorId, createNovoUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarioController')

const rotasUsuario = new Router();

rotasUsuario.route('/usuario')
   .get(getUsuarios)
   .post(createNovoUsuario)

rotasUsuario.route('/usuario/:id')
   .get(getUsuarioPorId)
   .put(updateUsuario)
   .delete(deleteUsuario)

module.exports = { rotasUsuario };