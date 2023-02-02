using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.UdhezimetCourse
{
    public class Details
    {
        public class Query : IRequest<Udhezimi>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Udhezimi>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Udhezimi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Udhezimet.FindAsync(request.Id);
            }

        }

    }
}