import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchPostByIdAsync } from '../features/posts/postsSlice';

type PostParams = { postId?: string }; // Make postId optional

const Post: React.FC = () => {
  const { postId } = useParams<PostParams>();
  const dispatch: ThunkDispatch<RootState, any, Action> = useAppDispatch();
  const { thisPost, loading, error } = useAppSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostByIdAsync(postId));
    }
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!thisPost) return <p>Post not found</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      <Typography variant="h2" gutterBottom>
        {thisPost.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{mt: 1}}>
        Autor: {thisPost.author}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Fecha de creación: {thisPost.created_at}
      </Typography>
      <Typography variant="body1" sx={{mt: 3}}>
        {thisPost.content}
      </Typography>
    </>
  );
};

export default Post;