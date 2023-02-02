using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using API.DTOs.DoktoriDTO;

namespace API.Controllers

{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class DoktoriAccountController : ControllerBase
    {
          private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public readonly TokenService _tokenService;
        public DoktoriAccountController(UserManager<AppUser> userManager,
       
        SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager=signInManager;

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(DoktoriRegisterDTO registerDto)
        {
            if(await _userManager.Users.AnyAsync(x=>x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem(ModelState);
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                ModelState.AddModelError("userName", "Username taken");
                return ValidationProblem(ModelState);
            }
            var user = new Doktori
            {
                Emri = registerDto.Emri,
                Mbiemri=registerDto.Mbiemri,
                UserName=registerDto.UserName,
                Email = registerDto.Email,
                Specializimi = registerDto.Specializimi,
                Gjinia = registerDto.Gjinia,
                Vendbanimi = registerDto.Vendbanimi,
                Datelindja = registerDto.Datelindja,
                Kualifikimi = registerDto.Kualifikimi,
                NrKontaktues = registerDto.NrKontaktues,
                
            };
            var result = await _userManager.CreateAsync(user,registerDto.Password);

            if(result.Succeeded){
                return Ok("Doktori u shtua me sukses");
            }
            return BadRequest("Problem registering user");
        }
        

    }
}
