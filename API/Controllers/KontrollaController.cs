
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.KontrollaFolder;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class KontrollaController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Kontrolla>>> GetKontrolla()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Kontrolla>> GetKontrolla(int id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateKontrolla(Kontrolla kontrolla)
        {
            return Ok(await Mediator.Send(new Create.Command {Kontrolla = kontrolla}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditKontrolla(int id, Kontrolla kontrolla)
        {
            kontrolla.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Kontrolla = kontrolla}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKontrolla(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}