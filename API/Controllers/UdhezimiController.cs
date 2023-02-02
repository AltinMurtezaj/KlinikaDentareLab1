using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.UdhezimetCourse;
using System.Threading;

namespace API.Controllers
{
    public class UdhezimiController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Udhezimi>>> GetUdhezimi()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Udhezimi>> GetUdhezimi(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateUdhezimi(Udhezimi udhezimi)
        {
            return Ok(await Mediator.Send(new Create.Command {Udhezimi = udhezimi}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditUdhezimi(int id, Udhezimi udhezimi)
        {
            udhezimi.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Udhezimi = udhezimi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUdhezimi(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}