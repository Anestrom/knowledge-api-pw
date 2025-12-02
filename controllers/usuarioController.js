const { getUsuariosDB, getUsuarioPorIdDB, createNovoUsuarioDB, updateUsuarioDB, deleteUsuarioDB } = require('../usecases/usuarioUseCases');

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
    
    // Usuário só pode ver seus próprios dados
    if (request.user.id !== id && request.user.tipo_usuario !== 'admin') {
        return response.status(403).json({
            status: 'error',
            message: 'Você só pode visualizar seus próprios dados'
        });
    }

    await getUsuarioPorIdDB(id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(404).json({ 
            status: 'error',
            message: err.message
        }));
};

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

    // Usuário só pode editar seus próprios dados
    if (request.user.id !== id && request.user.tipo_usuario !== 'admin') {
        return response.status(403).json({
            status: 'error',
            message: 'Você só pode modificar seus próprios dados'
        });
    }

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
        .then(() => response.status(200).json({ 
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
