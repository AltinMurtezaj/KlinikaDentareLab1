using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.TretmaniCourse
{
    public class Details
    {
        public class Query : IRequest<Tretmani>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Tretmani>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Tretmani> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Tretmanet.FindAsync(request.Id);
            }

        }

    }
}