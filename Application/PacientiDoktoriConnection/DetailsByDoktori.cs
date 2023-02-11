using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PacientiDoktoriConnection
{
    public class DetailsByDoktori
    {
        public class Query : IRequest<Result<PacientiDoktori>>
        {
            public string DoktoriId { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PacientiDoktori>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
                public Handler(DataContext context,IMapper mapper)
            {
                _context = context;
                _mapper=mapper;
            }

            public async Task<Result<PacientiDoktori>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacientiDoktori = await _context.PacientiDoktoret.Include(x=>x.Pacienti).FirstOrDefaultAsync(x=>x.DoktoriId == request.DoktoriId);

                var pacientiDoktoriToReturn = _mapper.Map<PacientiDoktori>(pacientiDoktori);
                return Result<PacientiDoktori>.Success(pacientiDoktoriToReturn);
            }


        }
    }
}