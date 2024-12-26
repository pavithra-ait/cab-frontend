import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { Link } from '@mui/material';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import { Outlet } from 'react-router-dom';


function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <Box>

            <AppBar position="fixed" color='warning' >
                <Container maxWidth="lg">
                    <Toolbar disableGutters >
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
                            CAB BOOKING
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>About</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <Link href={'/login'} >Login </Link>
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
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
                            CAB BOOKING
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'end', justifyContent: 'end' }}>

                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}> Home</Button>
                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}> About</Button>
                            <Button onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}>
                                <Link href={'/login'} sx={{ textDecoration: 'none', color: 'white' }}  >Login </Link>
                            </Button>
                            <Button onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}>
                                <Link href={'/driver-login'} sx={{ textDecoration: 'none', color: 'white' }}  >
                                    <PersonSharpIcon />
                                </Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Outlet />
            </Box>
        </Box>

    );
}
export default Header;
