export interface UpdateBlogPostRequest{
title: string;
shortDescription: string;
author: string;
urlHandle: string;
content: string;
featuredUrl: string;
dateCreated: Date;
isVisible: boolean;
rCategory: string[]
}