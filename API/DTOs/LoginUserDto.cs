using System;
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

        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }

        public string Country { get; set; }

        public string Gender { get; set; }

        public string UserRole { get; set; }

        public DateTime RegistrationDate { get; set; }

        public List<CourseEnrollmentDto> CourseEnrollments { get; set; }
    }
}