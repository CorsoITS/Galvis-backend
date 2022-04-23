const { getConnection } = require('../../common/connessione');
const Operatore = require('../models/Operatore');

async function getOperatoreByUsername(username) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM opertore WHERE username = ?', [username]);
  return new Operatore(utenti[0]);
}

async function getOperatoreById(id) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM opertore WHERE id = ?', [id]);
  return new Operatore(utenti[0]);
}

async function insertOperatore(ruolo, nome, cognome, username, passwordHash, sede_id) {
  const conn = await getConnection();
  const [insert] = await conn.query(
    'INSERT INTO opertore (ruolo, nome, cognome, username, password, sede_id) values (?, ?, ?, ?, ?, ?)',
    [ruolo, nome, cognome, username, passwordHash, sede_id]);
  return insert.insertId;
}

module.exports = {
  getOperatoreByUsername,
  insertOperatore,
  getOperatoreById
}