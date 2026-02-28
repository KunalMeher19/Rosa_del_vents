import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="main-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3 className="footer-title">Stay in the know</h3>
          <a 
            href="https://theotherhafh.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-button"
          >
            Read our Substack
          </a>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-section">
          <h3 className="footer-title">Get in touch</h3>
          <a href="mailto:hello@hafhcircle.com" className="footer-button">
            Send us an email
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-col">
          <span className="footer-label">EMAIL</span>
          <a href="mailto:hello@hafhcircle.com">HELLO@HAFHCIRCLE.COM</a>
        </div>

        <div className="footer-col">
          <span className="footer-label">SOCIAL</span>
          <a href="https://instagram.com/hafhcircle" target="_blank" rel="noopener noreferrer">
            INSTAGRAM
          </a>
        </div>

        <div className="footer-col legal">
          <span className="footer-label">LEGAL</span>
          <div className="legal-links">
            <a href="#privacy">PRIVACY POLICY</a>
            <a href="#terms">TERMS OF USE</a>
            <a href="#affiliate">AFFILIATE DISCLOSURE</a>
          </div>
        </div>

        <div className="footer-col credits">
          <span className="footer-label">DESIGNED BY</span>
          <span>MARTIN BRICENO</span>
        </div>

        <div className="footer-col credits">
          <span className="footer-label">DEVELOPED BY</span>
          <span>ILJA VAN ECK</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;