import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  useLayoutEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      tl.to(lettersRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.in'
      })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut'
        }, '-=0.2');
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    // Entry animation — slow, graceful reveal of each letter
    gsap.fromTo(
      lettersRef.current,
      {
        y: 50,
        opacity: 0,
        filter: 'blur(6px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    // Gentle breathing pulse after letters settle
    gsap.to(lettersRef.current, {
      opacity: 0.75,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
      stagger: {
        each: 0.05,
        from: 'center',
      },
    });
  }, []);

  const letters = ['Rosa', ' ', 'dels', ' ', 'Vents'];

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loading-content">
        <div className="loading-text">
          {letters.map((letter, index) => (
            letter === ' '
              ? <span key={index} className="loading-space">&nbsp;</span>
              : <span
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