import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const nearbyData = [
  {
    id: 1,
    nameEs: 'Playa de El Perelló',
    nameEn: 'El Perelló Beach',
    locationEs: 'A 5 minutos',
    locationEn: '5 minutes away',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    flag: '🏖️'
  },
  {
    id: 2,
    nameEs: 'Delta del Ebro',
    nameEn: 'Ebro Delta',
    locationEs: 'A 20 minutos',
    locationEn: '20 minutes away',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80',
    flag: '🦩'
  },
  {
    id: 3,
    nameEs: 'Poblet y Siurana',
    nameEn: 'Poblet & Siurana',
    locationEs: 'A 45 minutos',
    locationEn: '45 minutes away',
    image: 'https://images.unsplash.com/photo-1539657306720-97551006ead3?w=600&q=80',
    flag: '🏛️'
  },
  {
    id: 4,
    nameEs: 'Tarragona Romana',
    nameEn: 'Roman Tarragona',
    locationEs: 'A 30 minutos',
    locationEn: '30 minutes away',
    image: 'https://images.unsplash.com/photo-1534698489373-ec4ce22e8b42?w=600&q=80',
    flag: '🏛️'
  },
  {
    id: 5,
    nameEs: 'Ruta del Vino',
    nameEn: 'Wine Route',
    locationEs: 'Priorat · 40 min',
    locationEn: 'Priorat · 40 min',
    image: 'https://images.unsplash.com/photo-1474722883778-792e2be21c75?w=600&q=80',
    flag: '🍷'
  }
];

const EditorsPicks = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.editors-picks .section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToIndex = (index) => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);
    const cards = carouselRef.current.children;
    if (!cards[0]) return;
    const cardWidth = cards[0].offsetWidth + 16;
    gsap.to(carouselRef.current, {
      scrollLeft: index * cardWidth,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => setIsAnimating(false)
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => scrollToIndex(currentIndex > 0 ? currentIndex - 1 : nearbyData.length - 1);
  const handleNext = () => scrollToIndex(currentIndex < nearbyData.length - 1 ? currentIndex + 1 : 0);

  const handleCardEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card, { y: -10, duration: 0.4, ease: 'power2.out' });
    gsap.to(card.querySelector('img'), { scale: 1.08, duration: 0.6, ease: 'power2.out' });
  };
  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(card.querySelector('img'), { scale: 1, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <section className="editors-picks reveal-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">{t.nearby_title}<sup>(0{nearbyData.length})</sup></h2>
        <a href="#contacto" className="explore-button magnetic">{t.nearby_explore}</a>
      </div>

      <div className="picks-carousel" ref={carouselRef}>
        {nearbyData.map((place) => (
          <div
            key={place.id}
            className="pick-card"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div className="location-tag">
              <span className="flag">{place.flag}</span>
              <span>{lang === 'es' ? place.locationEs : place.locationEn}</span>
            </div>
            <div className="pick-image">
              <img src={place.image} alt={lang === 'es' ? place.nameEs : place.nameEn} />
            </div>
            <div className="pick-info">
              <h3>{lang === 'es' ? place.nameEs : place.nameEn}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button className="control-btn" onClick={handlePrev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="control-btn" onClick={handleNext} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default EditorsPicks;