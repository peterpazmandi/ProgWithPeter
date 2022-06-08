import { CourseEnrollment } from "./course-enrollment.model";
import { SubscriptionDto } from "./subscriptionDto.model";

export interface User {
    id: number;
    username: string;
    token: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    roles: string[];
    clientURI: string;

    email: string;
    emailConfirmed: boolean;

    gender: string;
    country: string;

    registrationDate: Date;

    courseEnrollments: CourseEnrollment[];

    subscription: SubscriptionDto;
}