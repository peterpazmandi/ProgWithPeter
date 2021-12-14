import { CategoryDto as CategoryDto } from "./categoryDto.model";
import { CreateMetaDto } from "./createMetaDto.model";
import { TagDto } from "./tagDto.model";

export interface CreatePostDto {
    title: string;
    excerpt: string;
    content: string;
    password: string;

    featuredImageUrl: string;

    tags: number[];
    category: string;
    meta: CreateMetaDto;

    length: number;
}