import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostRequest } from '../../types';
import { fetchPostById, fetchPosts, createPost } from '../../api';
import { RootState } from '../../store';

interface PostsState {
  posts: Post[];
  thisPost: Post | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  thisPost: undefined,
  loading: false,
  error: null,
};

export const fetchPostsAsync = createAsyncThunk<Post[], void, { state: RootState }>(
  'posts/fetchPosts', 
  async () => {
    return await fetchPosts();
});

export const fetchPostByIdAsync = createAsyncThunk<Post, string, { state: RootState }>(
  'posts/fetchPostById', 
  async (postId: string) => {
    return await fetchPostById(postId);
});

export const createPostAsync = createAsyncThunk<Post, PostRequest, { state: RootState }>(
  'posts/createPost',
  async (newPost: PostRequest) => {
    return await createPost(newPost);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchPostByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.thisPost = action.payload;
      })
      .addCase(fetchPostByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      });
  },
});

export default postsSlice.reducer;