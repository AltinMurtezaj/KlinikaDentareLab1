using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.Extensions.Logging;
using Application.Core;
using AutoMapper;

namespace Application.Payment
{
    public class List
    {
        public class Query : IRequest<Result<List<PagesaDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<PagesaDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<PagesaDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pagesat = await _context.Pagesat
                                                        .ToListAsync();
                var pagesatList = _mapper.Map<List<PagesaDto>>(pagesat);
                return Result<List<PagesaDto>>.Success(pagesatList);
            }
        }
    }
}