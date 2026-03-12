import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMobileMenu}>
          <span className="brand-icon">📚</span>
          <span className="brand-text">Student Management System</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link 
                className={`nav-link d-flex align-items-center ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link d-flex align-items-center ${location.pathname === '/add' ? 'active' : ''}`} 
                to="/add"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-text">Add Student</span>
              </Link>
            </li>
            <li className="nav-item ms-2">
              <div className="nav-stats d-none d-lg-flex align-items-center">
                <span className="stats-badge">
                  <span className="stats-icon">📊</span>
                  <span className="stats-text">Live</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          padding: 0.75rem 0;
        }
        
        .navbar.scrolled {
          padding: 0.5rem 0;
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        
        .navbar-brand {
          font-weight: 700;
          font-size: 1.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .navbar-brand:hover {
          transform: translateY(-2px);
        }
        
        .brand-icon {
          font-size: 1.8rem;
          margin-right: 0.5rem;
          -webkit-text-fill-color: initial;
        }
        
        .brand-text {
          -webkit-text-fill-color: initial;
        }
        
        .navbar-nav .nav-link {
          font-weight: 500;
          color: #2d3748 !important;
          margin: 0 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          padding: 0.75rem 1rem !important;
          position: relative;
          overflow: hidden;
        }
        
        .navbar-nav .nav-link:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea !important;
          transform: translateY(-2px);
        }
        
        .navbar-nav .nav-link.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white !important;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .nav-icon {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }
        
        .nav-text {
          font-weight: 500;
        }
        
        .navbar-toggler {
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          background: rgba(102, 126, 234, 0.1);
          transition: all 0.3s ease;
        }
        
        .navbar-toggler:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: scale(1.05);
        }
        
        .navbar-toggler:focus {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .stats-badge {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);
          animation: pulse 2s infinite;
        }
        
        .stats-icon {
          font-size: 1rem;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @media (max-width: 768px) {
          .navbar-brand {
            font-size: 1.25rem;
          }
          
          .brand-icon {
            font-size: 1.5rem;
          }
          
          .navbar-nav .nav-link {
            margin: 0.25rem 0;
            border-radius: 6px;
          }
          
          .nav-text {
            margin-left: 0.25rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
