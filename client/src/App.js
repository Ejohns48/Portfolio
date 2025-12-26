import './css/App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages for code splitting - reduces initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const ContactMe = lazy(() => import('./pages/ContactMe'));
const Portfolio = lazy(() => import('./pages/Portfolio'));

// Loading fallback component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    color: 'white'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <div className="App">      
      <Router>
        <Nav />
        <Suspense fallback={<PageLoader />}>
          <Routes>                 
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<ContactMe />} />
            <Route path="/portfolio" element={<Portfolio />} />      
          </Routes> 
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
