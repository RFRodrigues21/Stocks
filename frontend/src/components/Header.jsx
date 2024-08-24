import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ThemeSwitch  from './ThemeSwitch';


function Header() {

  return (
    <AppBar position="static" className='dark:bg-sky-950'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters  sx={{ display: 'flex', mr: 1, justifyContent: 'space-between' }}>
            
            <ShowChartIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FULL-STACK EXERCISE 
            </Typography>
          
          <ThemeSwitch></ThemeSwitch>
          
        </Toolbar>
        
      </Container>
    </AppBar>
  );
}
export default Header;
