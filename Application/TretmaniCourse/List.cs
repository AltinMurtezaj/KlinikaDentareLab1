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

namespace Application.TretmaniCourse
{
    public class List
    {
        public class Query : IRequest<List<Tretmani>>{}

        public class Handler : IRequestHandler<Query, List<Tretmani>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                    _context = context;
            }
            public async Task<List<Tretmani>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Tretmanet.ToListAsync(cancellationToken);
            }
            
        }
    }
}