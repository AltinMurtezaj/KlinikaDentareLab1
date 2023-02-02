using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.LaborPerson;
using System.Threading;

namespace API.Controllers
{
    public class LaborantiController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Laboranti>>> GetLaboranti()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Laboranti>> GetLaboranti(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateLaboranti(Laboranti laboranti)
        {
            return Ok(await Mediator.Send(new Create.Command {Laboranti = laboranti}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditLaboranti(string id, Laboranti laboranti)
        {
            laboranti.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Laboranti = laboranti}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLaboranti(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}