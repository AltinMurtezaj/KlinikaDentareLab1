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

namespace Application.TretmaniCourse
{
    public class List
    {
        public class Query : IRequest<Result<List<TretmaniDto>>>{}

        public class Handler : IRequestHandler<Query, Result <List<TretmaniDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<TretmaniDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tretmani = await _context.Tretmanet.Include(x => x.Pagesa)
                                                        .Include(x => x.Udhezimet)
                                                        .ToListAsync();
                var tretmanetList = _mapper.Map<List<TretmaniDto>>(tretmani);
                return Result<List<TretmaniDto>>.Success(tretmanetList);
            }
            
        }
    }
}