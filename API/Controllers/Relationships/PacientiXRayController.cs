using System.Threading.Tasks;
using Application.Relationships.PacientiXRay;
using Domain.Relationships;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Relationships
{
    [AllowAnonymous]
    public class PacientiXRayController : BaseApiController
    {
        [HttpGet]

        public async Task<IActionResult> getPacientiXRay()
        {
            return HandleResult(await Mediator.Send(new Application.Relationships.PacientiXRay.List.Query()));
        }
        [HttpPost]
        public async Task<ActionResult<PacientiXRay>> createConnectionSM(PacientiXRay pacientiXRay)
        {

            return HandleResult(await Mediator.Send(new Application.Relationships.PacientiXRay.Create.Command { PacientiXRay = pacientiXRay }));
        }
        [HttpGet("{PacientiId}/{XRayId}")]
        public async Task<IActionResult> getPacientiXRay(string PacientiId, int XRayId)
        {
            return HandleResult(await Mediator.Send(new Application.Relationships.PacientiXRay.Details.Query { PacientId = PacientiId, XRayId = XRayId }));
        }
        [HttpDelete("{PacientiId}/{XRayId}")]
        public async Task<ActionResult<PacientiXRayDto>> deleteConnectionSM(string PacientId, int XRayId)
        {
            return HandleResult(await Mediator.Send(new Application.Relationships.PacientiXRay.Delete.Command { PacientId = PacientId, XRayId = XRayId }));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<PacientiXRay>> editPacientiXRay(int id, PacientiXRayDto pacientiXRay)
        {

            pacientiXRay.id = id;
            return HandleResult(await Mediator.Send(new Application.Relationships.PacientiXRay.Edit.Command { pacientiXRay = pacientiXRay }));
        }
    }
}