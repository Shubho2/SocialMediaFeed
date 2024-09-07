import React, { useEffect } from 'react';
import { AppBar, Button, Typography, Toolbar, Avatar } from '@mui/material';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import memories from "../../images/memories.png";
import { extractUserData } from '../../utils/helper';
import { jwtDecode } from 'jwt-decode';
import actionTypes from '../../constants/actionTypes';


const NavBar = ({ user, setUser }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionTypes.LOGOUT });
        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(extractUserData());

    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={NavLink} to="/" className={classes.heading} variant="h2" align="left">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                { user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name.split(" ")[0]} src={user?.result?.imageUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user?.result.name.split(" ")[0]}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={NavLink} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;