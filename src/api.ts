import axios from 'axios';
import { Post, PostRequest } from './types';

const baseUrl = 'http://localhost:8000/api/';

export const fetchPostById = async (postId: string): Promise<Post> => {
  const response = await axios.get<Post>(`${baseUrl}posts/${postId}`);
  return response.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(`${baseUrl}posts/`);
    return response.data;
};

export const createPost = async (newPost: PostRequest): Promise<Post> => {
    const response = await axios.post<Post>(`${baseUrl}posts/`, newPost);
    return response.data;
}