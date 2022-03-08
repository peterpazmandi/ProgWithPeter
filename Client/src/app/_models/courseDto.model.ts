import { BaseContent } from "./base-content.model";
import { CourseEnrollment } from "./course-enrollment.model";
import { Post } from "./post.model";
import { Section } from "./sectionDto.model";

export interface Course extends BaseContent {
    sections: Section[];

    courseEnrollments: CourseEnrollment[];
}