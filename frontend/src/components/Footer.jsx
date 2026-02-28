import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Footer sections reveal
      gsap.from('.footer-section', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });

      // Bottom info stagger
      gsap.from('.footer-col', {
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <footer id="contact" className="main-footer reveal-section" ref={footerRef}>
      <div className="footer-top">
        <div className="footer-section">
          <h3 className="footer-title">Stay in the know</h3>
          <a
            href="mailto:hello@rosadelvents.com"
            className="footer-button magnetic-light"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            Send us an email
          </a>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-section">
          <h3 className="footer-title">Get in touch</h3>
          <a
            href="tel:+34000000000"
            className="footer-button magnetic-light"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            Call us
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-col">
          <span className="footer-label">EMAIL</span>
          <a href="mailto:hello@rosadelvents.com">HELLO@ROSADELVENTS.COM</a>
        </div>

        <div className="footer-col">
          <span className="footer-label">SOCIAL</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            INSTAGRAM
          </a>
        </div>

        <div className="footer-col legal">
          <span className="footer-label">LEGAL</span>
          <div className="legal-links">
            <a href="#privacy">PRIVACY POLICY</a>
            <a href="#terms">TERMS OF USE</a>
          </div>
        </div>

        <div className="footer-col credits">
          <span className="footer-label">LOCATION</span>
          <span>CATALONIA, SPAIN</span>
        </div>

        <div className="footer-col credits">
          <span className="footer-label">ESTABLISHED</span>
          <span>EST. 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;