using backend_in_c_.Repositories;
using backend_in_c_.Models;

namespace backend_in_c_.Service;

public class SomministrazioneService
{
    
    private SomministrazioneRepository somministrazioneRepository = new SomministrazioneRepository();
    private OperatoreRepository operatoreRepository = new OperatoreRepository();
    private PersonaRepository personaRepository = new PersonaRepository();

    public IEnumerable<Somministrazione> GetSomministraziones()
    {
        return somministrazioneRepository.GetSomministraziones();
    }

    public Somministrazione GetSomministrazione(int id)
    {
        return somministrazioneRepository.GetSomministrazione(id);
    }

    public bool Create(Somministrazione somministrazione){
        if (somministrazioneRepository.GetSomministrazione(somministrazione.id) == null){
            if (somministrazione.vaccino.Length > 0 & somministrazione.dose.Length > 0){
                if(somministrazione.data_somministrazione <= DateTime.Now){
                    if(operatoreRepository.GetOperatoreBool(somministrazione.opertore_id) & personaRepository.GetPersonaBool(somministrazione.persona_id)){
                        return somministrazioneRepository.Create(somministrazione);
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    public bool Update(Somministrazione somministrazione)
    {
        return somministrazioneRepository.Update(somministrazione);
    }

    public bool Delete(int id)
    {
        return somministrazioneRepository.Delete(id);
    }
}
