import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
import CoinPage from './D.CoinPage';
import Coin from './E.Coin';
import Graph from './G.Graph.jsx';
import '../Styling/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { orange } from "@mui/material/colors";
import { dark } from '@mui/material/styles/createPalette.js';

const App = () => {
    const theme = createTheme({
        palette:{
            mode: "dark",
            primary: {
                main: orange[500]
            }
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>    
            <div id="outerContainer">
                <Router>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/graph" element={<Graph />} />
                        {/* Modify the route to accept coinId as a URL parameter */}
                        <Route path="/coinpage/:coinId" element={<CoinPage />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;