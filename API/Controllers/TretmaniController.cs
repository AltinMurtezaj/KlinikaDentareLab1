using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.TretmaniCourse;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TretmaniController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Tretmani>>> GetTretmani()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Tretmani>> GetTretmani(int id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateTretmani(Tretmani tretmani)
        {
            return Ok(await Mediator.Send(new Create.Command {Tretmani = tretmani}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditTretmani(int id, Tretmani tretmani)
        {
            tretmani.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Tretmani = tretmani}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTretmani(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}