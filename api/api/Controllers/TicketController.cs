using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Ticket;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {   
        private readonly ITicketRepository _ticketRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public TicketController(ITicketRepository ticketRepo, IMapper mapper, UserManager<AppUser> userManager)
        {
            _ticketRepo = ticketRepo;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var tickets = await _ticketRepo.GetAll();
            var ticketsDto = tickets.Select(t => _mapper.Map<TicketDto>(t, opt => opt.Items["Username"] = t.AppUser.UserName));
            return Ok(ticketsDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTicket([FromBody] TicketCreateRequestDto ticketDto)
        {
            var ticketModel = _mapper.Map<TicketModel>(ticketDto);
            var username = User.FindFirst(ClaimTypes.GivenName)!.Value;
            var user = await _userManager.FindByNameAsync(username);
            ticketModel.AppUser = user!;
            await _ticketRepo.Create(ticketModel);
            return Ok();
        }
        
    }
}