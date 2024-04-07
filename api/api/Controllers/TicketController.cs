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

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var ticket = await _ticketRepo.GetById(id);
            if(ticket == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TicketDto>(ticket, opt => opt.Items["Username"] = ticket.AppUser.UserName));
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
            return CreatedAtAction(
                nameof(GetById), 
                new { id = ticketModel.Id}, 
                _mapper.Map<TicketDto>(ticketModel, opt => opt.Items["Username"] = ticketModel.AppUser.UserName));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateTicket([FromRoute] int id, [FromBody] UpdateTicketRequestDto ticketDto)
        {
            var ticket = await _ticketRepo.Update(id, ticketDto);
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TicketDto>(ticket, opt => opt.Items["Username"] = ticket.AppUser.UserName));
        }
        
    }
}