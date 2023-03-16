import { Photo } from "./photo.entity";

export interface User {
    id: number;

    firstName: string;
    lastName: string;
    username: string;

    token: string;

    photoUrl: string;

    roles: string[];
    
    email: string;
    emailConfirmed: boolean;

    gender: string;
    country: string;

    registrationDate: Date;
}