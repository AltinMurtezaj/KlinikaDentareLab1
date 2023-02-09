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
    public class DetailsById
    {
        public class Query : IRequest<Result<PacientiDoktoriDTO>>
        {
            public int Id { get; set; }
            
        }

        public class Handler : IRequestHandler<Query, Result<PacientiDoktoriDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PacientiDoktoriDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacientiDoktori = await _context.PacientiDoktoret.Include(x=>x.XRay).SingleOrDefaultAsync(x=>x.Id==request.Id);

                var pacientiDoktoriToReturn = _mapper.Map<PacientiDoktoriDTO>(pacientiDoktori);

                return Result<PacientiDoktoriDTO>.Success(pacientiDoktoriToReturn);
            }


        }
    }
}