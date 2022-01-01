import { Category } from "./category.model";
import { Tag } from "./tag.model";

export interface TutorialListPostDto {
    title: string,
    
    tags: Tag[],

    category: Category
}