using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Comment;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly ITicketRepository _ticketRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public CommentController(ICommentRepository commentRepo, IMapper mapper, UserManager<AppUser> userManager, ITicketRepository ticketRepo)
        {
            _commentRepo = commentRepo;
            _ticketRepo = ticketRepo;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            var comment = await _commentRepo.GetById(id);
            
            if(comment == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.GivenName)!.Value);
            var userRoles = await _userManager.GetRolesAsync(user!);

            if(userRoles.Contains(comment.TicketModel!.Line) || comment.AppUser == user)
            {
                return Ok(_mapper.Map<CommentDto>(comment));
            }

            return StatusCode(401, "You don't have access to this ticket.");
        }

        [HttpPost("{ticketId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromRoute] int ticketId, [FromBody] CommentCreateRequestDto commentDto)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);

            var ticket = await _ticketRepo.GetById(ticketId);
            if(ticket == null) return BadRequest("Ticket not found");

            var username = User.FindFirst(ClaimTypes.GivenName)!.Value;
            var user = await _userManager.FindByNameAsync(username);
            var userRoles = await _userManager.GetRolesAsync(user!);

            if(!userRoles.Contains(ticket.Line) && ticket.AppUser != user)
            {
                return StatusCode(401, "You don't have access to this ticket.");
            }

            var commentModel = _mapper.Map<Comment>(commentDto);
            commentModel.AppUser = user;
            commentModel.TicketModel = ticket;

            await _commentRepo.Create(commentModel);
            return CreatedAtAction(
                nameof(GetById), 
                new { id = commentModel.Id}, 
                _mapper.Map<CommentDto>(commentModel)
                );
        }   
    }
}