const { Router } = require('express');

const { getMateriasPorUsuario, createMateriaParaUsuario, updateMateriaTipoUsuario, deleteMateriaDeUsuario } = require('../controllers/usuarioMateriaController');

const rotasUsuarioMateria = new Router();

rotasUsuarioMateria.route('/usuario/materia')
   .post(createMateriaParaUsuario)

rotasUsuarioMateria.route('/usuario/materia/:id')
   .get(getMateriasPorUsuario)
   .put(updateMateriaTipoUsuario)
   .delete(deleteMateriaDeUsuario)

module.exports = { rotasUsuarioMateria };