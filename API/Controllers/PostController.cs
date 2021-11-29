using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace API.Controllers
{
    public class PostController: BaseApiController
    {
        [HttpPost("add-post-photo")]
        public async Task<ActionResult<string>> AddPostPhoto(IFormFile photo)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(photo.FileName);
                System.Console.WriteLine(photo.FileName);
                var folderDirectory = $"\\Photos\\PostPhotos";
                var path = Path.Combine("Photos\\PostPhotos", photo.FileName);

                var memoryStream = new MemoryStream();
                await photo.OpenReadStream().CopyToAsync(memoryStream);

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
    }
}