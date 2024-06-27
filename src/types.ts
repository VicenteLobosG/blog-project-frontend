export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

export interface PostRequest {
    title: string;
    content: string;
    author: string;
}

export interface PostFailedResponse {
    detail: string
}
