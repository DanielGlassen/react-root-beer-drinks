import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import DrinkDetail from './components/DrinkDetail/DrinkDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/drinks/:id" element={<DrinkDetail />} />
    </Routes>
  );
};

export default App;
