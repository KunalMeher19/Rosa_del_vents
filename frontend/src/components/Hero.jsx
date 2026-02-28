import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const Hero = () => {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.hero-title .line', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
      })
        .from('.hero-subtitle', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6')
        .from('.hero-cta-group', {
          y: 15,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4');

      const btn = sectionRef.current.querySelector('.hero-button');
      if (btn) {
        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }));
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line">{t.hero_title_1}</span>
          <span className="line">{t.hero_title_2}</span>
        </h1>
        <p className="hero-subtitle">{t.hero_subtitle}</p>
        <div className="hero-cta-group">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hero-button">
            <span>{t.hero_button}</span>
          </a>
          <a href="#habitaciones" className="hero-link">{t.hero_scroll} ↓</a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;