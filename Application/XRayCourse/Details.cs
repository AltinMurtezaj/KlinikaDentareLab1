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
    public class Details
    {
        public class Query : IRequest<XRay>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, XRay>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<XRay> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.XRays.FindAsync(request.Id);
            }

        }

    }
}