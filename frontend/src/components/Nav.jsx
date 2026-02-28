import React from 'react';

const Nav = ({ menuOpen, setMenuOpen, scrollY }) => {
  const isScrolled = scrollY > 100;

  return (
    <>
      <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <a href="/" className="logo">HAFH</a>
        </div>
        <div className="nav-right">
          <a 
            href="https://theotherhafh.substack.com" 
            className="nav-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Other HAFH
          </a>
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <a 
            href="https://theotherhafh.substack.com" 
            className="nav-button light"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Other HAFH
          </a>
          <button 
            className="menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="side-menu-content">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>

          <ul className="menu-links">
            <li><a href="#hotels" onClick={() => setMenuOpen(false)}>Hotels</a></li>
            <li><a href="#people" onClick={() => setMenuOpen(false)}>People</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            <li><a href="https://theotherhafh.substack.com" className="highlight">The Other HAFH</a></li>
          </ul>

          <div className="menu-footer">
            <span>ALL RIGHTS RESERVED</span>
            <div className="menu-footer-right">
              <a href="https://instagram.com/hafhcircle">INSTAGRAM</a>
              <span>©2025</span>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};

export default Nav;