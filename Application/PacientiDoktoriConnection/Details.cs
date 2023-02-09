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
    public class Details
    {
         public class Query :IRequest<Result<PacientiDoktori>>
        {
            public string PacientiId { get; set; }
            public string DoktoriId{get;set;}
        }

        public class Handler : IRequestHandler<Query, Result<PacientiDoktori>>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context=context;
            }

            public async Task<Result<PacientiDoktori>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacientiDoktori = await _context.PacientiDoktoret.FirstOrDefaultAsync(x=>x.PacientiId==request.PacientiId && x.DoktoriId==request.DoktoriId);

                return Result<PacientiDoktori>.Success(pacientiDoktori);
            }

           
        }
    }
}