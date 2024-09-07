import React, { useState } from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { extractUserData } from './utils/helper';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const App = () => {
    const [user, setUser] = useState(extractUserData());
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <NavBar user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<Home user={user} setUser={setUser}/>} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;