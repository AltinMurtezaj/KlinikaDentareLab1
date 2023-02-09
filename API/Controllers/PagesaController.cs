using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Payment;
using System.Threading;

namespace API.Controllers
{
    public class PagesaController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Pagesa>>> GetPagesa()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Pagesa>> GetPagesa(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreatePagesa(Pagesa pagesa)
        {
            return Ok(await Mediator.Send(new Create.Command {Pagesa = pagesa}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditPagesa(int id, Pagesa pagesa)
        {
            pagesa.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Pagesa = pagesa}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePagesa(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}