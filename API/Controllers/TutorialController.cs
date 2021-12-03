using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class TutorialController: PostController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TutorialController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> CreateTutorial(CreateTutorialDto tutorialDto)
        {
            // Get author
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            // Get category
            var category = await _unitOfWork.CategoriesRepository.GetCategoryByIdAsync(tutorialDto.Post.Category);

            // Get tags
            ICollection<Tag> tags = new HashSet<Tag>();
            foreach(int tagId in tutorialDto.Post.Tags)
            {
                tags.Add(await _unitOfWork.TagsRepository.GetTagByIdAsync(tagId));
            }

            // Create tutorial entry
            var tutorial = new Tutorial
            {
                Post = new Post
                {
                    Title = tutorialDto.Post.Title,
                    Excerpt = tutorialDto.Post.Excerpt,
                    Content = tutorialDto.Post.Content,
                    Password = tutorialDto.Post.Password,
                    AppUser = user,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    Category = category,
                    Tags = tags,
                    Meta = _mapper.Map<Meta>(tutorialDto.Post.Meta)
                },
                Price = tutorialDto.Price,
                Currency = tutorialDto.Currency
            };

            await _unitOfWork.TutorialRepository.AddTutorial(tutorial);

            if(await _unitOfWork.Complete())
            {
                return Ok("Tutorial has been created successfully!");
            }

            return BadRequest("Failed to create tutorial!");
        }
    }
}