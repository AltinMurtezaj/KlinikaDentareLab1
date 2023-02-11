using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Relationships.PacientiXRay
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PacientId { get; set; }

            public int XRayId { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var pacientiXRay = await _context.PacientiXRay.FirstOrDefaultAsync(x => x.PacientiId == request.PacientId && x.XRayId == request.XRayId);


                if (pacientiXRay == null) return null;

                _context.Remove(pacientiXRay);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete connection between pacienti  and xray");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}