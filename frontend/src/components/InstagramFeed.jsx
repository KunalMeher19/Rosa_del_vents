import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', alt: 'Playa' },
  { id: 2, src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80', alt: 'Habitación' },
  { id: 3, src: 'https://images.unsplash.com/photo-1566218246241-934ae4d9e40a?w=400&q=80', alt: 'Costa' },
  { id: 4, src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80', alt: 'Mar' },
  { id: 5, src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=80', alt: 'Familia' },
  { id: 6, src: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80', alt: 'Descanso' },
  { id: 7, src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', alt: 'Interior' },
  { id: 8, src: 'https://images.unsplash.com/photo-1474722883778-792e2be21c75?w=400&q=80', alt: 'Viñedos' },
];

const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const { t } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: { amount: 0.6, from: 'random' },
        ease: 'power2.out'
      });

      gsap.from('.instagram-section-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, { scale: 1.05, zIndex: 10, duration: 0.4, ease: 'power2.out' });
      itemsRef.current.forEach((other, i) => {
        if (i !== index && other) gsap.to(other, { opacity: 0.5, duration: 0.3 });
      });
    }
  };

  const handleMouseLeave = () => {
    itemsRef.current.forEach(item => {
      if (item) gsap.to(item, { scale: 1, opacity: 1, zIndex: 1, duration: 0.4, ease: 'power2.out' });
    });
  };

  return (
    <section id="galeria" className="instagram-feed reveal-section" ref={sectionRef}>
      <h2 className="instagram-section-title">Galería</h2>
      <div className="instagram-grid">
        {galleryImages.map((img, index) => (
          <div
            key={img.id}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`insta-item insta-item-${index + 1}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={img.src} alt={img.alt} />
            <div className="insta-overlay">
              <svg className="insta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8h.01" />
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="instagram-cta">
        <a href="#contacto" className="insta-button magnetic-light">{t.gallery_button}</a>
      </div>
    </section>
  );
};

export default InstagramFeed;