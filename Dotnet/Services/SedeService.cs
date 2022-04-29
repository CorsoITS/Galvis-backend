using backend_in_c_.Repositories;
using backend_in_c_.Models;

namespace backend_in_c_.Service;

public class SedeService
{
    
    private SedeRepository sedeRepository = new SedeRepository();

    public IEnumerable<Sede> GetSedes()
    {
        return sedeRepository.GetSedes();
    }

    public Sede GetSede(int id)
    {
        return sedeRepository.GetSede(id);
    }

    public bool Create(Sede sede)
    {
        if (sedeRepository.GetSede(sede.id) == null)
        {   
            return sedeRepository.Create(sede);
        }
        else
        {
            return false;
        }

    }

    public bool Update(Sede sede)
    {
        return sedeRepository.Update(sede);
    }

    public bool Delete(int id)
    {
        return sedeRepository.Delete(id);
    }
}
