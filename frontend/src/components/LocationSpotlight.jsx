import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import './LocationSpotlight.css';

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL = 'https://www.google.com/maps/place/HOSTAL+ROSA+DELS+VENTS/@40.8730802,0.7075766,15.74z/data=!4m18!1m8!3m7!1s0x12a1197e29109ad9:0x7ea76ad0f4518a39!2sCarrer+Sant+Joan,+3,+43519+El+Perell%C3%B3,+Tarragona,+Spain!3b1!8m2!3d40.8758689!4d0.7124785!16s%2Fg%2F11cpbnsv3d!3m8!1s0x12a1197e2f667c19:0xfa1ce0a41ebf23c6!5m2!4m1!1i2!8m2!3d40.8758098!4d0.7125935!16s%2Fg%2F11c80cq9l_?hl=en&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D';

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