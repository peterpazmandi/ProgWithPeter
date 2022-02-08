import { UpsertPostOfLectureDto } from "./upsertPostOfLectureDto.model";

export interface UpsertLectureDto {
    position: number,

    post: UpsertPostOfLectureDto
}