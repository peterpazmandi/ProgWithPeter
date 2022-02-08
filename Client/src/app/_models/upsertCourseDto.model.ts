import { UpsertPostDto } from "./upsertPostDto.model";
import { UpsertSectionDto } from "./upsertSectionDto.model";

export interface UpsertCourseDto {
    id: number,
    status: string,
    price: number,
    currency: string,

    post: UpsertPostDto,

    sections: UpsertSectionDto[]
}