import { Category } from "./category.model";
import { Meta } from "./meta.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export interface Post {
    id: number,
    title: string,
    excerpt: string,
    content: string,

    featuredImageUrl: string,

    meta: Meta,

    appUser: User,

    password: string,
    length: number,

    tags: Tag[]

    category: Category
}