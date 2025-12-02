const { Router } = require('express');
const { getUsuarios, getUsuarioPorId, createNovoUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasUsuario = new Router();

rotasUsuario.route('/usuario')
   .get(authenticateToken, getUsuarios)
   .post(authenticateToken, createNovoUsuario)

rotasUsuario.route('/usuario/:id')
   .get(authenticateToken, getUsuarioPorId)
   .put(authenticateToken, updateUsuario)
   .delete(authenticateToken, authorizeAdmin, deleteUsuario) // Apenas admin pode deletar

module.exports = { rotasUsuario };
