import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import './Footer.css';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const Footer = () => {
  const footerRef = useRef(null);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-section', {
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out'
      });
      gsap.from('.footer-col', {
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 90%', toggleActions: 'play none none reverse' },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out'
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' });
  };
  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <footer className="main-footer reveal-section dark-theme" ref={footerRef}>
      <div className="footer-top">
        <div className="footer-section">
          <h3 className="footer-title">{lang === 'es' ? '¿Tienes alguna pregunta?' : 'Have a question?'}</h3>
          <a href="#contacto" className="footer-button" onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave}>
            {lang === 'es' ? 'Escríbenos' : 'Write to us'}
          </a>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-section">
          <h3 className="footer-title">{lang === 'es' ? '¿Listo para reservar?' : 'Ready to book?'}</h3>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="footer-button" onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave}>
            {lang === 'es' ? 'Reservar ahora' : 'Book now'}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-col">
          <span className="footer-label">{t.contact_address_label}</span>
          <a href="https://maps.google.com/?q=Carrer+Sant+Joan+3+El+Perello+Tarragona" target="_blank" rel="noopener noreferrer">
            CARRER SANT JOAN, 3 · 43519 EL PERELLÓ
          </a>
        </div>

        <div className="footer-col">
          <span className="footer-label">{t.contact_phone_label}</span>
          <a href="tel:+34680889399">+34 680 889 399</a>
        </div>

        <div className="footer-col legal">
          <span className="footer-label">LEGAL</span>
          <div className="legal-links">
            <a href="#privacy">{t.footer_privacy}</a>
            <a href="#legal">{t.footer_legal}</a>
            <a href="#accessibility">{t.footer_accessibility}</a>
          </div>
        </div>

        <div className="footer-col credits">
          <span className="footer-label">©</span>
          <span>ROSA DELS VENTS {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;