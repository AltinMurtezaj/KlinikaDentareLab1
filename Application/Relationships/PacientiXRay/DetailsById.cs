using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Relationships.PacientiXRay
{
    public class DetailsById
    {
        public class Query : IRequest<Result<Domain.Relationships.PacientiXRay>>
        {
            public int Id { get; set; }

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
                var pacientiXRay = await _context.PacientiXRays.FindAsync(request.Id);

                return Result<Domain.Relationships.PacientiXRay>.Success(pacientiXRay);
            }
        }
    }
}