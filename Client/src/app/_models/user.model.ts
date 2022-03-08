import { CourseEnrollment } from "./course-enrollment.model";

export interface User {
    username: string;
    token: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    roles: string[];
    clientURI: string;

    courseEnrollments: CourseEnrollment[]
}