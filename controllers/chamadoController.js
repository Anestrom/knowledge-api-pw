const { createNovoChamadoDB, getChamadosAbertosDB, getChamadoPorIdDB, updateAceitarChamadoDB, updateFinalizarChamadoDB, deleteChamadoDB, getChamadosDB } = require('../usecases/chamadoUseCases')

// Funções GET
const getChamadosAbertos = async (request, response) => {
    await getChamadosAbertosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(500).json({
            status: 'error',
            message: err.message
        }));
};

const getChamados = async (request, response) => {
    await getChamadosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(500).json({
            status: 'error',
            message: err.message
        }));
};

const getChamadoPorId = async (request, response) => {
    const id = parseInt(request.params.id);
    await getChamadoPorIdDB(id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(404).json({ 
            status: 'error',
            message: err.message
        }));
};

// Função POST
const createNovoChamado = async (request, response) => {
    await createNovoChamadoDB(request.body)
        .then(data => response.status(201).json({ 
            status: "success", 
            message: "Chamado de ajuda aberto",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

// Funções PUT
const updateAceitarChamado = async (request, response) => {
    const id_chamado = parseInt(request.params.id);
    const { id_mentor } = request.body;
    
    if (!id_mentor) {
        return response.status(400).json({ status: 'error', message: 'ID do Mentor é obrigatório.' });
    }

    await updateAceitarChamadoDB(id_chamado, id_mentor)
        .then(data => response.status(200).json({ 
            status: "success", 
            message: "Chamado aceito. Matching realizado.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

const updateFinalizarChamado = async (request, response) => {
    const id_chamado = parseInt(request.params.id);
    
    await updateFinalizarChamadoDB(id_chamado)
        .then(data => response.status(200).json({ 
            status: "success", 
            message: "Sessão de mentoria finalizada.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

// Função DELETE
const deleteChamado = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteChamadoDB(id)
        .then(() => response.status(200).json({
            status: "success", 
            message: `Chamado de ID ${id} excluído.`
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

module.exports = {
    createNovoChamado,
    getChamadosAbertos,
    getChamados,
    getChamadoPorId,
    updateAceitarChamado,
    updateFinalizarChamado,
    deleteChamado
};