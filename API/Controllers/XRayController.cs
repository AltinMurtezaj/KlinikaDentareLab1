using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.XRayCourse;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class XRayController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<XRay>>> GetXRay()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<XRay>> GetXRay(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateXRay(XRay xray)
        {
            return Ok(await Mediator.Send(new Create.Command {XRay = xray}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditXRay(int id, XRay xRay)
        {
            xRay.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{XRay = xRay}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteXRay(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}