using System.Collections.Generic;

namespace API.DTOs
{
    public class LoginUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool EmailConfirmed { get; set; }

        public List<CourseEnrollmentDto> CourseEnrollments { get; set; }
    }
}