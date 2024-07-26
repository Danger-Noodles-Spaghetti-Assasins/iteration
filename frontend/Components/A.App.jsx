import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CoinPage from './CoinPage';
import Signup from './Signup';
import Login from './Login';
import Graph from './Graph';

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