const { getConnection } = require('../../common/connessione');
const { logger } = require('../../common/logging');
const Operatore = require('../models/Operatore');

async function getOperatoreByUsername(username) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM opertore WHERE username = ?', [username]);
  logger.debug('Query Result:', utenti[0]);
  return new Operatore(utenti[0]);
}

async function getOperatoreById(id) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM opertore WHERE id = ?', [id]);
  logger.debug('Query Result:', utenti[0]);
  return new Operatore(utenti[0]);
}

async function insertOperatore(ruolo, nome, cognome, username, passwordHash, sede_id) {
  const conn = await getConnection();
  const [insert] = await conn.query(
    'INSERT INTO opertore (ruolo, nome, cognome, username, password, sede_id) values (?, ?, ?, ?, ?, ?)',
    [ruolo, nome, cognome, username, passwordHash, sede_id]);
    logger.debug('Query Result:', insert.insertId);
  return insert.insertId;
}


// doesn't work
const getOperatoreSede = async (token) => {
  const conn = await getConnection();
  let query=`SELECT opertore.sede_id FROM opertore LEFT JOIN token ON opertore.id = token.opertore_id WHERE token.token = ? `;
  const [rows] = await conn.query(query, [token]);
  logger.debug('Query Result:', rows);
  console.log(rows[0]);
  return rows[0];
}

module.exports = {
  getOperatoreByUsername,
  insertOperatore,
  getOperatoreById,
  getOperatoreSede
}