
const { listPrenotazione, getPrenotazioneById, insertPrenotazione, updatePrenotazione, prenotazioneExistById, prenotazioneDeleteById, updateCampiPrenotazione, softDelete, updateFotoPrenotazione } = require('../dao/Prenotazione.dao');
const config= require('config');
const { logger } = require('../../common/logging');

class Prenotazione {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if(p.data)                    this.data  =p.data;


            if (p.sed_id)               this.sed_id    =p.sed_id;
            if (p.luogo)                  this.luogo     =p.luogo;
            if (p.citta)                 this.citta     =p.citta;
            if (p.indirizzo)             this.indirizzo     =p.indirizzo;

            if (p.somm_id)               this.somministrazione_id    =p.somministrazione_id;

            if(p.note)                   this.note                    = p.note;

            if (p.pers_id)                this.pers_id    =p.pers_id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.cognome)                this.cognome=p.cognome;
            if (p.codice_fiscale)         this.CodFis =p.codice_fiscale;

        } 
    }    
    
    static async lista (pagenum) {
        let listaPrenotazioneDAO=await listPrenotazione(pagenum);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);
        //  vecchio modo (sbagliato) di limitare il numero di risultati
        //      for ( let i = 0; (i <  config.get('max-results-per-page')) && (i<listaPrenotazioneDAO.length); i++ ) { 
        //          res.push(new Prenotazione(listaPrenotazioneDAO[i]));
        //    }

        listaPrenotazioneDAO.forEach( e => {
            res.push(new Prenotazione(e));
        });
        logger.silly("Prenotazione Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getPrenotazioneById(id);
        if (pf) { return new Prenotazione(pf);}
        return null;
    }

    static async exists(id) {
        return await prenotazioneExistById(id);
    }

    static async find(id) {
        return await prenotazioneExistById(id);
    }

    static async delete(id) {
        return await prenotazioneDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    setData(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.data=x;
    }
    getData() {
        return this.data;
    }

    setSed_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.sed_id=x;
    }
    setSed_id() {
        return this.sed_id;
    }    

    //luogo
    setLuogo(x) {
        this.luogo=x;
    }
    getLuogo() {
        return this.luogo;
    }

    setCitta(x) {
        this.Citta=x;
    }
    setCitta() {
        return this.Citta;
    }

    setIndirizzo(x) {
        this.indirizzo=x;
    }
    setCisetIndirizzotta() {
        return this.indirizzo;
    }

    setPers_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.pers_id=x;
    }
    getPers_id() {
        return this.pers_id;
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
            // id e' definito quindi dobbiamo aggiornare il recordo della prenotazione
            let res= await updatePrenotazione (this.id, this.pers_id, this.sed_id );
            if (! res) throw 'save Prenotazione failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPrenotazione ( this.pers_id, this.sed_id);
            this.setId(res);
            if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }

}

module.exports = Prenotazione;
