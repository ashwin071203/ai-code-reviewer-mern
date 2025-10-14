import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

export const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/review', label: 'Code Review' },
    { path: '/profile', label: 'Profile' },
  ];

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        Code.rev
      </Link>
      
      <button 
        className="menu-button" 
        onClick={() => setMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
      
      <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
        {navItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item ${pathname === path ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
