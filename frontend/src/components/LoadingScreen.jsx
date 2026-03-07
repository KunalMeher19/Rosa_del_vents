import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  // Instantly remove the static HTML overlay the moment React mounts
  useEffect(() => {
    const overlay = document.getElementById('html-loading-overlay');
    if (overlay) overlay.style.display = 'none';
  }, []);


  useLayoutEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      tl.to(lettersRef.current, {
        y: -30,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.inOut',
        overwrite: true // <--- This kills the breathing animation
      })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut'
        }, '-=0.5');
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    // Entry animation — buttery, slow, graceful reveal of each letter
    gsap.fromTo(
      lettersRef.current,
      {
        y: 40,
        opacity: 0,
        filter: 'blur(12px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.1,
      }
    );

    // Gentle breathing pulse after letters settle
    gsap.to(lettersRef.current, {
      opacity: 0.65,
      filter: 'blur(1px)',
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.5,
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