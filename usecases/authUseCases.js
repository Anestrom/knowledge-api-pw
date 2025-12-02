const { pool } = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const loginDB = async (email, senha) => {
    try {
        const { rows } = await pool.query(
            'SELECT id, nome, email, senha_hash, curso, tipo_usuario FROM usuario WHERE email = $1',
            [email]
        );

        if (rows.length === 0) {
            throw new Error('Email ou senha incorretos');
        }

        const user = rows[0];
        const senhaValida = await bcrypt.compare(senha, user.senha_hash);

        if (!senhaValida) {
            throw new Error('Email ou senha incorretos');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, tipo_usuario: user.tipo_usuario },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            status: 'success',
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                curso: user.curso,
                tipo_usuario: user.tipo_usuario
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

const registerDB = async ({ nome, email, senha, curso, tipo_usuario = 'comum' }) => {
    try {
        const { rows: existingUser } = await pool.query('SELECT id FROM usuario WHERE email = $1', [email]);
        
        if (existingUser.length > 0) {
            throw new Error('Email já cadastrado');
        }

        const senha_hash = await bcrypt.hash(senha, 10);

        const query = `
            INSERT INTO usuario (nome, email, senha_hash, curso, tipo_usuario)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nome, email, curso, tipo_usuario;
        `;
        const { rows } = await pool.query(query, [nome, email, senha_hash, curso, tipo_usuario]);

        const newUser = rows[0];

        return {
            status: 'success',
            message: 'Usuário registrado com sucesso',
            user: {
                id: newUser.id,
                nome: newUser.nome,
                email: newUser.email,
                curso: newUser.curso,
                tipo_usuario: newUser.tipo_usuario
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { loginDB, registerDB };
