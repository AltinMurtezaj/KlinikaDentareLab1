using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Laboratory;
using System.Threading;

namespace API.Controllers
{
    public class LaboratoriController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Laboratori>>> GetLaboratori()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Laboratori>> GetLaboratori(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateLaboratori(Laboratori laboratori)
        {
            return Ok(await Mediator.Send(new Create.Command {}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditLaboranti(int id, Laboratori laboratori)
        {
            laboratori.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Laboratori = laboratori}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLaboratori(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}