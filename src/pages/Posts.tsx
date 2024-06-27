import React, { useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPostsAsync } from '../features/posts/postsSlice';
import { Post } from '../types';


const Posts: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, Action> = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Posts
      </Typography>
      <List>
        {posts.map((post: Post) => (
          <ListItem key={post.id} component={Link} to={`/posts/${post.id}`} button>
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Posts;