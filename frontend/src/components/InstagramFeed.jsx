import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import Masonry from './Masonry';

// Map existing images to the structure required by the Masonry component
const galleryImages = [
  { id: "1", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2", height: 500 },
  { id: "2", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80", url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd", height: 700 },
  { id: "3", img: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?w=800&q=80", url: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53", height: 450 },
  { id: "4", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", height: 800 },
  { id: "5", img: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=80", url: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31", height: 550 },
  { id: "6", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", height: 400 },
  { id: "7", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", height: 600 },
  { id: "8", img: "https://images.unsplash.com/photo-1512684820680-779cb45258e7?w=800&q=80", url: "https://images.unsplash.com/photo-1512684820680-779cb45258e7", height: 500 },
];

const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const masonryContainerRef = useRef(null);
  const [masonryInView, setMasonryInView] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMasonryInView(true);
        } else {
          // Unmount the component when we scroll away so it can trigger its mount animation again when we return.
          // To prevent rapid flashing if we just barely intersect the top, we use a small threshold
          setMasonryInView(false);
        }
      },
      { threshold: 0.1 }
    );
    if (masonryContainerRef.current) {
      observer.observe(masonryContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

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
    <section id="galeria" className="instagram-feed reveal-section dark-theme" ref={sectionRef} style={{ padding: '8rem 2rem', minHeight: '120vh' }}>
      <h2 className="instagram-section-title" style={{ marginBottom: '6rem', color: '#fff' }}>Galería</h2>

      <div ref={masonryContainerRef} style={{ height: '110vh', position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto 4rem auto' }}>
        {masonryInView && (
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
        )}
      </div>

      <div className="instagram-cta" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <a href="#contacto" className="insta-button magnetic-light">{t.gallery_button}</a>
      </div>
    </section>
  );
};

export default InstagramFeed;