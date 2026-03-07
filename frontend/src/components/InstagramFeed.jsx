import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import Masonry from './Masonry';
import './InstagramFeed.css';

// Map existing images to the structure required by the Masonry component
const galleryImages = [
  { id: "1", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2", height: 500 },
  { id: "2", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80", url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd", height: 700 },
  { id: "3", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945", height: 450 },
  { id: "4", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", height: 800 },
  { id: "5", img: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=80", url: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31", height: 550 },
  { id: "6", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", height: 400 },
  { id: "7", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", height: 600 },
  { id: "8", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304", height: 500 },
];

// Helper: calculate the appropriate container height for the Masonry grid,
// given the number of columns on the current viewport.
const getMasonryHeight = () => {
  const vw = window.innerWidth;

  // These column breakpoints must match Masonry.jsx's useMedia queries exactly:
  //   ≥1500px → 5 cols | ≥1000px → 4 | ≥600px → 3 | ≥360px → 2 | default → 1
  let cols;
  if (vw >= 1500) cols = 5;
  else if (vw >= 1000) cols = 4;
  else if (vw >= 600) cols = 3;
  else if (vw >= 360) cols = 2;
  else cols = 1;

  // Estimate total grid height: fill each column greedily and return the tallest column.
  const colHeights = new Array(cols).fill(0);

  galleryImages.forEach(item => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    // Masonry halves the declared height: child.height / 2
    colHeights[col] += item.height / 2;
  });

  const tallest = Math.max(...colHeights);

  // Add comfortable buffer so images always render fully inside the container
  const buffer = cols <= 2 ? 80 : 40;
  return tallest + buffer;
};

const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const masonryContainerRef = useRef(null);
  const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 768);

  // On MOBILE: render Masonry once when first intersecting — never unmount again.
  // On DESKTOP: keep existing re-mount behaviour (original experience, unchanged).
  const [masonryInView, setMasonryInView] = useState(false);
  const hasShownOnce = useRef(false);

  // Dynamic container height so the grid never overflows on any screen size
  const [containerHeight, setContainerHeight] = useState('110vh');

  useEffect(() => {
    // Pre-calculate height after first paint when we know the viewport
    const recalc = () => {
      const h = getMasonryHeight();
      setContainerHeight(`${h}px`);
      isMobile.current = window.innerWidth < 768;
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  const { t } = useLang();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMasonryInView(true);
          hasShownOnce.current = true;
        } else {
          // MOBILE: Once shown, keep it mounted (play-once, no re-animation on scroll back)
          // DESKTOP: Unmount on leave so re-entry re-animates (original behaviour)
          if (!isMobile.current) {
            setMasonryInView(false);
          }
          // On mobile hasShownOnce keeps it true; setMasonryInView stays true
        }
      },
      { threshold: 0.05 }
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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out'
      });

      gsap.from('.instagram-cta', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="galeria" className="instagram-feed reveal-section dark-theme" ref={sectionRef} style={{ padding: '8rem 2rem', minHeight: '120vh' }}>
      <h2 className="instagram-section-title" style={{ marginBottom: '6rem', color: '#fff' }}>Galería</h2>

      <div
        ref={masonryContainerRef}
        style={{
          height: containerHeight,
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto 4rem auto'
        }}
      >
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
        <a href="#contacto" className="insta-button"><span>{t.gallery_button}</span></a>
      </div>
    </section>
  );
};

export default InstagramFeed;