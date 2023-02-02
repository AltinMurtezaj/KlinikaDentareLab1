using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.Extensions.Logging;

namespace Application.LaborPerson
{
    public class List
    {
        public class Query : IRequest<List<Laboranti>>{}

        public class Handler : IRequestHandler<Query, List<Laboranti>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                    _context = context;
            }
            public async Task<List<Laboranti>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Laborantet.ToListAsync(cancellationToken);
            }
            
        }
    }
}