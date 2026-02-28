import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

const picksData = [
  {
    id: 1,
    name: 'Casa de Sierra Nevada, A Belmond Hotel',
    location: 'San Miguel de Allende',
    price: 'From $475/night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    flag: '🇲🇽'
  },
  {
    id: 2,
    name: 'MOLLIE Aspen',
    location: 'Aspen, Colorado',
    price: 'From $500/night',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    flag: '🇺🇸'
  },
  {
    id: 3,
    name: 'Casa Silencio',
    location: 'Oaxaca, Mexico',
    price: 'From $1,415/night',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    flag: '🇲🇽'
  },
  {
    id: 4,
    name: 'La Valise Tulum',
    location: 'Tulum, Mexico',
    price: 'From $705/night',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    flag: '🇲🇽'
  },
  {
    id: 5,
    name: 'Villa Mara Carmel',
    location: 'Carmel Point, Carmel-By-The-Sea',
    price: 'From $444/night',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
    flag: '🇺🇸'
  }
];

const EditorsPicks = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.from('.editors-picks .section-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Cards stagger animation
      gsap.from('.pick-card', {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToIndex = (index) => {
    if (isAnimating || !carouselRef.current) return;

    setIsAnimating(true);
    const cards = carouselRef.current.children;
    const cardWidth = cards[0].offsetWidth + 16; // including gap

    gsap.to(carouselRef.current, {
      scrollLeft: index * cardWidth,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => setIsAnimating(false)
    });

    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : picksData.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < picksData.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  // Card hover effect
  const handleCardMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('img');

    gsap.to(card, { y: -10, duration: 0.4, ease: 'power2.out' });
    gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('img');

    gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <section className="editors-picks reveal-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">
          Editor's picks<sup>(0{picksData.length})</sup>
        </h2>
        <a href="#all-hotels" className="explore-button magnetic">
          See all hotels
        </a>
      </div>

      <div className="picks-carousel" ref={carouselRef}>
        {picksData.map((hotel) => (
          <div
            key={hotel.id}
            className="pick-card"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="location-tag">
              <span className="flag">{hotel.flag}</span>
              <span>{hotel.location}</span>
            </div>
            <div className="pick-image">
              <img src={hotel.image} alt={hotel.name} />
            </div>
            <div className="pick-info">
              <h3>{hotel.name}</h3>
              <span className="price">{hotel.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button
          className="control-btn magnetic-small"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="control-btn magnetic-small"
          onClick={handleNext}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default EditorsPicks;