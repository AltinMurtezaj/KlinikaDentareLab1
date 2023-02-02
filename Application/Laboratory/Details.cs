using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.Laboratory
{
    public class Details
    {
        public class Query : IRequest<Laboratori>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Laboratori>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Laboratori> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Laboratori.FindAsync(request.Id);
            }

        }

    }
}