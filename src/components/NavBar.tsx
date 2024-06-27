import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, ThemeProvider, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const navItems = [{itemName: 'Home', itemPath: '/'}, {itemName: 'Crear Post', itemPath: '/posts/create'}];

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5f5',
      contrastText: '#000000',
    },
    divider: grey[200],
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
});

const NavBar: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BLOG
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link to={item.itemPath} style={{ textDecoration: 'none' }}>
                <Button key={item.itemName} style={{ color: '#000000' }}>
                  {item.itemName}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
