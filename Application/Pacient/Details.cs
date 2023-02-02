using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;


namespace Application.Pacient
{
    public class Details
    {
        public class Query : IRequest<Pacienti>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Pacienti>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Pacienti> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Pacientet.FindAsync(request.Id);
            }

        }

    }
}