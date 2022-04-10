import { UpsertPostOfLectureDto } from "./upsertPostOfLectureDto.model";

export interface UpsertLectureTitleAndPositionDto {
    position: number,

    post: UpsertPostOfLectureDto
}