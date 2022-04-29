using backend_in_c_.Repositories;
using backend_in_c_.Models;

namespace backend_in_c_.Service;

public class OperatoreService
{
    
    private OperatoreRepository operatoreRepository = new OperatoreRepository();

    public IEnumerable<Operatore> GetOperatores()
    {
        return operatoreRepository.GetOperatores();
    }

    public Operatore GetOperatore(int id)
    {
        return operatoreRepository.GetOperatore(id);
    }

    public bool Create(Operatore operatore)
    {
        if (operatoreRepository.GetOperatore(operatore.id) == null)
        {   
            if ((operatore.nome.Length == 0) || (operatore.cognome.Length == 0) || (operatore.username.Length == 0) || (operatore.password.Length == 0))
            {
                return false;
            }
            else
            {
                return operatoreRepository.Create(operatore);
            }
        }
        else
        {
            return false;
        }

    }

    public bool Update(Operatore operatore)
    {
        return operatoreRepository.Update(operatore);
    }

    public bool Delete(int id)
    {
        return operatoreRepository.Delete(id);
    }
}
