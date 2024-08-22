using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AccountController
        (
            UserManager<AppUser> userManager, 
            ITokenService tokenService, 
            SignInManager<AppUser> signinManager, 
            RoleManager<IdentityRole> roleManager
        )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signinManager;
            _roleManager = roleManager;
        }
         [HttpPost("login")]
        public async Task<IActionResult> login(LoginDto loginDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PhoneNumber = registerDto.PhoneNumber,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Address = registerDto.Address
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password!);

                if(createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if(roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    } else 
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                } else 
                {
                    return StatusCode(500, createdUser.Errors);
                }
            } catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("add-role-to-user")]
        [Authorize]
        public async Task<IActionResult> AddUserToRole([FromBody] AddUserToRoleDto dto)
        {   
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.GivenName)!.Value);
            var userRoles = await _userManager.GetRolesAsync(user!);
            if(!userRoles.Contains("Admin"))
                return Unauthorized("You do not have rights to perform this action");

            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            if (!await _roleManager.RoleExistsAsync(dto.Role)) 
                return BadRequest("Role not found");

            var targetUser = await _userManager.FindByNameAsync(dto.Username);
            if (targetUser == null) 
                return BadRequest("User not found");

            if (await _userManager.IsInRoleAsync(targetUser, dto.Role))
                return BadRequest("User already has this role assigned");

            IdentityResult result = await _userManager.AddToRoleAsync(targetUser, dto.Role);
            if (result.Succeeded)
                return Ok();

            return BadRequest("Something went wrong");
        }
    }
}