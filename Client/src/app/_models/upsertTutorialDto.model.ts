import { UpsertPostDto } from "./upsertPostDto.model";

export interface UpsertTutorialDto {
    id: number;
    post: UpsertPostDto;
    status: string;
    price: number;
    currency: string;
}