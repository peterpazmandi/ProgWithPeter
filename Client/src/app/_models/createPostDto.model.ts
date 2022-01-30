import { Category as Category } from "./category.model";
import { CreateMetaDto } from "./createMetaDto.model";
import { Tag } from "./tag.model";

export interface CreatePostDto {
    title: string;
    excerpt: string;
    content: string;
    password: string;

    featuredImageUrl: string;

    tagIds: number[];
    categoryName: string;
    meta: CreateMetaDto;

    length: number;
}