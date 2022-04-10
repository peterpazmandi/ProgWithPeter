import { UpsertPostDto } from "./upsertPostDto.model";

export interface UpsertLectureDto {
    id: number;
    post: UpsertPostDto;
    status: string;
}