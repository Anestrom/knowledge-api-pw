const { Router } = require('express');
const { getChamadosAbertos, getChamadoPorId, createNovoChamado, updateAceitarChamado, updateFinalizarChamado, deleteChamado, getChamados } = require('../controllers/chamadoController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasChamado = new Router();

rotasChamado.route('/chamado')
    .get(authenticateToken, getChamados)
    .post(authenticateToken, createNovoChamado)

rotasChamado.route('/chamado/aberto')
    .get(authenticateToken, getChamadosAbertos)

rotasChamado.route('/chamado/aceitar/:id')
    .put(authenticateToken, updateAceitarChamado)

rotasChamado.route('/chamado/finalizar/:id')
    .put(authenticateToken, updateFinalizarChamado)

rotasChamado.route('/chamado/:id')
    .get(authenticateToken, getChamadoPorId)
    .delete(authenticateToken, authorizeAdmin, deleteChamado) // Apenas admin pode deletar

module.exports = { rotasChamado };
