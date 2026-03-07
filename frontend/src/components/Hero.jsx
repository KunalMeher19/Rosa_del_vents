import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import Grainient from './Grainient';
import './Hero.css';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const Hero = () => {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Assuming loading screen takes ~3.5s to finish, delay hero entry
      const tl = gsap.timeline({ delay: 3.8 });

      // The strict "buttery" mask reveal animation (pure slide up, no fade)
      tl.from('.line-inner', {
        y: '100%', // Slide up perfectly from just below the mask
        duration: 1.8,
        stagger: 0.15,
        ease: 'expo.out',
      })
        .from('.hero-subtitle', {
          y: 15,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
        }, '-=1.4') // fade in while text is still sliding into place
        .from('.hero-cta-group', {
          y: 15,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
        }, '-=1.4');

      const btn = sectionRef.current.querySelector('.hero-button');
      if (btn) {
        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }));
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/* Grainient animated WebGL background */}
      <div className="hero-bg">
        <Grainient
          color1="#EDE8DC"
          color2="#C9A962"
          color3="#A08B6E"
          timeSpeed={0.28}
          colorBalance={0.05}
          warpStrength={1.2}
          warpFrequency={4.0}
          warpSpeed={1.8}
          warpAmplitude={60.0}
          blendAngle={15.0}
          blendSoftness={0.08}
          rotationAmount={380.0}
          noiseScale={1.8}
          grainAmount={0.06}
          grainScale={2.5}
          grainAnimated={false}
          contrast={1.25}
          gamma={1.1}
          saturation={0.85}
          centerX={0}
          centerY={0}
          zoom={0.95}
        />
      </div>

      {/* Subtle vignette overlay for text readability */}
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          {/* Mask containers with animating inner content */}
          <span className="line"><span className="line-inner">{t.hero_title_1}</span></span>
          <span className="line"><span className="line-inner">{t.hero_title_2}</span></span>
        </h1>
        <p className="hero-subtitle">{t.hero_subtitle}</p>
        <div className="hero-cta-group">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hero-button">
            <span>{t.hero_button}</span>
          </a>
          <a href="#habitaciones" className="hero-link">{t.hero_scroll} ↓</a>
        </div>
      </div>

    </section>
  );
};

export default Hero;