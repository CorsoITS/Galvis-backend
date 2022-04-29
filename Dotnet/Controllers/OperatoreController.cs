using Microsoft.AspNetCore.Mvc;
using backend_in_c_.Models;
using backend_in_c_.Service;

namespace backend_in_c_.Controllers;

[ApiController]
[Route("[controller]")]

public class OperatoreController : ControllerBase
{
    private OperatoreService operatoreService = new OperatoreService();

    [HttpGet]
    
    public IEnumerable<Operatore> GetOperatores()
    {
        return operatoreService.GetOperatores();
    }

    [HttpGet("{id}")]
    public Operatore GetOperatore(int id)
    {
        return operatoreService.GetOperatore(id);
    }

        [HttpPost]
    public IActionResult Create(Operatore operatore)
    {
        var created = operatoreService.Create(operatore);
        if (created)
        {
            return Ok();

        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Update(Operatore operatore)
    {
        var updated = operatoreService.Update(operatore);
        if (updated)
        {
            return Ok();

        }
        else
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = operatoreService.Delete(id);
        if (deleted)
        {
            return Ok();

        }
        else
        {
            return BadRequest();
        }
    }
}
