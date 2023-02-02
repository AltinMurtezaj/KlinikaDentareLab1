using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;


namespace Application.Nurse
{
    public class Details
    {
        public class Query : IRequest<Result<Infermierja>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Infermierja>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Infermierja>> Handle(Query request, CancellationToken cancellationToken)
            {
                var infermierja = await _context.Infermjeret.FindAsync(request.Id);
                
                return Result<Infermierja>.Success(infermierja);
            }

        }

    }
}