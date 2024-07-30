using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Ticket;
using api.Helpers;
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
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.GivenName)!.Value);
            var userRoles = await _userManager.GetRolesAsync(user!);

            var tickets = await _ticketRepo.GetAll(query, userRoles);
            var ticketsDto = tickets.Select(t => _mapper.Map<TicketDto>(t));
            //ticketsDto = ticketsDto.Where(ticket => roles.Contains(ticket.Line));
            return Ok(ticketsDto);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            var ticket = await _ticketRepo.GetById(id);
            if(ticket == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TicketDto>(ticket));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTicket([FromBody] TicketCreateRequestDto ticketDto)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            var ticketModel = _mapper.Map<TicketModel>(ticketDto);
            var username = User.FindFirst(ClaimTypes.GivenName)!.Value;
            var user = await _userManager.FindByNameAsync(username);
            ticketModel.AppUser = user!;
            await _ticketRepo.Create(ticketModel);
            return CreatedAtAction(
                nameof(GetById), 
                new { id = ticketModel.Id}, 
                _mapper.Map<TicketDto>(ticketModel)
                );
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateTicket([FromRoute] int id, [FromBody] UpdateTicketRequestDto ticketDto)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            TicketModel? ticket = null;
            String? username = null;

            if (ticketDto.IsTaking == true) 
            {
                username = User.FindFirst(ClaimTypes.GivenName)!.Value;
                if (username != null)
                {
                    ticket = await _ticketRepo.Update(id, ticketDto, username);
                }
                
            } else {
                ticket = await _ticketRepo.Update(id, ticketDto, username);
            }
            
            
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TicketDto>(ticket, opt => opt.Items["Username"] = ticket.AppUser.UserName));
        }
        
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTicket([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);
                    
            var ticket = await _ticketRepo.Delete(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}