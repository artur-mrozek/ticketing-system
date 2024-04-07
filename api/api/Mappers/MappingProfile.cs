using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ticket;
using api.Models;
using AutoMapper;

namespace api.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TicketCreateRequestDto, TicketModel>();
            CreateMap<TicketModel, TicketDto>()
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom((src, dest, destMember, context) => context.Items["Username"]));
        }
    }
}