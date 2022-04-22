
const { listSede, getSedeById, insertSede, updateSede, sedeExistById, sedeDeleteById, updateCampiSede, softDelete } = require('../dao/sede.dao');
const config= require('config');
const { logger } = require('../../common/logging');

class Sede {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.citta)                this.citta=p.citta;
            if (p.indirizzo)         this.indirizzo =p.indirizzo;
        } 
    }    
    
    static async lista (pagenum) {
        let listaSedeDAO=await listSede(pagenum);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);
        //  vecchio modo (sbagliato) di limitare il numero di risultati
        //      for ( let i = 0; (i <  config.get('max-results-per-page')) && (i<listaSedeDAO.length); i++ ) { 
        //          res.push(new Sede(listaSedeDAO[i]));
        //    }

        listaSedeDAO.forEach( e => {
            res.push(new Sede(e));
        });
        logger.silly("Sede Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getSedeById(id);
        if (pf) { return new Sede(pf);}
        return null;
    }

    static async exists(id) {
        return await sedeExistById(id);
    }

    static async find(id) {
        return await sedeExistById(id);
    }

    static async delete(id) {
        return await sedeDeleteById(id);
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

    setCitta(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Citta cannot be null';
        this.citta=x;
    }
    getCitta() {
        return this.citta;
    }

    setIndirizzo(x) {
        // Qui potremmo testare che il codice Fiscale sia settato correttamente
        this.indirizzo=x;

    }
    getIndirizzo() {
        return this.indirizzo;
    }


    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della sede
            let res= await updateSede (this.id, this.nome, this.citta, this.indirizzo);
            if (! res) throw 'save Sede failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertSede (this.nome, this.citta, this.indirizzo);
            this.setId(res);
            if (! res) throw 'save Sede failed (insert case).'; 
        }
    }

}

module.exports = Sede;
