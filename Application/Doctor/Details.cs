using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.Doctor
{
    public class Details
    {
        public class Query : IRequest<Doktori>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Doktori>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Doktori> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Doktoret.FindAsync(request.Id);
            }

        }

    }
}