import './App.css';

import React from 'react';
import SecurityList from './pages/SecurityList';
import SecurityDetails from './pages/SecurityDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'


const App = () => {
  return (
    <div className=''>
      <Header></Header>
      <Router>
          
          <Routes>
            <Route path="/" element={<SecurityList />} />
            <Route path="/securities" element={<SecurityList />} />
            <Route path="/securities/:id" element={<SecurityDetails />} />
          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
