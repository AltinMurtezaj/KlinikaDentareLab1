using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.TerminiFolder;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TerminiController : BaseApiController
    {
        
        
        [HttpGet]
        public async Task<ActionResult<List<Termini>>> GetTermini()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Termini>> GetTermini(int id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateTermini(Termini termini)
        {
            return Ok(await Mediator.Send(new Create.Command {Termini = termini}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditTermini(int id, Termini termini)
        {
            termini.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Termini = termini}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTermini(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}