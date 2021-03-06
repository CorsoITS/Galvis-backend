
const { listPersona, getPersonaById, insertPersona, updatePersona, personaExistById, personaDeleteById, updateCampiPersona, softDelete } = require('../dao/persona.dao');
const config= require('config');
const { logger } = require('../../common/logging');

class Persona {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.cognome)                this.cognome=p.cognome;
            if (p.codice_fiscale)         this.CodFis =p.codice_fiscale;
        } 
    }    
    
    static async lista (pagenum) {
        let listaPersonaDAO=await listPersona(pagenum);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);
        //  vecchio modo (sbagliato) di limitare il numero di risultati
        //      for ( let i = 0; (i <  config.get('max-results-per-page')) && (i<listaPersonaDAO.length); i++ ) { 
        //          res.push(new Persona(listaPersonaDAO[i]));
        //    }

        listaPersonaDAO.forEach( e => {
            res.push(new Persona(e));
        });
        logger.silly("Persona Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getPersonaById(id);
        if (pf) { return new Persona(pf);}
        return null;
    }

    static async exists(id) {
        return await personaExistById(id);
    }

    static async find(id) {
        return await personaExistById(id);
    }

    static async delete(id) {
        return await personaDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    existId () {
        if (this.id == null || typeof(this.id) == 'undefined') return false;
        return true; 
    }
    setNome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.nome=x;
    }
    getNome() {
        return this.nome;
    }

    setCognome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Cognome cannot be null';
        this.cognome=x;
    }
    getCognome() {
        return this.cognome;
    }

    setCodFis(x) {
        // Qui potremmo testare che il codice Fiscale sia settato correttamente
        this.CodFis=x;

    }
    getCodFis() {
        return this.CodFis;
    }


    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della persona
            let res= await updatePersona (this.id, this.nome, this.cognome, this.CodFis);
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPersona (this.nome, this.cognome, this.CodFis);
            this.setId(res);
            if (! res) throw 'save Persona failed (insert case).'; 
        }
    }

}

module.exports = Persona;
