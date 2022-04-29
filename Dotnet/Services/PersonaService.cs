using backend_in_c_.Repositories;
using backend_in_c_.Models;

namespace backend_in_c_.Service;

public class PersonaService
{
    
    private PersonaRepository personaRepository = new PersonaRepository();

    public IEnumerable<Persona> GetPersonas()
    {
        return personaRepository.GetPersonas();
    }

    public Persona GetPersona(int id)
    {
        return personaRepository.GetPersona(id);
    }

    public bool Create(Persona persona)
    {
        if (personaRepository.GetPersona(persona.id) == null)
        {   
            return personaRepository.Create(persona);
        }
        else
        {
            return false;
        }

    }

    public bool Update(Persona persona)
    {
        return personaRepository.Update(persona);
    }

    public bool Delete(int id)
    {
        return personaRepository.Delete(id);
    }
}
