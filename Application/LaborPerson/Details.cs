using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.LaborPerson
{
    public class Details
    {
        public class Query : IRequest<Laboranti>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Laboranti>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Laboranti> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Laborantet.FindAsync(request.Id);
            }

        }

    }
}