import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
}));

const NavLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

function Navbar() {
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'bold',
                    }}
                >
                    Perfume Shop
                </Typography>
                <NavLinks>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/products"
                    >
                        Products
                    </Button>
                    <IconButton
                        color="inherit"
                        component={RouterLink}
                        to="/cart"
                    >
                        <Badge badgeContent={0} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </NavLinks>
            </StyledToolbar>
        </AppBar>
    );
}

export default Navbar; 