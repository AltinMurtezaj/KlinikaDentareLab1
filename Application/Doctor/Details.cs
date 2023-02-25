using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Doctor
{
    public class Details
    {
        public class Query : IRequest<DoktoriDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, DoktoriDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;

                _context = context;
            }
            public async Task<DoktoriDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var doktori = await _context.Doktoret.Include(x => x.Pacientet).ThenInclude(x => x.Pacienti)
                                                        .FirstOrDefaultAsync(x => x.Id == request.Id);
                var doktoriDto = _mapper.Map<DoktoriDto>(doktori);
                return doktoriDto;
            }

        }

    }
}