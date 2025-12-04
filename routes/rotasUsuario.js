const { Router } = require('express');
const { getUsuarios, getUsuarioPorId, createNovoUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasUsuario = new Router();

rotasUsuario.route('/usuario')
   .get(authenticateToken, authorizeAdmin, getUsuarios) // Apenas admin vê lista
   .post(authenticateToken, authorizeAdmin, createNovoUsuario) // Apenas admin cria

rotasUsuario.route('/usuario/:id')
   .get(authenticateToken, getUsuarioPorId) // Usuário vê apenas seu próprio
   .put(authenticateToken, updateUsuario) // Usuário edita apenas seu próprio
   .delete(authenticateToken, authorizeAdmin, deleteUsuario) // Apenas admin deleta

module.exports = { rotasUsuario };
