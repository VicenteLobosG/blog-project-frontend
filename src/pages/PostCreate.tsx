import React, { useState } from 'react';
import { Box, Grid, TextField, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { useAppDispatch } from '../hooks';
import { createPostAsync } from '../features/posts/postsSlice';

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, any, Action> = useAppDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError('');
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentError('');
    setContent(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorError('');
    setAuthor(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasError = false;
    if (!title.trim()) {
      setTitleError('El título es requerido');
      hasError = true;
    }

    if (!content.trim()) {
      setContentError('El contenido es requerido');
      hasError = true;
    }
    if (!author.trim()) {
      setAuthorError('El autor es requerido');
      hasError = true;
    }

    if (hasError) {
      return;
    }
    
    try {
      dispatch(createPostAsync({ title, content, author }));
      navigate('/posts');
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Crear Post
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Título"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              error={!!titleError}
              helperText={titleError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="content"
              name="content"
              label="Contenido"
              multiline
              rows={4}
              variant="outlined"
              value={content}
              onChange={handleContentChange}
              error={!!contentError}
              helperText={contentError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Autor"
              variant="outlined"
              value={author}
              onChange={handleAuthorChange}
              error={!!authorError}
              helperText={authorError}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Crear Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PostCreate;