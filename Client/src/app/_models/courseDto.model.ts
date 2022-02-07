import { Post } from "./post.model";

export interface Course {
    id: number,
    status: string,
    price: number,
    currency: string,
    creationDate: Date,
    modificationDate: Date,
    publishDate: Date

    post: Post
}