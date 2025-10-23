const { pool } = require('../config');
const Materia = require('../entities/materia');

const getMateriasDb = async () => {
    try {
        const { rows } = await pool.query('SELECT id, nome FROM materia ORDER BY nome');

        return rows.map((materia) => new Materia(
            materia.id,
            materia.nome,
        ));

    } catch (err) {
        throw new Error("Erro ao listar usuários: " + err.message);
    }
}

const getMateriasPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query('SELECT id, nome FROM materia WHERE id = $1', [id]);

        if (rows.length === 0) {
            throw new Error(`Matéria de ID ${id} não encontrado.`);
        }

        const user = rows[0];

        return new Materia(
            user.id,
            user.nome,
        );

    } catch (err) {
        throw new Error(`Erro ao buscar matéria por ID: ${err.message}`);
    }
}

const createNovaMateriaDB = async ({ nome }) => {
    try {
        const query = `
            INSERT INTO materia (nome)
            VALUES ($1)
            RETURNING id, nome;
        `;
        const { rows } = await pool.query(query, [nome]);
        
        const newSubject = rows[0];

        return new Subject(newSubject.id, newSubject.nome);
        
    } catch (err) {
        if (err.code === '23505') { 
             throw new Error("Erro ao criar matéria: Nome de matéria já existe.");
        }
        throw new Error(`Erro ao criar matéria: ${err.message}`);
    }
}

const updateMateriaDB = async ({ id, nome }) => {
    try {
        const query = `
            UPDATE materia
            SET nome = $2
            WHERE id = $1
            RETURNING id, nome;
        `;
        const { rows } = await pool.query(query, [id, nome]);
        
        if (rows.length === 0) {
            throw new Error(`Matéria de ID ${id} não encontrada para atualização.`);
        }
        
        const updatedSubject = rows[0];
        return new Subject(updatedSubject.id, updatedSubject.nome);
        
    } catch (err) {
        if (err.code === '23505') { 
             throw new Error("Erro ao atualizar matéria: Nome de matéria já existe.");
        }
        throw new Error(`Erro ao atualizar matéria: ${err.message}`);
    }
}

const deleteMateriaDB = async (id) => {
    try {
        const result = await pool.query('DELETE FROM materia WHERE id = $1', [id]);
        
        if (result.rowCount === 0) {
            throw new Error(`Matéria de ID ${id} não encontrada para exclusão.`);
        }
        
        return true; 
        
    } catch (err) {
        if (err.code === '23503') {
            throw new Error("Não é possível deletar esta matéria: Ela está associada a perfis de usuários ou chamados abertos.");
        }
        throw new Error(`Erro ao deletar matéria: ${err.message}`);
    }
}

module.exports = {
    getMateriasDb,
    getMateriasPorIdDB,
    createNovaMateriaDB,
    updateMateriaDB,
    deleteMateriaDB
};
