import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import { clientId } from "../../constants/config";
import actionTypes from "../../constants/actionTypes";

const Auth = () => {
    const classes = useStyles();  
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formdata, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSignup) {
            dispatch(signup(formdata, navigate));
        } else {
            dispatch(signin(formdata, navigate));
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formdata, [event.target.name]: event.target.value });
    };

    const switchMode = () => {
        setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const googleLoginSuccess = (response) => {
        try {
            dispatch({ type: actionTypes.AUTH, data: response });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const googleLoginError = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later.");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin 
                            fullWidth
                            onSuccess={googleLoginSuccess}
                            onError={googleLoginError}
                        />
                    </GoogleOAuthProvider>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
