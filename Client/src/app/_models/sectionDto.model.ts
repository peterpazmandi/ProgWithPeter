import { Lecture } from "./lectureDto.model";

export interface Section {
    id: number,
    title: string,

    lectures: Lecture[];

    position: number
}