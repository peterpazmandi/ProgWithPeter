import { UpsertLectureTitleAndPositionDto } from "./upsertLectureTitleAndPositionDto.model";

export interface UpsertSectionDto {
    title: string,
    position: number,

    lectures: UpsertLectureTitleAndPositionDto[]
}