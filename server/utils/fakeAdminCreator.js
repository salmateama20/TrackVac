const db = require('../db');
const Admin = require('../models/admin');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const createAdmin = async (userName, password) => {
    const admin = new Admin({ userName, password });
    await admin.save();
    db.close();
}

createAdmin('ahmadabuzaiid', 'password123');