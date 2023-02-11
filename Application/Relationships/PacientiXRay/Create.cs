using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Relationships.PacientiXRay
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Relationships.PacientiXRay PacientiXRay { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var pacientiXRay = await _context.PacientiXRay.FirstOrDefaultAsync(x => x.PacientiId == request.PacientiXRay.PacientiId && x.XRayId == request.PacientiXRay.XRayId);

                if (pacientiXRay == null)
                {
                    _context.PacientiXRay.Add(request.PacientiXRay);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Faild to create the connection");

                    return Result<Unit>.Success(Unit.Value);
                }
                else
                {
                    return Result<Unit>.Failure("Kjo lidhje ekziston");
                }

            }
        }
    }
}