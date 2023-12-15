import { Category } from "../../category/models/category.model";

export interface BlogPost{
    id: string;
    title: string;
    shortDescription: string;
    author: string;
    urlHandle: string;
    content: string;
    featuredUrl: string;
    dateCreated: Date;
    isVisible: boolean;
    categories: Category[];
}