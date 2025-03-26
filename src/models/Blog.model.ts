export type Blog = {
    _id: string;
    name: string;
    user_id: string;
    user_name: string;
    category_id: string;
    category_name: string;
    tags: string[];
    image_url: string;
    description: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface BlogRequest {
    name: string;
    tags: string[];
    image_url: string;
    description: string;
    content: string;
}

export interface BlogEditRequest {
    _id: string;
    name: string;
    user_id?: string;
    image_url: string;
    description: string;
    content: string;
    tags: string[]; 
};