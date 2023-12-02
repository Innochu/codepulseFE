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
}