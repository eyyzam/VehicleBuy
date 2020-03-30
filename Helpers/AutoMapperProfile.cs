using VehicleBuy.Models;
using AutoMapper;
using VehicleBuy.DTO;

namespace VehicleBuy.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TblBook, BookListDto>();
            CreateMap<LoginDto, TblUser>();
            CreateMap<RegisterDto, TblUser>().ForMember(dest => dest.Password, opt => opt.Ignore());
            CreateMap<AuctionDTO, tblAuctions>();
            CreateMap<VehicleDTO, tblVehicles>();
        }
    }
}
