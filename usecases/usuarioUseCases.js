const { pool } = require('../config');
const Usuario = require('../entities/usuario');
const bcrypt = require('bcrypt');

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT id, nome, email, curso, avaliacao_media, creditos_saber, tipo_usuario FROM usuario ORDER BY nome');

        return rows.map((user) => new Usuario(
            user.id,
            user.nome,
            user.email,
            null,
            user.curso,
            user.avaliacao_media,
            user.creditos_saber,
            null,
            user.tipo_usuario
        ));

    } catch (err) {
        throw new Error("Erro ao listar usuários: " + err.message);
    }
}

const getUsuarioPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query('SELECT id, nome, email, curso, avaliacao_media, creditos_saber, tipo_usuario FROM usuario WHERE id = $1', [id]);

        if (rows.length === 0) {
            throw new Error(`Usuário de ID ${id} não encontrado.`);
        }

        const user = rows[0];

        return new Usuario(
            user.id,
            user.nome,
            user.email,
            null,
            user.curso,
            user.avaliacao_media,
            user.creditos_saber,
            null,
            user.tipo_usuario
        );

    } catch (err) {
        throw new Error(`Erro ao buscar usuário por ID: ${err.message}`);
    }
}

const createNovoUsuarioDB = async ({ nome, email, senha, curso, tipo_usuario = 'comum' }) => {
    try {
        const senha_hash = await bcrypt.hash(senha, 10);

        const query = `
            INSERT INTO usuario (nome, email, senha_hash, curso, tipo_usuario)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nome, email, curso, avaliacao_media, creditos_saber, tipo_usuario;
        `;
        const { rows } = await pool.query(query, [nome, email, senha_hash, curso, tipo_usuario]);

        const newUser = rows[0];

        return new Usuario(
            newUser.id,
            newUser.nome,
            newUser.email,
            null,
            newUser.curso,
            newUser.avaliacao_media,
            newUser.creditos_saber,
            null,
            newUser.tipo_usuario
        );

    } catch (err) {
        throw new Error(`Erro ao criar usuário: ${err.message}`);
    }
}

const updateUsuarioDB = async ({ id, nome, curso }) => {
    try {
        const query = `
            UPDATE usuario
            SET nome = $2, curso = $3
            WHERE id = $1
            RETURNING id, nome, email, curso, avaliacao_media, creditos_saber, tipo_usuario;
        `;
        const { rows } = await pool.query(query, [id, nome, curso]);

        if (rows.length === 0) {
            throw new Error(`Usuário de ID ${id} não encontrado para atualização.`);
        }

        const updatedUser = rows[0];
        return new Usuario(
            updatedUser.id,
            updatedUser.nome,
            updatedUser.email,
            null,
            updatedUser.curso,
            updatedUser.avaliacao_media,
            updatedUser.creditos_saber,
            null,
            updatedUser.tipo_usuario
        );

    } catch (err) {
        throw new Error(`Erro ao atualizar usuário: ${err.message}`);
    }
}

const deleteUsuarioDB = async (id) => {
    try {
        const result = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            throw new Error(`Usuário de ID ${id} não encontrado para exclusão.`);
        }

        return true;

    } catch (err) {
        if (err.code === '23503') {
            throw new Error("Não é possível deletar o usuário: Há dados relacionados (chamados/matérias) que precisam ser removidos primeiro.");
        }
        throw new Error(`Erro ao deletar usuário: ${err.message}`);
    }
}

module.exports = {
    getUsuariosDB,
    getUsuarioPorIdDB,
    createNovoUsuarioDB,
    updateUsuarioDB,
    deleteUsuarioDB
};
