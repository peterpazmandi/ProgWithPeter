import { Category } from "./category.entity";
import { Meta } from "./meta.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";

export interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    featuredImageUrl: string;
    sourceCodeUrl: string;
    meta: Meta;
    appUser: User,
    password: string,
    length: number,

    tags: Tag[];

    category: Category;
}