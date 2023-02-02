using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Nurse
{
    public class Delete
    {
        public class Command: IRequest<Result<Unit>>
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private DataContext _context;

            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var infermierja = await _context.Infermjeret.FindAsync(request.Id);

                // if(infermierja == null) return null;

                _context.Remove(infermierja);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete");

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}