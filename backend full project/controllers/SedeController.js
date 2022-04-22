const Sede=require('../model/models/Sede');
const { logger } = require('../common/logging');

class SedeController {
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("SedeController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Sede.get(req.params.id);
                if (p ) {
                    logger.debug("SedeController checkId found",p);
                    req.Sede=p;
                    next();
                }  else {
                    logger.error("SedeController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Sede - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            logger.error ("SedeController ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return SedeController.get(req,res);
        } 
        let pagnum=1;
        logger.debug ("PAGENUM ESTERNO:" + pagnum);
        if (req.query.pag) {
            pagnum=req.query.pag;
            logger.debug ("PAGENUM INTERNO:" + pagnum);
        }
        logger.debug ("PAGENUM INTERNO2:" + pagnum);
        //
        if (!req.accepts("html") && req.accepts("xml")) {
            pagnum=-1;
        }

        let result=await Sede.lista(pagnum);
        //return res.json(result);    
        //return SedeView(res, result );
        if ( req.accepts("html") ) {
            return res.render("listsede",{lista:result});
        } else if (req.accepts("xml")) {
            res.set("Content-Type", "application/xml");
            return res.render("listsedexml",{lista:result});
        } else {
            return res.json(result);
        }
        
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Sede ) {
            result=await Sede.get(req.params.id);
        } else {
            result = req.Sede;
        }
        
        if ( req.accepts("html") ) {
            return res.render("creasede",result);
        } else {
            return res.json(result);
        }
    }

    static async crea (req,res) {
        try {
            logger.debug ("SedeController: crea: files: ",req.files);
            logger.debug ("SedeController: crea: body: ",req.body);
            let np=new Sede();
            
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.citta) np.setCitta(req.body.citta);
            if (req.body.indirizzo) np.setIndirizzo(req.body.indirizzo);
            logger.debug("Creo nuova sede:", np);
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Sede.delete(req.params.id) ) {
                    logger.debug("SedeController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    logger.error("SedeControllerErrore Cancellazione Sede", req.params.id);
                    res.status(400).send ("Errore Cancellazione Sede");
                }
        } catch (err) {
            logger.error ("SedeController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Sede ) {
                np=await Sede.get(req.params.id);
            } else {
                np = req.Sede;
            }
            logger.debug ("SedeController: edit: files: ",req.files);
            logger.debug ("SedeController: edit: body: ",req.body);
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.citta) np.setCitta(req.body.citta);
            if (req.body.indirizzo) np.setIndirizzo(req.body.indirizzo);
            logger.debug("Salvo sede:", np);
            await  np.save();
            res.status(200).send("Ok");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("SedeController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }
}

module.exports = SedeController;