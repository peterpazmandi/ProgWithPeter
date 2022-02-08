import { UpsertLectureDto } from "./upsertLectureDto.model";

export interface UpsertSectionDto {
    title: string,
    position: number,

    lectures: UpsertLectureDto[]
}