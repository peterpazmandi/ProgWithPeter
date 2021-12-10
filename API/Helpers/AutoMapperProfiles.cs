using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AppUser, MemberDto>();

            CreateMap<Tutorial, UpsertTutorialDto>().ReverseMap();
            CreateMap<Post, CreatePostDto>().ReverseMap();
            CreateMap<Meta, CreateMetaDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Tag, TagDto>().ReverseMap();


            CreateMap<AppUser, UserDto>().ReverseMap();
            CreateMap<Post, PostDto>().ReverseMap();
            CreateMap<Meta, MetaDto>().ReverseMap();
            CreateMap<Tutorial, TutorialDto>().ReverseMap();

        }
    }
}