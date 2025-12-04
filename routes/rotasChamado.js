const { Router } = require('express');
const { getChamadosAbertos, getChamadoPorId, createNovoChamado, updateAceitarChamado, updateFinalizarChamado, deleteChamado, getChamados, getMeusChamados } = require('../controllers/chamadoController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const rotasChamado = new Router();

rotasChamado.route('/chamado')
    .get(authenticateToken, authorizeAdmin, getChamados) // Apenas admin vê histórico completo
    .post(authenticateToken, createNovoChamado)

rotasChamado.route('/chamado/aberto')
    .get(authenticateToken, getChamadosAbertos) // Todos veem chamados abertos

rotasChamado.route('/chamado/meus')
    .get(authenticateToken, getMeusChamados) // Usuário vê seus próprios chamados

rotasChamado.route('/chamado/aceitar/:id')
    .put(authenticateToken, updateAceitarChamado)

rotasChamado.route('/chamado/finalizar/:id')
    .put(authenticateToken, updateFinalizarChamado)

rotasChamado.route('/chamado/:id')
    .get(authenticateToken, getChamadoPorId)
    .delete(authenticateToken, authorizeAdmin, deleteChamado) // Apenas admin deleta

module.exports = { rotasChamado };
