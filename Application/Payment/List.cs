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

namespace Application.Payment
{
    public class List
    {
        public class Query : IRequest<List<Pagesa>>{}

        public class Handler : IRequestHandler<Query, List<Pagesa>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                    _context = context;
            }
            public async Task<List<Pagesa>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Pagesat.ToListAsync(cancellationToken);
            }
            
        }
    }
}