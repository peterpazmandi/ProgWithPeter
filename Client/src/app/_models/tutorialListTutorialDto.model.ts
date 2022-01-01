import { TutorialListPostDto } from "./tutorialListPostDto.model";

export interface TutorialListTutorialDto {
    id: number,
    status: string,
    modificationDate: Date,
    publishDate: Date

    post: TutorialListPostDto
}