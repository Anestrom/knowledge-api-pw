const { Router } = require('express');
const { getMaterias, createNovaMateria, updateMateria, deleteMateria, getMateriasPorId } = require('../controllers/materiaController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasMateria = new Router();

rotasMateria.route('/materia')
   .get(authenticateToken, getMaterias)
   .post(authenticateToken, createNovaMateria)

rotasMateria.route('/materia/:id')
   .get(authenticateToken, getMateriasPorId)
   .put(authenticateToken, updateMateria)
   .delete(authenticateToken, authorizeAdmin, deleteMateria) // Apenas admin pode deletar

module.exports = { rotasMateria };
