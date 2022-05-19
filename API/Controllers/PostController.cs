using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Drawing;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using API.Extensions;
using API.Interfaces;
using API.Entities;

namespace API.Controllers
{
    public class PostController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public PostController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("add-post-photo")]
        public async Task<ActionResult<string>> AddPostPhoto(IFormFile upload)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(upload.FileName);
                System.Console.WriteLine(upload.FileName);
                var folderDirectory = $"\\Photos\\PostPhotos";
                var path = Path.Combine("Photos\\PostPhotos", upload.FileName);

                var memoryStream = new MemoryStream();
                await upload.OpenReadStream().CopyToAsync(memoryStream);

                if (!Directory.Exists(folderDirectory))
                {
                    Directory.CreateDirectory(folderDirectory);
                }

                await using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    memoryStream.WriteTo(fs);
                }

                return Ok(new { Url = path });
            } 
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
        
        [Authorize]
        [HttpPost("add-featured-post-image")]
        public async Task<ActionResult<string>> AddFeaturedPostImage(IFormFile file)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(file.FileName);
                System.Console.WriteLine(file.FileName);
                var folderDirectory = $"\\Photos\\PostPhotos\\FeaturedImages";
                var path = Path.Combine("Photos\\PostPhotos\\FeaturedImages", file.FileName);

                var memoryStream = new MemoryStream();
                await file.OpenReadStream().CopyToAsync(memoryStream);

                if (!Directory.Exists(folderDirectory))
                {
                    Directory.CreateDirectory(folderDirectory);
                }

                await using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    memoryStream.WriteTo(fs);
                }

                return Ok(path);
            } 
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
        
        [Authorize]
        [HttpPost("AddSourceCode")]
        public async Task<ActionResult<PhotoDto>> AddSourceCode(IFormFile file, int postId)
        {
            try
            {
                Post post = await _unitOfWork.PostRepository.GetPostByIdAsnyc(postId);

                FileInfo fileInfo = new FileInfo(file.FileName);
                var fileName = Guid.NewGuid().ToString() + fileInfo.Extension;
                var folderDirectory = $"\\SourceCodes";
                var path = Path.Combine("SourceCodes", fileName);

                var memoryStream = new MemoryStream();
                await file.OpenReadStream().CopyToAsync(memoryStream);

                if (!Directory.Exists(folderDirectory))
                {
                    Directory.CreateDirectory(folderDirectory);
                }

                await using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    memoryStream.WriteTo(fs);
                }

                if(!string.IsNullOrEmpty(post.SourceCodeUrl))
                {
                    System.IO.File.Delete(Path.Combine("SourceCodes", post.SourceCodeUrl));
                }
                
                post.SourceCodeUrl = fileName;

                if(await _unitOfWork.Complete())
                {
                    return Ok(fileName);
                }

                return BadRequest("Upload source code failed!");
            }
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}