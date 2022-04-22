const { routerAuth } = require('./auth.js');
const routerPersona=require ('./persona-router.js');
const routerPrenotazione=require ('./prenotazione-router.js');
const routerSede = require('./sede-router')

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/prenotazione', routerPrenotazione);
    app.use('/sede', routerSede);
}

module.exports = ConnectRouter;
