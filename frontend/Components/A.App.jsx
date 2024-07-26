import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './B.HomePage.jsx';
import CoinPage from './D.CoinPage.jsx';
import Signup from './1.Signup.jsx';
import Login from './2.Login.jsx';
import Graph from './G.Graph.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/coinpage/:coinId" element={<CoinPage />} />
      </Routes>
    </Router>
  );
};

export default App;