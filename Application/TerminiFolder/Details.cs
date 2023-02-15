using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.TerminiFolder
{
    public class Details
    {
        public class Query : IRequest<Termini>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Termini>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Termini> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Terminet.FindAsync(request.Id);
            }

        }

    }
}