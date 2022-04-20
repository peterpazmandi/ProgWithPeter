import { Category } from "./category.model";
import { Meta } from "./meta.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export interface Post {
    id: Nullable<number>,
    title: string,
    excerpt: string,
    content: string,

    featuredImageUrl: string,

    meta: Nullable<Meta>,

    appUser: Nullable<User>,

    password: string,
    length: number,

    tags: Nullable<Tag[]>

    category: Nullable<Category>
}

export type Nullable<T> = T | null;