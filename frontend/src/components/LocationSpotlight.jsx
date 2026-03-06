import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import './LocationSpotlight.css';

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const LocationSpotlight = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const floatImg1Ref = useRef(null);
  const floatImg2Ref = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: 100, ease: 'none'
      });

      gsap.from(contentRef.current.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });

      gsap.to(floatImg1Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y: -80, rotation: 5, ease: 'none'
      });

      gsap.to(floatImg2Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -120, rotation: -3, ease: 'none'
      });

      gsap.to(floatImg1Ref.current.querySelector('img'), { y: '+=15', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(floatImg2Ref.current.querySelector('img'), { y: '+=20', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ubicacion" className="location-spotlight reveal-section dark-theme" ref={sectionRef}>
      {/* <div className="spotlight-background" ref={bgRef}>
        <img
          src="https://images.unsplash.com/photo-1566218246241-934ae4d9e40a?w=1600&q=80"
          alt="El Perelló, Costa Daurada"
        />
        <div className="spotlight-overlay"></div>
      </div> */}

      <div className="floating-images">
        <div className="float-img float-img-1" ref={floatImg1Ref}>
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80" alt="Costa Daurada" />
        </div>
        <div className="float-img float-img-2" ref={floatImg2Ref}>
          <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&q=80" alt="Mediterranean" />
        </div>
      </div>

      <div className="spotlight-content" ref={contentRef}>
        <span className="spotlight-label">{t.location_label}</span>
        <h2 className="spotlight-title">{t.location_title}</h2>
        <p className="spotlight-subtitle">{t.location_subtitle}</p>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="spotlight-button">
          <span>{t.location_button}</span>
        </a>
      </div>
    </section>
  );
};

export default LocationSpotlight;