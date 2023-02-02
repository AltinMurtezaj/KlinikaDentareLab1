using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.Nurse
{
    public class List
    {
        public class Query : IRequest<Result<List<Infermierja>>>{}

        public class Handler : IRequestHandler<Query,Result<List<Infermierja>>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                    _context = context;
            }

            public async Task<Result<List<Infermierja>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Infermierja>>.Success(await _context.Infermjeret.ToListAsync(cancellationToken));
            }
            
        }
    }
}