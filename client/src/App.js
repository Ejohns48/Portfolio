import './css/App.css';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Portfolio from './pages/Portfolio';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">      
      <Router>
        <Nav  />
        <Routes>                 
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<ContactMe />} />
            <Route path="/portfolio" element={<Portfolio />} />      
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
