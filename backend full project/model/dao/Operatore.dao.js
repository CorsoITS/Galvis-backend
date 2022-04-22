const { getConnection } = require('../../common/connessione');
const Operatore = require('../models/Operatore');

async function getOperatoreByUsername(username) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM operatore WHERE username = ?', [username]);
  return new Operatore(utenti[0]);
}

async function getOperatoreById(id) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM operatore WHERE id = ?', [id]);
  return new Operatore(utenti[0]);
}

async function insertOperatore(username, passwordHash) {
  const conn = await getConnection();
  const [insert] = await conn.query(
    'INSERT INTO operatore (username, password) values (?, ?)',
    [username, passwordHash]);
  return insert.insertId;
}

module.exports = {
  getOperatoreByUsername,
  insertOperatore,
  getOperatoreById
}