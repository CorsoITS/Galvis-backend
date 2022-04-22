class Operatore {
    id;
    nome;
    cognome;
    ruolo;  
    username;
    password;
    sede_id;
     constructor(rawOperatore) {
      this.id = rawOperatore.id;
      this.nome = rawOperatore.nome;
      this.cognome = rawOperatore.cognome;
      this.ruolo = rawOperatore.ruolo;
      this.username = rawOperatore.username;
      this.password = rawOperatore.password;
      this.sede_id = rawOperatore.sede_id;
    }
    getPublicFields() {
      return {
        id: this.id,
        nome: this.nome,
        cognome: this.cognome,     
        ruolo: this.ruolo,
        username: this.username,
        sede_id: this.sede_id
      }
    }
  }
  
  module.exports = Operatore;