import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const instagramImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    alt: 'Restaurant interior'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    alt: 'Food plating'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80',
    alt: 'Kitchen scene'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
    alt: 'Wine cellar'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
    alt: 'Cocktail'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
    alt: 'Resort view'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80',
    alt: 'Hotel room'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
    alt: 'Luxury suite'
  }
];

const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal animation
      gsap.from(itemsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'random'
        },
        ease: 'power2.out'
      });

      // Button reveal
      gsap.from('.instagram-cta', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Individual item hover
  const handleMouseEnter = (index) => {
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1.05,
        zIndex: 10,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Dim other items
      itemsRef.current.forEach((otherItem, i) => {
        if (i !== index && otherItem) {
          gsap.to(otherItem, { opacity: 0.6, duration: 0.3 });
        }
      });
    }
  };

  const handleMouseLeave = () => {
    itemsRef.current.forEach((item) => {
      if (item) {
        gsap.to(item, {
          scale: 1,
          opacity: 1,
          zIndex: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  };

  return (
    <section className="instagram-feed reveal-section" ref={sectionRef}>
      <div className="instagram-grid">
        {instagramImages.map((img, index) => (
          <div
            key={img.id}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`insta-item insta-item-${index + 1}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={img.src} alt={img.alt} />
            <div className="insta-overlay">
              <svg className="insta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="instagram-cta">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="insta-button magnetic-light"
        >
          See more on Instagram
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;