using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Relationships.PacientiXRay
{
    public class List
    {
            public class Query : IRequest<Result<List<PacientiXRayDto>>> { }

            public class Handler : IRequestHandler<Query, Result<List<PacientiXRayDto>>>
            {
                private readonly DataContext _context;
                private readonly IMapper _mapper;
                public Handler(DataContext context, IMapper mapper)
                {
                    _mapper = mapper;
                    _context = context;
                }

                public async Task<Result<List<PacientiXRayDto>>> Handle(Query request, CancellationToken cancellationToken)
                {
                    var pacientiXRay = await _context.PacientiXRays.ToListAsync();
                    var pacientiXRayToReturn = _mapper.Map<List<PacientiXRayDto>>(pacientiXRay);
                    return Result<List<PacientiXRayDto>>.Success(pacientiXRayToReturn);
                }
            }
    }
}