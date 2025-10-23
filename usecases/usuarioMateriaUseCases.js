const { pool } = require('../config');
const UsuarioMateria = require('../entities/usuarioMateria')

const createMateriaParaUsuarioDB = async ({ id_user, id_materia, user_type }) => {
    try {
        if (user_type !== 'Mentor' && user_type !== 'Aprendiz') {
            throw new Error("Tipo de usuário inválido. Deve ser 'Mentor' ou 'Aprendiz'.");
        }

        const query = `
            INSERT INTO usuario_materia (id_user, id_materia, user_type)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id_user, id_materia, user_type]);
        
        const usuarioMateria = rows[0];

        return new UsuarioMateria(usuarioMateria.id, usuarioMateria.id_user, usuarioMateria.id_materia, usuarioMateria.user_type);
        
    } catch (err) {
        if (err.code === '23505') { 
            throw new Error("Erro de duplicação: Este usuário já está cadastrado nesta matéria com este tipo (Mentor/Aprendiz).");
        }
        throw new Error("Erro ao adicionar matéria ao perfil: " + err.message);
    }
};

const getMateriasPorUsuarioDB = async (id_user) => {
    try {
        const query = `
            SELECT 
                us.id, us.id_user, us.id_materia, us.user_type, 
                s.nome AS nome_materia, u.nome AS user_name
            FROM 
                usuario_materia us
            JOIN 
                materia s ON us.id_materia = s.id
            JOIN 
                usuario u ON us.id_user = u.id
            WHERE 
                us.id_user = $1
            ORDER BY 
                s.nome;
        `;
        const { rows } = await pool.query(query, [id_user]);
        
        return rows.map(row => ({
            id: row.id,
            id_user: row.id_user,
            id_materia: row.id_materia,
            nome_materia: row.nome_materia,
            user_type: row.user_type
        }));
        
    } catch (err) {
        throw new Error("Erro ao buscar matérias do usuário: " + err.message);
    }
};

const updateMateriaTipoUsuarioDB = async ({ id, id_user, new_type }) => {
    try {
        if (new_type !== 'Mentor' && new_type !== 'Aprendiz') {
            throw new Error("Novo tipo de usuário inválido.");
        }

        const query = `
            UPDATE usuario_materia
            SET user_type = $3
            WHERE id = $1 AND id_user = $2
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id, id_user, new_type]);
        
        if (rows.length === 0) {
            throw new Error("Associação de matéria não encontrada para atualização.");
        }
        
        const usuarioMateria = rows[0];
        return new UsuarioMateria(usuarioMateria.id, usuarioMateria.id_user, usuarioMateria.id_materia, usuarioMateria.user_type);
        
    } catch (err) {
        throw new Error(`Erro ao atualizar tipo de matéria: ${err.message}`);
    }
};

const deleteMateriaDeUsuarioDB = async (id) => {
    try {
        const result = await pool.query('DELETE FROM usuario_materia WHERE id = $1', [id]);
        
        if (result.rowCount === 0) {
            throw new Error(`Associação de matéria de ID ${id} não encontrada para exclusão.`);
        }
        
        return true; 
        
    } catch (err) {
        throw new Error(`Erro ao deletar associação de matéria: ${err.message}`);
    }
}

module.exports = {
    createMateriaParaUsuarioDB,
    getMateriasPorUsuarioDB,
    updateMateriaTipoUsuarioDB,
    deleteMateriaDeUsuarioDB
};