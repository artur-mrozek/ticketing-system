using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {   private readonly ITicketRepository _ticketRepo;

        public TicketController(ITicketRepository ticketRepo)
        {
            _ticketRepo = ticketRepo;
        }
        
    }
}