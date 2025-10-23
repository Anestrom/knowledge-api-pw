const { pool } = require('../config');
const Chamado = require('../entities/chamado')

const createNovoChamadoDB = async ({ id_aprendiz, id_materia, localizacao, duvida_detalhes }) => {
    try {
        const query = `
            INSERT INTO chamado (id_aprendiz, id_materia, localizacao, duvida_detalhes)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id_aprendiz, id_materia, localizacao, duvida_detalhes]);
        
        const chamado = rows[0];

        return new Chamado(
            chamado.id, chamado.id_aprendiz, chamado.id_mentor, chamado.id_materia, 
            chamado.localizacao, chamado.duvida_detalhes, chamado.status, 
            chamado.data_abertura, chamado.data_fechamento
        );
        
    } catch (err) {
        throw new Error("Erro ao abrir chamado. Verifique IDs de aprendiz e matéria: " + err.message);
    }
}

const getChamadosAbertosDB = async () => {
    try {
        const query = `
            SELECT 
                c.id, c.id_aprendiz, u.nome AS nome_aprendiz, 
                c.id_materia, s.nome AS nome_materia, 
                c.localizacao, c.duvida_detalhes, c.data_abertura, c.status
            FROM 
                chamado c
            JOIN 
                usuario u ON c.id_aprendiz = u.id
            JOIN 
                materia s ON c.id_materia = s.id
            WHERE 
                c.status = 'Aberto'
            ORDER BY 
                c.data_abertura DESC;
        `;
        const { rows } = await pool.query(query);
        
        return rows.map(row => ({
            id: row.id,
            aprendiz: { id: row.id_aprendiz, nome: row.aprendiz_name },
            materia: { id: row.id_materia, nome: row.materia_name },
            localizacao: row.localizacao,
            duvida_detalhes: row.duvida_detalhes,
            data_abertura: row.data_abertura
        }));
        
    } catch (err) {
        throw new Error("Erro ao listar chamados abertos: " + err.message);
    }
}

const getChamadosDB = async () => {
    try {
        const query = `
            SELECT 
                c.id, c.id_aprendiz, u.nome AS nome_aprendiz, 
                c.id_materia, s.nome AS nome_materia, 
                c.localizacao, c.duvida_detalhes, c.data_abertura, c.status
            FROM 
                chamado c
            JOIN 
                usuario u ON c.id_aprendiz = u.id
            JOIN 
                materia s ON c.id_materia = s.id
            ORDER BY 
                c.data_abertura DESC;
        `;
        const { rows } = await pool.query(query);
        
        return rows.map(row => ({
            id: row.id,
            aprendiz: { id: row.id_aprendiz, nome: row.aprendiz_name },
            materia: { id: row.id_materia, nome: row.materia_name },
            localizacao: row.localizacao,
            duvida_detalhes: row.duvida_detalhes,
            data_abertura: row.data_abertura
        }));
        
    } catch (err) {
        throw new Error("Erro ao listar chamados abertos: " + err.message);
    }
}

// GET BY ID - Buscar detalhes de um chamado
const getChamadoPorIdDB = async (id) => {
    try {
        const query = `
            SELECT 
                c.*, 
                u_aprendiz.nome AS aaprendiz_name, 
                u_mentor.nome AS mentor_name,
                s.nome AS materia_name
            FROM 
                chamado c
            JOIN 
                usuario u_aprendiz ON c.id_aprendiz = u_aprendiz.id
            LEFT JOIN 
                usuario u_mentor ON c.id_mentor = u_mentor.id
            JOIN 
                materia s ON c.id_materia = s.id
            WHERE 
                c.id = $1;
        `;
        const { rows } = await pool.query(query, [id]);
        
        if (rows.length === 0) {
            throw new Error(`Chamado de ID ${id} não encontrado.`);
        }
        
        // Mapeia o resultado
        const chamado = rows[0];
        return {
            id: chamado.id,
            aprendiz: { id: chamado.id_aprendiz, nome: chamado.aprendiz_name },
            mentor: chamado.id_mentor ? { id: chamado.id_mentor, nome: chamado.mentor_name } : null,
            materia: { id: chamado.id_materia, nome: chamado.materia_name },
            localizacao: chamado.localizacao,
            status: chamado.status,
            data_abertura: chamado.data_abertura,
            data_fechamento: chamado.data_fechamento
        };
        
    } catch (err) {
        throw new Error(`Erro ao buscar chamado por ID: ${err.message}`);
    }
}

// PUT (UPDATE - Aceitar Chamado - Matching)
const updateAceitarChamadoDB = async (id_chamado, id_mentor) => {
    try {
        const query = `
            UPDATE chamado 
            SET id_mentor = $2, status = 'Aceito'
            WHERE id = $1 AND status = 'Aberto'
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id_chamado, id_mentor]);
        
        if (rows.length === 0) {
            throw new Error("Chamado não pode ser aceito. Verifique se ele está Aberto e se o ID existe.");
        }
        
        const updatedCall = rows[0];
        return new Chamado(
            updatedCall.id, updatedCall.id_aprendiz, updatedCall.id_mentor, updatedCall.id_materia, 
            updatedCall.localizacao, updatedCall.duvida_detalhes, updatedCall.status, 
            updatedCall.data_abertura, updatedCall.data_fechamento
        );
        
    } catch (err) {
        throw new Error(`Erro ao aceitar chamado: ${err.message}`);
    }
}

// PUT (UPDATE - Finalizar Chamado)
const updateFinalizarChamadoDB = async (id_chamado) => {
    try {
        const query = `
            UPDATE chamado 
            SET status = 'Finalizado', data_fechamento = NOW()
            WHERE id = $1 AND status = 'Aceito'
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id_chamado]);
        
        if (rows.length === 0) {
            throw new Error("Chamado não pode ser finalizado. Verifique se ele está Aceito e se o ID existe.");
        }

        const finalizedCall = rows[0];
        return new Chamado(
            finalizedCall.id, finalizedCall.id_aprendiz, finalizedCall.id_mentor, finalizedCall.id_materia, 
            finalizedCall.localizacao, finalizedCall.duvida_detalhes, finalizedCall.status, 
            finalizedCall.data_abertura, finalizedCall.data_fechamento
        );
        
    } catch (err) {
        throw new Error(`Erro ao finalizar chamado: ${err.message}`);
    }
}

const deleteChamadoDB = async (id) => {
    try {
        const rows = await pool.query('DELETE FROM chamado WHERE id = $1', [id]);
        
        if (rows.rowCount === 0) {
            throw new Error(`Chamado de ID ${id} não encontrado para exclusão.`);
        }
        
        return true;
        
    } catch (err) {
        throw new Error(`Erro ao deletar chamado: ${err.message}`);
    }
}

module.exports = {
    createNovoChamadoDB,
    getChamadosAbertosDB,
    getChamadosDB,
    getChamadoPorIdDB,
    updateAceitarChamadoDB,
    updateFinalizarChamadoDB,
    deleteChamadoDB
};