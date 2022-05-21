const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });

// 'mongodb://127.0.0.1:27017/trackvac'
const dbUrl = 'mongodb+srv://ahmadabuzaiid:atlasdatapassword@trackvac.zczmv.mongodb.net/trackvac?retryWrites=true&w=majority';

const db = mongoose.connection;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

module.exports = db;