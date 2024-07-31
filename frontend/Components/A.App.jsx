import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
import CoinPage from './D.CoinPage';
import Signup from './1.Signup.jsx';
import Login from './2.Login.jsx';
import Graph from './G.Graph.jsx';
import '../Styling/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from './NavBar';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { dark } from '@mui/material/styles/createPalette.js';

 const App = () => {
    const theme = createTheme({
        palette:{
            mode: "light",
            primary: {
                main:"#6D98BA"
            },
            secondary: {
                main:"#D3B99F"
            }
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>    
            <div id="outerContainer">
                <NavBar/>
                <Router>
                    <Routes>
                    <Route path="/homepage" element={<Homepage />} />
                        <Route path="/graph" element={<Graph />} />
                        {/* Modify the route to accept coinId as a URL parameter */}
                        <Route path="/coinpage/:coinId" element={<CoinPage />} />
                        <Route path="/" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;
