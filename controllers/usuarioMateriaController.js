const { createMateriaParaUsuarioDB, getMateriasPorUsuarioDB, updateMateriaTipoUsuarioDB, deleteMateriaDeUsuarioDB } = require('../usecases/usuarioMateriaUseCases');

// Função GET
const getMateriasPorUsuario = async (request, response) => {
    const id_user = parseInt(request.params.id);
    if (isNaN(id_user)) {
        return response.status(400).json({ status: 'error', message: "ID de usuário inválido." });
    }

    await getMateriasPorUsuarioDB(id_user)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(500).json({
            status: 'error',
            message: err.message
        }));
};

// Função POST
const createMateriaParaUsuario = async (request, response) => {
    await createMateriaParaUsuarioDB(request.body)
        .then(data => response.status(201).json({ 
            status: "success", 
            message: "Matéria adicionada ao perfil",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

// Função PUT
const updateMateriaTipoUsuario = async (request, response) => {
    const id = parseInt(request.params.id);
    const dataToUpdate = { id: id, ...request.body }; 
    
    await updateMateriaTipoUsuarioDB(dataToUpdate)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Tipo de participação alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

// Função DELETE
const deleteMateriaDeUsuario = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteMateriaDeUsuarioDB(id)
        .then(() => response.status(200).json({
            status: "success", 
            message: `Matéria removida do perfil.`
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message
        }));
};

module.exports = {
    getMateriasPorUsuario,
    createMateriaParaUsuario,
    updateMateriaTipoUsuario,
    deleteMateriaDeUsuario
};