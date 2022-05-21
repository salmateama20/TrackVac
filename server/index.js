const db = require('./db');
const cors = require('cors');
const path = require('path');
const express = require('express');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const homeRouter = require('./routes/home-router');
const adminRouter = require('./routes/admin-router');
const placeRouter = require('./routes/place-router');
const reviewsRouter = require('./routes/reviews-router');
const questionRouter = require('./routes/questions-router');
const { getValues } = require('./controllers/home-ctrl');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const apiPort = 3000;
baseUrl = '/trackvac-api'
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(cors());
app.use(flash());
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'Keep it secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(baseUrl, homeRouter)
    .use(baseUrl, reviewsRouter)
    .use(baseUrl, questionRouter)
    .use(baseUrl, adminRouter)
    .use(baseUrl, placeRouter)
    .get('*', (req, res) => {
        res.send('Not Found').status(404);
    });

app.listen(apiPort, () => {
    console.log(`Server running on port ${apiPort}`);
});

setInterval(getValues, 120000);