import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for each line
      const lines = gsap.utils.toArray('.hero-title .line');

      lines.forEach((line, i) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power3.out'
        });
      });

      // Subtitle animation
      gsap.from('.hero-subtitle', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Button animation with magnetic effect
      const button = document.querySelector('.hero-button');
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          <span className="line">Where nature meets</span>
          <span className="line">timeless elegance</span>
        </h1>
        <p className="hero-subtitle">
          A BOUTIQUE HOTEL NESTLED IN THE HEART OF CATALONIA
        </p>
        <a href="#about" className="hero-button">
          <span>Discover Rosa dels Vents</span>
        </a>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;