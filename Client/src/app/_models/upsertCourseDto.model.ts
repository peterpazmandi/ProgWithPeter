import { UpsertPostDto } from "./upsertPostDto.model";

export interface UpsertCourseDto {
    id: number,
    status: string,
    price: number,
    currency: string,

    post: UpsertPostDto
}