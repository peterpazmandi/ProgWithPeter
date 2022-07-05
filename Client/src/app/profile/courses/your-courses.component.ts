import { Component, OnInit } from '@angular/core';
import { UserCourseEnrollmentDto } from 'src/app/_models/UserCourseEnrollmentDto.model';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css']
})
export class YourCoursesComponent implements OnInit {
  enrolledCourses: UserCourseEnrollmentDto[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getEnrolledCoursesByUserId().subscribe(result => {
      this.enrolledCourses.push(...result)
    })
  }

}
