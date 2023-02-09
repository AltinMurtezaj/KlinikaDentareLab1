using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.PacientiDoktoriConnection
{
    public class Create
    {
        
        public class Command:IRequest<Result<Unit>>
        {
            public PacientiDoktori PacientiDoktori {get;set;}
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
                var pacientiDoktori = await _context.PacientiDoktoret.FirstOrDefaultAsync(x=>x.PacientiId==request.PacientiDoktori.PacientiId && x.DoktoriId==request.PacientiDoktori.DoktoriId);

                if(pacientiDoktori == null){
                    _context.PacientiDoktoret.Add(request.PacientiDoktori);

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Faild to create the connection");

                return Result<Unit>.Success(Unit.Value);
                }
                else{
                    return Result<Unit>.Failure("Kjo lidhje ekziston");
                }
                
            }
        }
    }
}