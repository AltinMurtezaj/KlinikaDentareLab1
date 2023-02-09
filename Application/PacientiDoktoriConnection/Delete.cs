using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PacientiDoktoriConnection
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PacientiId { get; set; }

            public string DoktoriId{get;set;}
            
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
                var pacientiDoktori = await _context.PacientiDoktoret.FirstOrDefaultAsync(x=>x.PacientiId==request.PacientiId && x.DoktoriId==request.DoktoriId);
                
                
                if (pacientiDoktori == null) return null;
        
               _context.Remove(pacientiDoktori);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete connection between pacienti and doktori");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}