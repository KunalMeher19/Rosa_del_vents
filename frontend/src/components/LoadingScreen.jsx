import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ isLoading }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  useLayoutEffect(() => {
    if (!isLoading) {
      // Exit animation when loading completes
      const tl = gsap.timeline();

      tl.to(lettersRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in'
      })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut'
        }, '-=0.2');
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    // Entry animation - letters fade in sequentially
    gsap.fromTo(
      lettersRef.current,
      {
        y: 40,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    // Subtle pulse animation after letters appear
    gsap.to(lettersRef.current, {
      scale: 1.02,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1
    });
  }, []);

  const letters = ['R', 'd', 'V'];

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loading-content">
        <div className="loading-text">
          {letters.map((letter, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              className="loading-letter"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="loading-line"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;