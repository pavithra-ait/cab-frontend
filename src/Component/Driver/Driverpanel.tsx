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

export default function Driverpanel() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navi = useNavigate()

  function logout() {
    localStorage.removeItem('driver')
  }
  React.useEffect(() => {
    const auth = localStorage.getItem('driver');
    if (!auth) {
      navi('/driver-login')
    }
  })

  const DrawerList = (
    <Box onClick={toggleDrawer(false)} sx={{ bgcolor: '#ef6c00', width: 200, height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
      <List sx={{ marginTop: 10 }}>

        <ListItem disablePadding sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItemButton>
            <Link href={'/driver-panel/driver-home'} sx={{ textDecoration: 'none', color: 'white', fontSize: '18px', fontWeight: 500 }} >Home </Link>
          </ListItemButton>
          <ListItemButton>
            <Link href={'/driver-panel/booking-list'} sx={{ textDecoration: 'none', color: 'white', fontSize: '18px', fontWeight: 500 }} >Home </Link>
          </ListItemButton>
          <ListItemButton>
            <Link onClick={logout} sx={{ textDecoration: 'none', color: 'white', fontSize: '18px', fontWeight: 500 }}  >Logout </Link>
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );

  return (
    <Box sx={{ height: '640px', width: '100%' }}>
      <AppBar position="fixed" color='warning' sx={{ display: 'flex', flexDirection: 'column', backdropFilter: 'blur(104px)' }}>
        <Toolbar disableGutters >
          <Container maxWidth="lg" sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Box sx={{ display: 'flex', marginTop: 1 }} >
              <LocalTaxiIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                DRIVER PANEL
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
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                DRIVER PANEL

              </Typography>
            </Box>
            <Box sx={{}}>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
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

