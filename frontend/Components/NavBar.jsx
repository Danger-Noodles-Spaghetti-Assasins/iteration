import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import {Menu, Search } from '@mui/icons-material';

const NavBar = () => {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                >
                <Menu />
                </IconButton>
                <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                CryptoShield
                </Typography>
                    <Search />
            </Toolbar>
        </AppBar>
    </Box>
    )
}
export default NavBar;
