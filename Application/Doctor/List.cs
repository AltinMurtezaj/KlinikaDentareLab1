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

namespace Application.Doctor
{
    public class List
    {
        public class Query : IRequest<List<Doktori>>{}

        public class Handler : IRequestHandler<Query, List<Doktori>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                    _context = context;
            }
            public async Task<List<Doktori>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Doktoret.ToListAsync(cancellationToken);
            }
            
        }
    }
}