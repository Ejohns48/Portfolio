import './css/App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';

// Lazy load pages for code splitting - reduces initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const ContactMe = lazy(() => import('./pages/ContactMe'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Admin = lazy(() => import('./pages/Admin'));

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

// Layout component to conditionally show Nav/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  
  return (
    <>
      {!isAdminPage && <Nav />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <CMSProvider>
      <div className="App">      
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>                 
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/contact" element={<ContactMe />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/admin" element={<Admin />} />
              </Routes> 
            </Suspense>
          </Layout>
        </Router>
      </div>
    </CMSProvider>
  );
}

export default App;
