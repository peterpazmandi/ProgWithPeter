import { Post } from "./post.entity";

export interface Tutorial {
    id: number;
    status: string;

    price: number;
    currency: string;

    creationDate: Date;
    modificationDate: Date;
    publishDate: Date;

    post: Post;
}