const City = require('../models/city');

getCities = async (req, res) => {
    try {
        return res.send(await City.find({}));
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in fetching cities',
        });
    }
}

module.exports = { getCities }