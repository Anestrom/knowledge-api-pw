const { Router } = require('express');
const { getMaterias, createNovaMateria, updateMateria, deleteMateria, getMateriasPorId } = require('../controllers/materiaController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasMateria = new Router();

rotasMateria.route('/materia')
   .get(authenticateToken, getMaterias) // Todos podem ver
   .post(authenticateToken, authorizeAdmin, createNovaMateria) // Apenas admin cria

rotasMateria.route('/materia/:id')
   .get(authenticateToken, getMateriasPorId) // Todos podem ver
   .put(authenticateToken, authorizeAdmin, updateMateria) // Apenas admin edita
   .delete(authenticateToken, authorizeAdmin, deleteMateria) // Apenas admin deleta

module.exports = { rotasMateria };
