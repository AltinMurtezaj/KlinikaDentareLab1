using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.KontrollaFolder
{
    public class Details
    {
        public class Query : IRequest<Kontrolla>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Kontrolla>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Kontrolla> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Kontrollat.FindAsync(request.Id);
            }

        }

    }
}