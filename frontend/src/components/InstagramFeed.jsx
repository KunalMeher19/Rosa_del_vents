import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import Masonry from './Masonry';

// Map existing images to the structure required by the Masonry component
const galleryImages = [
  { id: "1", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", height: 500 },
  { id: "2", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304", height: 700 },
  { id: "3", img: "https://images.unsplash.com/photo-1566218246241-934ae4d9e40a?w=800&q=80", url: "https://images.unsplash.com/photo-1566218246241-934ae4d9e40a", height: 450 },
  { id: "4", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206", height: 800 },
  { id: "5", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80", url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c", height: 550 },
  { id: "6", img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80", url: "https://images.unsplash.com/photo-1586105251261-72a756497a11", height: 400 },
  { id: "7", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", url: "https://images.unsplash.com/photo-1540518614846-7eded433c457", height: 600 },
  { id: "8", img: "https://images.unsplash.com/photo-1474722883778-792e2be21c75?w=800&q=80", url: "https://images.unsplash.com/photo-1474722883778-792e2be21c75", height: 500 },
];

const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title and button independently
      gsap.from('.instagram-section-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out'
      });

      gsap.from('.instagram-cta', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="galeria" className="instagram-feed reveal-section" ref={sectionRef} style={{ padding: '8rem 2rem', minHeight: '120vh' }}>
      <h2 className="instagram-section-title" style={{ marginBottom: '6rem' }}>Galería</h2>

      <div style={{ height: '80vh', position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto 4rem auto' }}>
        <Masonry
          items={galleryImages}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>

      <div className="instagram-cta" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <a href="#contacto" className="insta-button magnetic-light">{t.gallery_button}</a>
      </div>
    </section>
  );
};

export default InstagramFeed;