const { Router } = require('express');

const { getMaterias, createNovaMateria, updateMateria, deleteMateria, getMateriasPorId } = require('../controllers/materiaController');

const rotasMateria = new Router();

rotasMateria.route('/materia')
   .get(getMaterias)
   .post(createNovaMateria)

rotasMateria.route('/materia/:id')
   .get(getMateriasPorId)
   .put(updateMateria)
   .delete(deleteMateria)

module.exports = { rotasMateria };