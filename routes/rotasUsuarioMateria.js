const { Router } = require('express');
const { getMateriasPorUsuario, createMateriaParaUsuario, updateMateriaTipoUsuario, deleteMateriaDeUsuario } = require('../controllers/usuarioMateriaController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasUsuarioMateria = new Router();

rotasUsuarioMateria.route('/usuariomateria')
   .post(authenticateToken, createMateriaParaUsuario)

rotasUsuarioMateria.route('/usuariomateria/:id')
   .get(authenticateToken, getMateriasPorUsuario)
   .put(authenticateToken, updateMateriaTipoUsuario)
   .delete(authenticateToken, authorizeAdmin, deleteMateriaDeUsuario) // Apenas admin pode deletar

module.exports = { rotasUsuarioMateria };
