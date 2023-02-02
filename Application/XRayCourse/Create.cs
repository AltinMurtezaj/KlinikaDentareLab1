using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.XRayCourse
{
    public class Create
    {
        public class Command: IRequest
        {
            public XRay XRay { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.XRays.Add(request.XRay);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}