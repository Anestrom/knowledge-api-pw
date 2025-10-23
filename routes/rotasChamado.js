const { Router } = require('express');

const { getChamadosAbertos, getChamadoPorId, createNovoChamado, updateAceitarChamado, updateFinalizarChamado, deleteChamado, getChamados } = require('../controllers/chamadoController')

const rotasChamado = new Router();

rotasChamado.route('/chamado')
    .get(getChamados)
    .post(createNovoChamado)

rotasChamado.route('/chamado/aberto')
    .get(getChamadosAbertos)

rotasChamado.route('/chamado/aceitar/:id')
    .put(updateAceitarChamado)

rotasChamado.route('/chamado/finalizar/:id')
    .put(updateFinalizarChamado)

rotasChamado.route('/chamado/:id')
    .get(getChamadoPorId)
    .delete(deleteChamado)

module.exports = { rotasChamado };