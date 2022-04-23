const { Router } = require('express');
const { getOperatoreById } = require('../model/dao/operatore.dao');
const routerOperatore = Router();




routerOperatore.get('/', async (req, res) => {
    const operatore = await getOperatoreById(req.opertore_id)
    return res.json(operatore.getPublicFields());
});

module.exports = routerOperatore;