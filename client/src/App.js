// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';

const AdminPage = () => {
  return <div>Admin Page</div>;
};

const PlayerPage = () => {
  return <div>Player Page</div>;
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
