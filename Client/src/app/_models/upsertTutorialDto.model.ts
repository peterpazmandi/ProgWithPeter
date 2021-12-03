import { CreatePostDto } from "./createPostDto.model";

export interface UpsertTutorialDto {
    id: number;
    post: CreatePostDto;
    status: string;
    price: number;
    currency: string;
}