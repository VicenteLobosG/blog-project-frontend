import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, Grid, ThemeProvider, createTheme } from '@mui/material';
import Posts from './pages/Posts';
import Post from './pages/Post';
import PostCreate from './pages/PostCreate';
import NavBar from './components/NavBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#000000',
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000',
          backgroundColor: '#f5f5f5',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        },
      },
    },
  },
});

const AppRoutes: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh', mt: 8}}>
        <Router>
          <NavBar />
          <Box component="main" sx={{ flex: 1, mt: 8, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <Grid container sx={{ maxWidth: '1200px', flex: 1 }}>
              <Grid item xs={false} sm={2} />
              <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                <Routes>
                  <Route path="/" element={<Navigate to="/posts" replace />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:postId" element={<Post />} />
                  <Route path="/posts/create" element={<PostCreate />} />
                </Routes>
              </Grid>
              <Grid item xs={false} sm={2} />
            </Grid>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default AppRoutes;