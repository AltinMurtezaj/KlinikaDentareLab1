using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.LaborPerson
{
    public class Delete
    {
        public class Command: IRequest
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private DataContext _context;

            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var laboranti = await _context.Laborantet.FindAsync(request.Id);

                _context.Remove(laboranti);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}