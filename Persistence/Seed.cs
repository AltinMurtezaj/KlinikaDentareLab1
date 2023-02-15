using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            throw new NotImplementedException();
        }
    }
}