const { Router } = require('express');

const { getMateriasPorUsuario, createMateriaParaUsuario, updateMateriaTipoUsuario, deleteMateriaDeUsuario } = require('../controllers/usuarioMateriaController');

const rotasUsuarioMateria = new Router();

rotasUsuarioMateria.route('/usuariomateria')
   .post(createMateriaParaUsuario)

rotasUsuarioMateria.route('/usuariomateria/:id')
   .get(getMateriasPorUsuario)
   .put(updateMateriaTipoUsuario)
   .delete(deleteMateriaDeUsuario)

module.exports = { rotasUsuarioMateria };