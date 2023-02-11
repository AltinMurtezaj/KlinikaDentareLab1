using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Relationships.PacientiXRay
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public PacientiXRayDto pacientiXRay { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
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
                var pacientiXRay = await _context.PacientiXRay.FindAsync(request.pacientiXRay.id);

                if (pacientiXRay == null) return null;

                _mapper.Map(request.pacientiXRay, pacientiXRay);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update lidhjen pacienti xray");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}