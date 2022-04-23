const { validateToken } = require('../model/dao/token.dao');

async function controllaAutenticazione(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({
      messaggio: 'metti header per favore'
    })
  }
  const [bearer, token] = header.split(' ');
  if (bearer !== 'Bearer' || !token || token.lenth === 0) {
    return res.status(401).json({
      messaggio: 'metti header per bene per favore'
    })
  }
  const opertore_id = await validateToken(token)
  if (!opertore_id) {
    return res.status(403).json({
      messaggio: 'token non valido'
    })
  }
  req.opertore_id = opertore_id;
  next();
  // Controlliamo in qualche modo il token
}

module.exports = controllaAutenticazione