import { Nullable } from "./post.model";

export interface Category {    
    id: Nullable<number>;
    name: string;
    parentCategoryId: number
}