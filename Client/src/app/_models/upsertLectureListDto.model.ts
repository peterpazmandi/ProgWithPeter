import { UpsertPostOfLectureDto } from "./upsertPostOfLectureDto.model";

export interface UpsertLectureListDto {
    id: number,
    status: string,
    modificationDate: Date,
    publishDate: Date,
    courseTitle: string,

    position: number,

    post: UpsertPostOfLectureDto
}