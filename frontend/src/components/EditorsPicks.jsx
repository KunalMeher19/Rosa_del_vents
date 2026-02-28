import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(Draggable);

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
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.editors-picks .section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });

      Draggable.create(carouselRef.current, {
        type: 'x',
        bounds: {
          minX: - (carouselRef.current.scrollWidth - carouselRef.current.parentElement.offsetWidth),
          maxX: 0
        },
        edgeResistance: 0.8,
        inertia: false,
        onPress: () => gsap.killTweensOf(carouselRef.current)
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getCardWidth = () => {
    if (!carouselRef.current || !carouselRef.current.children[0]) return 0;
    // Assuming 1rem (16px) gap between cards
    return carouselRef.current.children[0].offsetWidth + 16;
  };

  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    gsap.killTweensOf(carouselRef.current);
    const cardWidth = getCardWidth();

    const wrapperWidth = carouselRef.current.parentElement.offsetWidth;
    const maxScroll = (carouselRef.current.scrollWidth - wrapperWidth) * -1;

    let targetX = -(index * cardWidth);
    if (targetX < maxScroll) targetX = maxScroll;
    if (targetX > 0) targetX = 0;

    gsap.to(carouselRef.current, {
      x: targetX,
      duration: 1.5, // nice slow and smooth duration
      ease: 'power2.inOut'
    });
  };

  const handlePrev = () => {
    if (!carouselRef.current) return;
    const currentX = gsap.getProperty(carouselRef.current, "x");
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const currentIdx = Math.abs(Math.round(currentX / cardWidth));
    const nextIdx = currentIdx > 0 ? currentIdx - 1 : 0;
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    if (!carouselRef.current) return;
    const currentX = gsap.getProperty(carouselRef.current, "x");
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const maxIdx = Math.floor(carouselRef.current.scrollWidth / cardWidth) - 1;
    const currentIdx = Math.abs(Math.round(currentX / cardWidth));
    const nextIdx = currentIdx < maxIdx ? currentIdx + 1 : maxIdx;
    scrollToIndex(nextIdx);
  };

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

      <div className="picks-carousel-wrapper">
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
                <img src={place.image} alt={lang === 'es' ? place.nameEs : place.nameEn} draggable="false" />
              </div>
              <div className="pick-info">
                <h3>{lang === 'es' ? place.nameEs : place.nameEn}</h3>
              </div>
            </div>
          ))}
        </div>
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