using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Pacient;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PacientController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Pacienti>>> GetPacienti()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Pacienti>> GetPacienti(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreatePacienti(Pacienti pacienti)
        {
            return Ok(await Mediator.Send(new Create.Command {Pacienti = pacienti}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditPacienti(string id, Pacienti pacienti)
        {
            pacienti.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Pacienti = pacienti}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePacienti(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}