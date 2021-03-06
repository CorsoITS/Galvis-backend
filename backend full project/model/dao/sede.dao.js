const { getConnection } = require('../../common/connessione')
const config= require('config');
const { logger } = require('../../common/logging');

const listSede = async (pagenum) => {
  const connection = await getConnection();
  let numres=config.get('max-results-per-page');
  let query='SELECT * FROM sede';
  if ( pagenum > 0 ) {
    let start=(pagenum-1)*numres;
    query += ' LIMIT '+numres + ' OFFSET '+start;
  } 
  logger.debug('Query:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result:', rows);
  return rows;
}

const sedeExistById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'SELECT 1 FROM sede WHERE id = ?';
  const [rows] = await connection.query(query, [id_sede]);
  return rows.length > 0;
}

const getSedeById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM sede WHERE id = ?';
  const [rows] = await connection.query(query, [id_sede]);
  return rows[0];
}
// ALT + 0 0 9 6 => `
const insertSede = async (nome, citta, indirizzo) => {
  const connection = await getConnection();
  const query = `INSERT INTO sede (nome, citta, indirizzo)
  VALUES (?,?,?)`;
  const [res] = await connection.query(query, [nome, citta, indirizzo]);
  return res.insertId;
}

const updateSede = async (id, nome, citta, indirizzo) => {
  const connection = await getConnection();
  const query = `UPDATE sede SET nome = ?, citta = ?, indirizzo = ?
  WHERE id = ?`;
  const [res] = await connection.query(query, [nome, citta, indirizzo, id]);
  return res.affectedRows === 1;
}

const updateCampiSede = async (id, nome, citta, indirizzo) => {
  const connection = await getConnection();
  const campi = [];
  const params = [];
  if (nome !== undefined) {
    campi.push('nome');
    params.push(nome);
  }
  if (citta !== undefined) {
    campi.push('citta');
    params.push(citta);
  }
  if (indirizzo !== undefined) {
    campi.push('indirizzo');
    params.push(indirizzo);
  }

  // campi = ['nome', 'citta']
  // campi = ['nome = ?', 'citta = ?']

  params.push(id);
  const query = `UPDATE sede SET ${campi.map(campo => campo + ` = ?`).join(',')} WHERE id = ?`;
  const [res] = await connection.query(query, params);
  return res.affectedRows === 1;
}

const sedeDeleteById = async (id_sede) => {
  const connection = await getConnection();
  const query = 'DELETE FROM sede WHERE id = ?';
  const [res] = await connection.query(query, [id_sede]);
  return res.affectedRows === 1;
}

module.exports = {
  listSede,
  sedeExistById,
  getSedeById,
  insertSede,
  updateSede,
  updateCampiSede,
  sedeDeleteById
}