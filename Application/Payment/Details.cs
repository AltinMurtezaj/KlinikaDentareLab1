using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.Payment
{
    public class Details
    {
        public class Query : IRequest<Pagesa>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Pagesa>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Pagesa> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Pagesat.FindAsync(request.Id);
            }

        }

    }
}