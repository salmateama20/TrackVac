const User = require('../models/user');

validateUser = async (req, res) => {
    try {
        return res.send({
            success: true,
            message: 'Can add review',
        });
    }
    catch (e) {
        return res.status(400).send({
            valid: false,
            error: 'Error in user validation',
        });
    }
}

module.exports = { validateUser };