using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using List = Application.PacientiDoktoriConnection.List;
using Application.PacientiDoktoriConnection;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PacientiDoktoriController : BaseApiController
    { 

        [HttpGet]
        public async Task<IActionResult> getPacienti()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpPost]
        public async Task<ActionResult<PacientiDoktori>> createConnectionPL(PacientiDoktori pacientiDoktori){
            
            return HandleResult(await Mediator.Send(new Application.PacientiDoktoriConnection.Create.Command{ PacientiDoktori = pacientiDoktori}));
        }
        [HttpGet("{PacientiId}/{DoktoriId}")]
        public async Task<IActionResult> getPacientiDoktori(string PacientId,string DoktoriId){
            return HandleResult(await Mediator.Send(new Application.PacientiDoktoriConnection.Details.Query { PacientiId = PacientId,DoktoriId=DoktoriId }));
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> getPacientiDoktori(int Id){
            return HandleResult(await Mediator.Send(new Application.PacientiDoktoriConnection.DetailsById.Query { Id=Id }));
        }
       
        [HttpDelete("{PacientiId}/{DoktoriId}")]
        public async Task<ActionResult<PacientiDoktoriDTO>> deleteConnectionPL(string PacientId,string DoktoriId )
        {
            return HandleResult(await Mediator.Send(new Application.PacientiDoktoriConnection.Delete.Command { PacientiId = PacientId,DoktoriId=DoktoriId}));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<PacientiDoktori>> editPacientinint(int id, PacientiDoktoriDTO pacientiDoktori)
        {
            
            pacientiDoktori.id = id;
            return HandleResult(await Mediator.Send(new Application.PacientiDoktoriConnection.Edit.Command{pacientiDoktori = pacientiDoktori}));
        }
        [HttpGet("{DoktoriId}/doktori")]
        public async Task<IActionResult> getPacientiDoktoriByDoktoriId(string DoktoriId)
        {
            return HandleResult(await Mediator.Send(new Application.PacientiDoktoriConnection.DetailsByDoktori.Query { DoktoriId = DoktoriId }));
        }
        [HttpGet("{DoktoriId}/byDoktori")]

        public async Task<IActionResult> getPLByDoktori(string DoktoriId)
        {
            return HandleResult(await Mediator.Send(new ListByDoktori.Query {DoktoriId=DoktoriId}));
        }     
        
    }
}