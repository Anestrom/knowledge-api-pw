const { getUsuariosDB, getUsuarioPorIdDB, createNovoUsuarioDB, updateUsuarioDB, deleteUsuarioDB } = require('../usecases/usuarioUseCases');

// Funções GET
const getUsuarios = async (request, response) => {
    await getUsuariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message 
        }));
};

const getUsuarioPorId = async (request, response) => {
    const id = parseInt(request.params.id);
    await getUsuarioPorIdDB(id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(404).json({ 
            status: 'error',
            message: err.message
        }));
};

// Função POST
const createNovoUsuario = async (request, response) => {
    await createNovoUsuarioDB(request.body)
        .then(data => response.status(201).json({
            status: "success", 
            message: "Usuário criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

const updateUsuario = async (request, response) => {
    const id = parseInt(request.params.id);

    const dataToUpdate = { id: id, ...request.body }; 
    
    await updateUsuarioDB(dataToUpdate)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Usuário alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

const deleteUsuario = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteUsuarioDB(id)
        .then(() => response.status(204).json({ 
            status: "success", 
            message: `Usuário de ID ${id} excluído com sucesso.`
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

module.exports = {
    getUsuarios, 
    getUsuarioPorId, 
    createNovoUsuario, 
    updateUsuario, 
    deleteUsuario
};