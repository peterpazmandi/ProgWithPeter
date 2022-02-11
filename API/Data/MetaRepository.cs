using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class MetaRepository : IMetaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MetaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Remove(Meta meta)
        {
            _context.Metas.Remove(meta);
        }
    }
}