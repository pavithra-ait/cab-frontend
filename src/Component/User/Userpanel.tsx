import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { Link } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export default function Userpanel() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navi = useNavigate()

  function logout() {
    localStorage.removeItem('user')
  }
  React.useEffect(() => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      navi('/login')
    }
  })

  const DrawerList = (
    <Box onClick={toggleDrawer(false)} sx={{ bgcolor: 'white', width: 200, height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
      <List sx={{ marginTop: 10 }}>

        <ListItem disablePadding sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItemButton>
            <Link href={'/user-panel/user-home'} sx={{ textDecoration: 'none', color: '#ef6c00', fontSize: '18px', fontWeight: 500 }} >Home </Link>
          </ListItemButton>
          <ListItemButton>
            <Link href={'/user-panel/taxi-available'} sx={{ textDecoration: 'none', color: '#ef6c00', fontSize: '18px', fontWeight: 500 }} >Taxi avaiablity </Link>
          </ListItemButton>
          <ListItemButton>
            <Link href={'/user-panel/payment-list'} sx={{ textDecoration: 'none', color: '#ef6c00', fontSize: '18px', fontWeight: 500 }} >Payment list </Link>
          </ListItemButton>
          <ListItemButton>
            <Link onClick={logout} sx={{ textDecoration: 'none', color: '#ef6c00', fontSize: '18px', fontWeight: 500 }}  >Logout </Link>
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );

  return (
    <Box sx={{ height: '640px', width: '100%' }}>
      <AppBar position="fixed"  sx={{ display: 'flex', flexDirection: 'column', backdropFilter: 'blur(104px)',bgcolor:'white'}}>
        <Toolbar disableGutters >
          <Container maxWidth="lg" sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Box sx={{ display: 'flex', marginTop: 1 }} >
              <LocalTaxiIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:'#ef6c00' }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#ef6c00',
                  textDecoration: 'none',
                }}
              >
                USER PANEL
              </Typography>
              <LocalTaxiIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#ef6c00',
                  textDecoration: 'none',
                }}
              >
                USER PANEL

              </Typography>
            </Box>
            <Box sx={{}}>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
               sx={{ color:"#ef6c00"}}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Box>

          </Container>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: '500px' }}>
        <Outlet />
      </Box>
    </Box >
  )
}

