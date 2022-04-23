require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors')
const express = require('express');
const { json, urlencoded } = require('body-parser');
const ConnectRouter = require ('./routes/main-router');
const config =require ("config");
const { logger } = require('./common/logging');
const controllaAutenticazione = require('./common/check-auth');
const { getOperatoreById, getOperatoreSede } = require('./model/dao/operatore.dao');
const { routerAuth } = require('./routes/auth');

console.log("Starting Application...");

const app = express();

app.use(express.static('files'));
app.use(express.static('resources'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined', { "stream": logger.httpStream }));
app.set('view engine', 'ejs');
app.options('*', cors());

// doesn't work
app.get('/test', controllaAutenticazione, async (req, res) => {
    const opertore = await getOperatoreSede(req.sede_id);
    return res.json(opertore);
});
ConnectRouter(app);

app.listen(9000);
