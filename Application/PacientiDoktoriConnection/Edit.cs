using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.PacientiDoktoriConnection
{
    public class Edit
    {
       public class Command :IRequest<Result<Unit>>
        {
            public PacientiDoktoriDTO pacientiDoktori {get;set;}
        }
       

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
            _context = context;
            _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var pacientiDoktori = await _context.PacientiDoktoret.FindAsync(request.pacientiDoktori.id);
                
                if(pacientiDoktori == null) return null;

                _mapper.Map(request.pacientiDoktori, pacientiDoktori);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update pacientin");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}