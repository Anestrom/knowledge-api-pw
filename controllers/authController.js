const { loginDB, registerDB } = require('../usecases/authUseCases');

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await loginDB(email, senha);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ status: 'error', message: err.message });
    }
};

const register = async (req, res) => {
    try {
        const result = await registerDB(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

module.exports = { login, register };
