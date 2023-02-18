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


namespace Application.Pacient
{
    public class Details
    {
        public class Query : IRequest<Result<PacientiDto>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PacientiDto>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<PacientiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacienti = await _context.Pacientet.Include(x => x.Doktoret).SingleOrDefaultAsync(x => x.Id == request.Id);
                var pacientiToReturn = _mapper.Map<PacientiDto>(pacienti);
                if(pacienti ==null) return null;
                return Result<PacientiDto>.Success(pacientiToReturn);           }

        }

    }
}