const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: 'Token inválido ou expirado' });
        }
        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.tipo_usuario !== 'admin') {
        return res.status(403).json({ status: 'error', message: 'Acesso negado. Apenas administradores.' });
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin, JWT_SECRET };
