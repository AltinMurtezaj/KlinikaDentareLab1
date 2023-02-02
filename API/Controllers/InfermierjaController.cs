using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Nurse;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class InfermierjaController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult> GetInfermierja()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]

        public async Task<IActionResult> GetInfermierja(string id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});

            return HandleResult(result);
        }

        [HttpPost]

        public async Task<IActionResult> CreateInfermierja(Infermierja infermierja)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Infermierja = infermierja}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditInfermierja(string id, Infermierja infermierja)
        {
            infermierja.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Infermierja = infermierja}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInfermierja(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}