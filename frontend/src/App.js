import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { extractUserData } from './utils/helper';

const App = () => {
    const [user, setUser] = useState(extractUserData());

    return (
            <Container maxWidth="lg">
                <NavBar user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<Home user={user} setUser={setUser}/>} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
    );
}

export default App;