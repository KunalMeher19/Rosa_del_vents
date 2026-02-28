import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LocationSpotlight = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const floatImg1Ref = useRef(null);
  const floatImg2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: 100,
        ease: 'none'
      });

      // Content reveal
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Floating images parallax with different speeds
      gsap.to(floatImg1Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        y: -80,
        rotation: 5,
        ease: 'none'
      });

      gsap.to(floatImg2Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -120,
        rotation: -3,
        ease: 'none'
      });

      // Continuous floating animation
      gsap.to(floatImg1Ref.current, {
        y: '+=15',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to(floatImg2Ref.current, {
        y: '+=20',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="location-spotlight reveal-section" ref={sectionRef}>
      <div className="spotlight-background" ref={bgRef}>
        <img
          src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1600&q=80"
          alt="Scenic view"
        />
        <div className="spotlight-overlay"></div>
      </div>

      <div className="floating-images">
        <div className="float-img float-img-1" ref={floatImg1Ref}>
          <img src="https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=300&q=80" alt="Decorative" />
        </div>
        <div className="float-img float-img-2" ref={floatImg2Ref}>
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" alt="Decorative" />
        </div>
      </div>

      <div className="spotlight-content" ref={contentRef}>
        <span className="spotlight-label">LOCATION SPOTLIGHT</span>
        <h2 className="spotlight-title">Catalonia, Spain</h2>
        <p className="spotlight-subtitle">Where summers feel endless.</p>
        <a href="#catalonia" className="spotlight-button magnetic-light">
          View the edit
        </a>
      </div>
    </section>
  );
};

export default LocationSpotlight;