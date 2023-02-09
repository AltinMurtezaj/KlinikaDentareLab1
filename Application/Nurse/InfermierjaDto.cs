using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AppUserCourse;

namespace Application.Nurse
{
    public class InfermierjaDto: AppUserDto
    {
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
    }
}