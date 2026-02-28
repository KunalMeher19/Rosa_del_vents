import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const imageStackRef = useRef(null);
  const mainInterfaceRef = useRef(null);

  const images = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      },
    });

    const imageCards = imageStackRef.current.querySelectorAll('.image-card');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Initial state - all images stacked in center
    gsap.set(imageCards, {
      x: centerX - 150,
      y: centerY - 200,
      scale: 0.8,
      opacity: 0,
      rotation: 0,
    });

    // Phase 1: White screen hold (0.5s)
    tl.to({}, { duration: 0.5 });

    // Phase 2: Images appear and stack with slight rotation
    tl.to(imageCards, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
    });

    // Phase 3: Stack animation - images fan out slightly then back
    tl.to(imageCards, {
      rotation: (i) => (i - 3.5) * 3,
      x: (i) => centerX - 150 + (i - 3.5) * 10,
      duration: 0.4,
      ease: 'power2.inOut',
    });

    tl.to(imageCards, {
      rotation: 0,
      x: centerX - 150,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    // Phase 4: Rapid image cycling (the flash effect)
    tl.to(imageCards, {
      opacity: (i) => (i === 7 ? 1 : 0),
      duration: 0.1,
      stagger: 0.02,
    });

    // Phase 5: Images expand to fill screen
    tl.to(imageCards[7], {
      scale: 8,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    // Phase 6: Fade to black
    tl.to(
      containerRef.current,
      {
        backgroundColor: '#0a0a0a',
        duration: 0.4,
      },
      '-=0.3'
    );

    tl.to(
      imageCards,
      {
        opacity: 0,
        duration: 0.2,
      },
      '-=0.2'
    );

    // Phase 7: Main interface elements appear
    tl.set(mainInterfaceRef.current, { display: 'flex' });

    const navItems = mainInterfaceRef.current.querySelectorAll('.ls-nav-item');
    const cornerTexts = mainInterfaceRef.current.querySelectorAll('.ls-corner-text');
    const centerText = mainInterfaceRef.current.querySelector('.ls-center-name');
    const bigNumber = mainInterfaceRef.current.querySelector('.ls-big-number');
    const coordinates = mainInterfaceRef.current.querySelectorAll('.ls-coordinate');

    tl.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    tl.fromTo(
      cornerTexts,
      { opacity: 0, x: (i) => (i === 0 ? -20 : 20) },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(
      centerText,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );

    tl.fromTo(
      bigNumber,
      { scale: 1.2, opacity: 0, filter: 'blur(20px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      coordinates,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );

    // Ambient shimmer animation for the big number
    gsap.to(bigNumber, {
      backgroundPosition: '200% 50%',
      duration: 8,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-container">
      {/* Image Stack Phase */}
      <div ref={imageStackRef} className="image-stack">
        {images.map((src, index) => (
          <div key={index} className="image-card">
            <img src={src} alt={`loading-${index}`} />
            {index === 7 && (
              <div className="name-overlay">
                Rosa dels Vents
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Interface */}
      <div ref={mainInterfaceRef} className="main-interface" style={{ display: 'none' }}>
        {/* Navigation */}
        <nav className="ls-top-nav">
          <a href="#about" className="ls-nav-item">(About)</a>
          <a href="#rooms" className="ls-nav-item">(Rooms)</a>
          <a href="#experiences" className="ls-nav-item">(Experiences)</a>
          <a href="#contact" className="ls-nav-item">(Contact)</a>
        </nav>

        {/* Side Badge */}
        <div className="ls-side-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="#c9a962"
            />
          </svg>
        </div>

        {/* Corner Texts */}
        <div className="ls-corner-text left">
          <p>A boutique hotel nestled<br />in the heart of nature.</p>
        </div>
        <div className="ls-corner-text right">
          <p>Where tranquility meets<br />timeless elegance.</p>
        </div>

        {/* Center Content */}
        <div className="ls-center-content">
          <div className="ls-big-number">R</div>
          <div className="ls-center-name">Rosa dels Vents</div>
        </div>

        {/* Coordinates */}
        <div className="ls-coordinates">
          <span className="ls-coordinate">41°24'N</span>
          <span className="ls-coordinate location">Catalonia, Spain</span>
          <span className="ls-coordinate">2°10'E</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;