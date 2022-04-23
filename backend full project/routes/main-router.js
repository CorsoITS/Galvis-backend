const controllaAutenticazione = require('../common/check-auth.js');
const { routerAuth } = require('./auth.js');
const routerOperatore = require('./operatore-router.js');
const routerPersona=require ('./persona-router.js');
const routerPrenotazione=require ('./prenotazione-router.js');
const routerSede = require('./sede-router')

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/prenotazione',controllaAutenticazione, routerPrenotazione);
    app.use('/sede',controllaAutenticazione, routerSede);
    app.use('/operatore',controllaAutenticazione, routerOperatore);
    app.use('/', routerAuth);
}

module.exports = ConnectRouter;
