using backend_in_c_.Repositories;
using backend_in_c_.Models;

namespace backend_in_c_.Service;

public class SomministrazioneService
{
    
    private SomministrazioneRepository somministrazioneRepository = new SomministrazioneRepository();

    public IEnumerable<Somministrazione> GetSomministraziones()
    {
        return somministrazioneRepository.GetSomministraziones();
    }

    public Somministrazione GetSomministrazione(int id)
    {
        return somministrazioneRepository.GetSomministrazione(id);
    }

    public bool Create(Somministrazione somministrazione)
    {
        if (somministrazioneRepository.GetSomministrazione(somministrazione.id) == null)
        {   
            return somministrazioneRepository.Create(somministrazione);
        }
        else
        {
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
