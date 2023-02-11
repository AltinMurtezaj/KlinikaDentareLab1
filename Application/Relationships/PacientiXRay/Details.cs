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
    public class Details
    {
        public class Query : IRequest<Result<Domain.Relationships.PacientiXRay>>
        {
            public string PacientId { get; set; }
            public int XRayId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Domain.Relationships.PacientiXRay>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Domain.Relationships.PacientiXRay>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacientiXRay = await _context.PacientiXRay.FirstOrDefaultAsync(x => x.PacientiId == request.PacientId && x.XRayId == request.XRayId);

                return Result<Domain.Relationships.PacientiXRay>.Success(pacientiXRay);
            }


        }
    }
}