const { getMateriasDb, getMateriasPorIdDB, createNovaMateriaDB, updateMateriaDB, deleteMateriaDB } = require('../usecases/materiaUseCases');

// Funções GET
const getMaterias = async (request, response) => {
    await getMateriasDb()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

const getMateriasPorId = async (request, response) => {
    const id = parseInt(request.params.id);
    await getMateriasPorIdDB(id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(404).json({
            status: 'error',
            message: err.message
        }));
};

// Função POST
const createNovaMateria = async (request, response) => {
    if (!request.body.nome) {
        return response.status(400).json({ status: 'error', message: 'O nome da matéria é obrigatório.' });
    }
    
    await createNovaMateriaDB(request.body)
        .then(data => response.status(201).json({
            status: "success", 
            message: "Matéria criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

// Função PUT
const updateMateria = async (request, response) => {
    const id = parseInt(request.params.id);
    const dataToUpdate = { id: id, ...request.body }; 
    
    await updateMateriaDB(dataToUpdate)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Matéria alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

// Função Delete
const deleteMateria = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteMateriaDB(id)
        .then(() => response.status(200).json({ 
            status: "success", 
            message: `Matéria de ID ${id} excluída com sucesso.`
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

module.exports = {
    getMaterias, 
    getMateriasPorId, 
    createNovaMateria, 
    updateMateria, 
    deleteMateria
};